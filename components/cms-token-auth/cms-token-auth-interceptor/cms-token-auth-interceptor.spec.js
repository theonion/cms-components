'use strict';

describe('Interceptor: TokenAuthInterceptor', function () {
  require('../cms-token-auth-config');
  require('./cms-token-auth-interceptor');

  var $location;
  var $q;
  var $rootScope;
  var $templateCache;
  var localStorageService;
  var TokenAuthConfig;
  var TokenAuthInterceptor;
  var TokenAuthService;
  var testRequestConfig;
  var url = '/some/test/url';

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.interceptor');

    inject(function (_$location_, _$q_, _$rootScope_, _$templateCache_,
        _localStorageService_, _TokenAuthConfig_, _TokenAuthInterceptor_,
        _TokenAuthService_) {
      $location = _$location_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
      localStorageService = _localStorageService_;
      TokenAuthConfig = _TokenAuthConfig_;
      TokenAuthInterceptor = _TokenAuthInterceptor_;
      TokenAuthService = _TokenAuthService_;
      testRequestConfig = {
        url: url
      };
    });
  });

  describe('request handler', function () {

    it('should return the config passed in', function () {
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(false);

      var returnConfig = TokenAuthInterceptor.request(testRequestConfig);

      expect(returnConfig).to.equal(testRequestConfig);
    });

    it('should add an authorization header when a token is in storage', function () {
      var token = 'something';
      var verifyDeferred = $q.defer();

      localStorageService.get = sinon.stub().returns(token);
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(true);
      TokenAuthService.tokenVerify = sinon.stub().returns(verifyDeferred.promise);

      TokenAuthInterceptor.request(testRequestConfig);

      verifyDeferred.resolve();
      $rootScope.$digest();

      expect(testRequestConfig.headers.Authorization).to.equal('JWT ' + token);
    });

    it('should abort when no token in session', function () {
      localStorageService.get = sinon.stub();
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(true);

      TokenAuthInterceptor.request(testRequestConfig);
      $rootScope.$digest();

      expect(testRequestConfig.headers).to.be.undefined;
      expect(testRequestConfig.timeout).to.be.a(typeof($q.defer().promise));

      // test if abort has been resolved, so request is cancelled, status 1 === resolved
      expect(testRequestConfig.timeout.$$state.status).to.equal(1);
    });

    it('should abort when verification fails', function () {
      var verifyDeferred = $q.defer();

      localStorageService.get = sinon.stub().returns('123');
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(true);
      TokenAuthService.tokenVerify = sinon.stub().returns(verifyDeferred.promise);

      TokenAuthInterceptor.request(testRequestConfig);

      verifyDeferred.reject();
      $rootScope.$digest();

      expect(testRequestConfig.headers).to.be.undefined;
      expect(testRequestConfig.timeout).to.be.a(typeof($q.defer().promise));
    });

    it('should only intercept urls matching thosed provided by config', function () {
      TokenAuthConfig.shouldBeIntercepted = sinon.spy().withArgs(url);

      TokenAuthInterceptor.request(testRequestConfig);

      expect(TokenAuthConfig.shouldBeIntercepted.withArgs(url).calledOnce).to.be.true;
    });

    it('should be ignored when undefined config is given', function () {
      TokenAuthService.tokenVerify = sinon.stub();

      // request config is undefined
      TokenAuthInterceptor.request();

      expect(TokenAuthService.tokenVerify.calledOnce).to.be.false;
    });

    it('should be ignored when ignore flag is provided', function () {
      TokenAuthService.tokenVerify = sinon.stub();

      // ignore provided directly on config
      testRequestConfig.ignoreTokenAuth = true;
      TokenAuthInterceptor.request(testRequestConfig);

      expect(TokenAuthService.tokenVerify.calledOnce).to.be.false;
    });

    it('should delay requests until auth service is authenticated', function () {
      var config1 = {url: '1'};
      var config2 = {url: '2'};
      var token = 'something';
      var verifyDeferred = $q.defer();

      localStorageService.get = sinon.stub().returns(token);
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(true);
      TokenAuthService.tokenVerify = sinon.stub().returns(verifyDeferred.promise);

      TokenAuthInterceptor.request(config1);
      TokenAuthInterceptor.request(config2);

      expect(config1.headers).to.be.undefined;
      expect(config2.headers).to.be.undefined;

      verifyDeferred.resolve();
      $rootScope.$digest();

      expect(config1.headers.Authorization).to.equal('JWT ' + token);
      expect(config2.headers.Authorization).to.equal('JWT ' + token);
    });

    it('should ignore requests handled by $templateCache', function () {
      var templateUrl = 'some/cached/template.html';
      var config = {
        method: 'GET',
        url: templateUrl
      };

      TokenAuthService.tokenVerify = sinon.stub().returns($q.resolve());
      $templateCache.put(templateUrl, '<fun-html></fun-html>');
      TokenAuthInterceptor.request(config);

      expect(TokenAuthService.tokenVerify.callCount).to.equal(0);
    });
  });

  describe('response error handler', function () {
    var response;

    beforeEach(function () {
      response = {
        config: testRequestConfig,
        status: 403
      };
    });

    it('should return a rejected promise', function () {
      var returnPromise = TokenAuthInterceptor.responseError(response);

      // status 2 === rejected
      expect(returnPromise.$$state.status).to.equal(2);
    });

    it('should add failures to request buffer and attempt token refresh', function () {
      TokenAuthService.requestBufferPush = sinon.spy();
      TokenAuthService.tokenRefresh = sinon.spy();

      TokenAuthInterceptor.responseError(response);

      expect(TokenAuthService.requestBufferPush.withArgs(testRequestConfig).calledOnce).to.be.true;
      expect(TokenAuthService.tokenRefresh.calledOnce).to.be.true;
    });

    it('should only intercept urls matching those provided by config', function () {
      TokenAuthConfig.shouldBeIntercepted = sinon.spy().withArgs(url);

      TokenAuthInterceptor.responseError(response);

      expect(TokenAuthConfig.shouldBeIntercepted.withArgs(url).calledOnce).to.be.true;
    });

    it('should be ignored when ignore flag is provided', function () {
      TokenAuthService.requestBufferPush = sinon.spy();
      TokenAuthService.tokenRefresh = sinon.spy();

      // request config is undefined
      delete response.config;
      TokenAuthInterceptor.responseError(response);

      // ignore provided directly on config
      response.config = {ignoreTokenAuth: true};
      TokenAuthInterceptor.responseError(response);

      expect(TokenAuthService.requestBufferPush.calledOnce).to.be.true;
      expect(TokenAuthService.tokenRefresh.calledOnce).to.be.true ;
    });

    it('should only handle 403 or 401 responses', function () {
      TokenAuthConfig.shouldBeIntercepted = sinon.stub().returns(true);

      TokenAuthService.requestBufferPush = sinon.spy();
      TokenAuthService.tokenRefresh = sinon.spy();

      response.status = 403;
      TokenAuthInterceptor.responseError(response);
      expect(TokenAuthService.requestBufferPush.callCount).to.equal(1);
      expect(TokenAuthService.tokenRefresh.callCount).to.equal(1);

      response.status = 401;
      TokenAuthInterceptor.responseError(response);
      expect(TokenAuthService.requestBufferPush.callCount).to.equal(2);
      expect(TokenAuthService.tokenRefresh.callCount).to.equal(2);

      response.status = 400;
      TokenAuthInterceptor.responseError(response);
      expect(TokenAuthService.requestBufferPush.callCount).to.equal(2);
      expect(TokenAuthService.tokenRefresh.callCount).to.equal(2);

      response.status = 500;
      TokenAuthInterceptor.responseError(response);
      expect(TokenAuthService.requestBufferPush.callCount).to.equal(2);
      expect(TokenAuthService.requestBufferPush.callCount).to.equal(2);
    });
  });
});
