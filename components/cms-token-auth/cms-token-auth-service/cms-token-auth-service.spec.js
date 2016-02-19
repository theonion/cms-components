'use strict';

describe('Service: TokenAuthService', function () {
  require('../cms-token-auth-config');
  require('../cms-token-auth-user/cms-token-auth-user');
  require('./cms-token-auth-service');

  var $http;
  var $httpBackend;
  var $location;
  var $q;
  var $rootScope;
  var CurrentUser;
  var localStorageService;
  var testToken = 'some-test-token';
  var TokenAuthConfig;
  var TokenAuthService;
  var sandbox;

  var requestVerify = function () {
    return $httpBackend.expectPOST(
      TokenAuthConfig.getApiEndpointVerify(),
      {token: testToken}
    );
  };

  var requestRefresh = function () {
    return $httpBackend.expectPOST(
      TokenAuthConfig.getApiEndpointRefresh(),
      {token: testToken}
    );
  };

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.service');

    inject(function (_$http_, _$httpBackend_, _$location_, _$q_, _$rootScope_,
        _localStorageService_, _TokenAuthConfig_, _TokenAuthService_, _CurrentUser_) {

      $http = _$http_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      CurrentUser = _CurrentUser_;
      localStorageService = _localStorageService_;
      TokenAuthConfig = _TokenAuthConfig_;
      TokenAuthService = _TokenAuthService_;

      sandbox = sinon.sandbox.create();
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('verification', function () {

    it('should return existing verification promise if one has already fired', function () {
      localStorageService.get = sandbox.stub().returns(testToken);
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      sandbox.spy($http, 'post');
      requestVerify().respond(200);

      var verify = TokenAuthService.tokenVerify();
      TokenAuthService.tokenVerify();
      $httpBackend.flush();

      expect($http.post.calledOnce).to.be.true;
      expect(verify.then).to.be.defined;
    });

    it('should reject if an auth request is currently pending', function () {
      var fail = sandbox.stub();
      localStorageService.get = sandbox.stub().returns(testToken);
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      requestRefresh().respond(200, {});

      TokenAuthService.tokenRefresh();
      TokenAuthService.tokenVerify().catch(fail);
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
    });

    it('should reject when no token is available', function () {
      var fail = sandbox.stub();

      TokenAuthService.tokenVerify().catch(fail);
      $rootScope.$digest();

      expect(fail.calledOnce).to.be.true;
    });

    it('should attempt to refresh token on HTTP 400 error status', function () {
      TokenAuthService.tokenRefresh = sinon.stub().returns($q.resolve());
      localStorageService.get = sandbox.stub().returns(testToken);
      requestVerify().respond(400);

      TokenAuthService.tokenVerify();
      $httpBackend.flush();

      expect(TokenAuthService.tokenRefresh.calledOnce).to.be.true;
    });

    it('should reject on HTTP status not handled by config', function () {
      var fail = sandbox.stub();
      localStorageService.get = sandbox.stub().returns(testToken);
      requestVerify().respond(500);

      TokenAuthService.tokenVerify().catch(fail);
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
    });

    describe('on success', function () {
      var fakeUser;

      beforeEach(function () {
        fakeUser = {};
        CurrentUser.$get = sandbox.stub().returns($q.resolve(fakeUser));
        localStorageService.get = sandbox.stub().returns(testToken);
        requestVerify().respond(200);
      });

      it('should resolve', function () {
        var success = sandbox.stub();

        TokenAuthService.tokenVerify().then(success);
        $httpBackend.flush();

        expect(success.calledOnce).to.be.true;
      });

      it('should get the current user', function () {

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(CurrentUser.$get.calledOnce).to.be.true;
      });

      it('should retry request buffer', function () {
        TokenAuthService.requestBufferRetry = sandbox.stub();

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(TokenAuthService.requestBufferRetry.calledOnce).to.be.true;
      });

      it('should call auth success handlers', function () {
        TokenAuthConfig.callAuthSuccessHandlers = sandbox.stub();

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(TokenAuthConfig.callAuthSuccessHandlers.calledOnce).to.be.true;
      });
    });

    describe('on failure from a non-400 status handled by config', function () {
      // note: assuming default of [401, 403]
      beforeEach(function () {
        localStorageService.get = sandbox.stub().returns(testToken);
        requestVerify().respond(401);
      });

      it('should clear request buffer', function () {
        TokenAuthService.requestBufferClear = sandbox.stub();

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(TokenAuthService.requestBufferClear.calledOnce).to.be.true;
      });

      it('should logout current user', function () {
        CurrentUser.logout = sandbox.stub();

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(CurrentUser.logout.calledOnce).to.be.true;
      });

      it('should call auth failure handlers', function () {
        TokenAuthConfig.callAuthFailureHandlers = sandbox.stub();

        TokenAuthService.tokenVerify();
        $httpBackend.flush();

        expect(TokenAuthConfig.callAuthFailureHandlers.calledOnce).to.be.true;
      });

      it('should reject', function () {
        var fail = sandbox.stub();

        TokenAuthService.tokenVerify().catch(fail);
        $httpBackend.flush();

        expect(fail.calledOnce).to.be.true;
      });
    });
  });

  describe('refresh', function () {

    it('should resolve on success', function () {
      var success = sandbox.stub();
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      localStorageService.get = sandbox.stub().returns(testToken);
      requestRefresh().respond(200, {});

      TokenAuthService.tokenRefresh().then(success);
      $httpBackend.flush();

      expect(success.calledOnce).to.be.true;
    });

    it('should get the current user on success', function () {
      localStorageService.get = sandbox.stub().returns(testToken);
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      requestRefresh().respond(200, {});

      TokenAuthService.tokenRefresh();
      $httpBackend.flush();

      expect(CurrentUser.$get.calledOnce).to.be.true;
    });

    it('should retry request buffer on success', function () {
      TokenAuthService.requestBufferRetry = sandbox.stub();
      localStorageService.get = sandbox.stub().returns(testToken);
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      requestRefresh().respond(200, {});

      TokenAuthService.tokenRefresh();
      $httpBackend.flush();

      expect(TokenAuthService.requestBufferRetry.calledOnce).to.be.true;
    });

    it('should call auth success handlers on success', function () {
      TokenAuthConfig.callAuthSuccessHandlers = sandbox.stub();
      CurrentUser.$get = sandbox.stub().returns($q.resolve());
      localStorageService.get = sandbox.stub().returns(testToken);
      requestRefresh().respond(200, {});

      TokenAuthService.tokenRefresh();
      $httpBackend.flush();

      expect(TokenAuthConfig.callAuthSuccessHandlers.calledOnce).to.be.true;
    });

    it('should reject when no token is available', function () {
      var fail = sandbox.stub();
      localStorageService.get = sandbox.stub().returns(null);

      TokenAuthService.tokenRefresh().catch(fail);
      $rootScope.$digest();

      expect(fail.calledOnce).to.be.true;
    });

    it('should reject when bad response from server', function () {
      var fail = sandbox.stub();

      localStorageService.get = sandbox.stub().returns(testToken);
      requestRefresh().respond(400);

      TokenAuthService.tokenRefresh().catch(fail);
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
    });

    it('should reject if another request is currently pending', function () {
      var fail = sandbox.stub();
      localStorageService.get = sandbox.stub().returns(testToken);
      CurrentUser.$get = sandbox.stub().returns($q.resolve());

      TokenAuthService.tokenRefresh();
      TokenAuthService.tokenRefresh().catch(fail);

      $httpBackend.expectPOST(TokenAuthConfig.getApiEndpointRefresh()).respond({});
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
    });

    describe('when no token in storage', function () {

      beforeEach(function () {
        TokenAuthService.requestBufferClear = sandbox.stub();
        CurrentUser.logout = sandbox.stub();
        TokenAuthConfig.callAuthFailureHandlers = sandbox.stub();
      });

      it('should clear the request buffer', function () {

        TokenAuthService.tokenRefresh();
        $rootScope.$digest();

        expect(TokenAuthService.requestBufferClear.calledOnce).to.be.true;
      });

      it('should logout the current user', function () {

        TokenAuthService.tokenRefresh();
        $rootScope.$digest();

        expect(CurrentUser.logout.calledOnce).to.be.true;
      });

      it('should call auth failure handlers', function () {

        TokenAuthService.tokenRefresh();
        $rootScope.$digest();

        expect(TokenAuthConfig.callAuthFailureHandlers.calledOnce).to.be.true;
      });

      it('should return a rejected promise', function () {
        var fail = sandbox.stub();

        TokenAuthService.tokenRefresh().catch(fail);
        $rootScope.$digest();

        expect(fail.calledOnce).to.be.true;
      });
    });
  });

  describe('request buffer', function () {

    it('should have functionality to add to buffer', function () {
      var config = {url: '1'};

      TokenAuthService.requestBufferPush(config);

      expect(TokenAuthService._requestBuffer.length).to.equal(1);
      expect(TokenAuthService._requestBuffer[0]).not.to.equal(config);
      expect(TokenAuthService._requestBuffer[0].url).to.equal(config.url);
    });

    it('should remove timeouts from added configs', function () {
      var config = {url: '1', timeout: {a: '123'}};

      TokenAuthService.requestBufferPush(config);

      expect(TokenAuthService._requestBuffer[0].url).to.equal(config.url);
      expect(TokenAuthService._requestBuffer[0].timeout).to.be.undefined;
    });

    it('should have functionality to retry buffer', function () {
      var config1 = {method: 'GET', url: '1'};
      var config2 = {method: 'GET', url: '2'};
      var config3 = {method: 'GET', url: '3'};

      TokenAuthService.requestBufferClear = sandbox.stub();

      TokenAuthService.requestBufferPush(config1);
      TokenAuthService.requestBufferPush(config2);
      TokenAuthService.requestBufferPush(config3);

      TokenAuthService.requestBufferRetry();

      $httpBackend.expectGET('1').respond(200);
      $httpBackend.expectGET('2').respond(200);
      $httpBackend.expectGET('3').respond(200);
      $httpBackend.flush();

      expect(config1.timeout).to.be.defined;
      expect(config2.timeout).to.be.defined;
      expect(config3.timeout).to.be.defined;
      expect(TokenAuthService.requestBufferClear.calledOnce).to.be.true;
    });

    it('should cancel other requests when one request fails on HTTP 401 or 403', function () {
      var config1 = {method: 'GET', url: '1'};
      var config2 = {method: 'GET', url: '2'};
      var config3 = {method: 'GET', url: '3'};

      var buffered1 = TokenAuthService.requestBufferPush(config1);
      var buffered2 = TokenAuthService.requestBufferPush(config2);
      var buffered3 = TokenAuthService.requestBufferPush(config3);

      TokenAuthService.requestBufferRetry();

      $httpBackend.expectGET('1').respond(401);
      $httpBackend.expectGET('2').respond(200);
      $httpBackend.expectGET('3').respond(200);
      $httpBackend.flush();

      // according to angular $http docs, a config.timeout that's a resolved promise
      //  will result in a request failure, which is what we want in this case, note:
      //  a promise with $$state.status === 1 is a resolved promise
      expect(buffered1.timeout.$$state.status).to.equal(1);
      expect(buffered2.timeout.$$state.status).to.equal(1);
      expect(buffered3.timeout.$$state.status).to.equal(1);
    });

    it('should not cancel requests for error codes not HTTP 401 or 403', function () {
      var config1 = {method: 'GET', url: '1'};
      var config2 = {method: 'GET', url: '2'};
      var config3 = {method: 'GET', url: '3'};

      var buffered1 = TokenAuthService.requestBufferPush(config1);
      var buffered2 = TokenAuthService.requestBufferPush(config2);
      var buffered3 = TokenAuthService.requestBufferPush(config3);

      TokenAuthService.requestBufferRetry();

      $httpBackend.expectGET('1').respond(500);
      $httpBackend.expectGET('2').respond(400);
      $httpBackend.expectGET('3').respond(404);
      $httpBackend.flush();

      expect(buffered1.timeout.$$state.status).to.equal(0);
      expect(buffered2.timeout.$$state.status).to.equal(0);
      expect(buffered3.timeout.$$state.status).to.equal(0);
    });

    it('should have functionality to clear buffer', function () {
      TokenAuthService.requestBufferPush({});
      TokenAuthService.requestBufferPush({});
      TokenAuthService.requestBufferPush({});

      TokenAuthService.requestBufferClear();

      expect(TokenAuthService._requestBuffer.length).to.equal(0);
    });
  });

  describe('login', function () {
    var username = 'abc';
    var password = '123';

    it('should setup auth token in local storage', function () {
      CurrentUser.$get = sandbox.stub().returns($q.resolve());

      TokenAuthService.login(username, password);
      $httpBackend.expectPOST(
        TokenAuthConfig.getApiEndpointAuth(),
        {
          username: username,
          password: password
        }
      ).respond({token: testToken});
      $httpBackend.flush();

      expect(localStorageService.get(TokenAuthConfig.getTokenKey())).to.equal(testToken);
    });

    it('should retrieve current user and call auth success handlers', function () {
      var fakeUser = {};
      var loginSuccess = sandbox.stub();

      CurrentUser.$get = sandbox.stub().returns($q.resolve(fakeUser));
      TokenAuthConfig.callAuthSuccessHandlers = sandbox.stub().withArgs(fakeUser);

      TokenAuthService.login(username, password).then(loginSuccess);
      $httpBackend.expectPOST(
        TokenAuthConfig.getApiEndpointAuth(),
        {
          username: username,
          password: password
        }
      ).respond({token: testToken});
      $httpBackend.flush();

      expect(CurrentUser.$get.calledOnce).to.be.true;
      expect(TokenAuthConfig.callAuthSuccessHandlers.calledOnce).to.be.true;
      expect(loginSuccess.calledOnce).to.be.true;
    });

    it('should reject on failure', function () {
      var fail = sandbox.stub();
      var failVerification = sandbox.stub();

      TokenAuthConfig.callAuthFailureHandlers = sandbox.stub();

      TokenAuthService.login(username, password).catch(fail);

      $httpBackend.expectPOST(
        TokenAuthConfig.getApiEndpointAuth(),
        {
          username: username,
          password: password
        }
      ).respond(401);
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
      expect(TokenAuthConfig.callAuthFailureHandlers.calledOnce).to.be.true;
    });

    it('should logout current user on failure', function () {

      CurrentUser.logout = sandbox.stub();

      TokenAuthService.login(username, password);

      $httpBackend.expectPOST(
        TokenAuthConfig.getApiEndpointAuth(),
        {
          username: username,
          password: password
        }
      ).respond(401);
      $httpBackend.flush();

      expect(CurrentUser.logout.calledOnce).to.be.true;
    });

    it('should reject if another request is currently pending', function () {
      var fail = sandbox.stub();
      CurrentUser.$get = sandbox.stub().returns($q.resolve());

      TokenAuthService.login(username, password);
      TokenAuthService.login(username, password).catch(fail);

      $httpBackend.expectPOST(TokenAuthConfig.getApiEndpointAuth()).respond({});
      $httpBackend.flush();

      expect(fail.calledOnce).to.be.true;
    });
  });

  describe('logout', function () {

    it('should logout current user', function () {
      CurrentUser.logout = sandbox.stub();

      TokenAuthService.logout();

      expect(CurrentUser.logout.calledOnce).to.be.true;
    });

    it('should call unauth handlers', function () {
      TokenAuthConfig.callUnauthHandlers = sandbox.stub();

      TokenAuthService.logout();

      expect(TokenAuthConfig.callUnauthHandlers.calledOnce).to.be.true;
    });

    it('should remove token from local storage', function () {
      var key = 'some token key';
      TokenAuthConfig.getTokenKey = sandbox.stub().returns(key);
      localStorageService.remove = sandbox.stub().withArgs(key);

      TokenAuthService.logout();

      expect(TokenAuthConfig.getTokenKey.calledOnce).to.be.true;
      expect(localStorageService.remove.calledOnce).to.be.true;
    });
  });

  describe('method interactions', function () {

    it('should not allow multiple token auth requests to occur', function () {
      localStorageService.get = sandbox.stub().returns(testToken);

      TokenAuthService.tokenVerify();
      TokenAuthService.tokenRefresh();
      TokenAuthService.login('abc', '123');

      // we should only get a request to the verify endpoint
      requestVerify().respond(403);
      $httpBackend.flush();
    });
  });
});
