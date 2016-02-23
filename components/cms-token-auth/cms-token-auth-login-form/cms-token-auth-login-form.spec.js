'use strict';

describe('Directive: CmsTokenAuthLoginForm', function () {
  require('../cms-token-auth-service/cms-token-auth-service');
  require('./cms-token-auth-login-form');

  var $q;
  var $scope;
  var TokenAuthConfig;
  var TokenAuthService;

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.loginForm');
    angular.mock.module('cmsComponents.auth.service');

    inject(function (_$q_, _TokenAuthConfig_, _TokenAuthService_, $compile, $rootScope) {

      $q = _$q_;
      TokenAuthConfig = _TokenAuthConfig_;
      TokenAuthService = _TokenAuthService_;

      var $directiveScope = $rootScope.$new();
      var element = $compile('<cms-token-auth-login-form></cms-token-auth-login-form>')($directiveScope);
      $directiveScope.$digest();
      $scope = element.isolateScope();
    });
  });

  it('should set some scope variables', function () {
    expect($scope.username).to.equal('');
    expect($scope.password).to.equal('');
    expect($scope.LOGO_URL).to.equal(TokenAuthConfig.getLogoUrl());
  });

  it('should have a function to login', function () {
    $scope.username = 'abc';
    $scope.password = '123';

    TokenAuthService.login = sinon.stub().returns($q.resolve());

    $scope.submitLogin();

    expect(TokenAuthService.login.withArgs($scope.username, $scope.password).calledOnce).to.be.true;
  });

  it('should keep server error messages on scope', function () {
    var errorMsg = 'some error from the server';

    $scope.username = 'hello';
    $scope.password = '123';
    TokenAuthService.login = sinon.stub().returns($q.reject({
      data: {
        non_field_errors: [errorMsg]
      }
    }));

    $scope.submitLogin();
    $scope.$digest();

    expect($scope.loginErrorFromServer).to.equal(errorMsg);
  });

  it('should have a function to clear login errors recieved from server', function () {

    $scope.loginErrorFromServer = 'some error message';

    $scope.clearLoginErrorFromServer();

    expect($scope.loginErrorFromServer).to.equal(null);
  });

  it('should not login when username or password is blank', function () {
    TokenAuthService.login = sinon.stub();

    $scope.username = 'abc';
    $scope.password = '';
    $scope.submitLogin();

    $scope.username = '';
    $scope.password = '123';
    $scope.submitLogin();

    $scope.username = '';
    $scope.password = '';
    $scope.submitLogin();

    expect(TokenAuthService.login.notCalled).to.be.true;
  });
});
