'use strict';

describe('Directive: CmsLoginRequiredWrapper', function () {
  require('./cms-token-auth-login-required-wrapper');

  var CurrentUser;
  var digestedScope;
  var html;

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.loginRequiredWrapper');

    inject(function (_CurrentUser_, $compile, $rootScope) {

      CurrentUser = _CurrentUser_;
      html = angular.element('<cms-login-required-wrapper></cms-login-required-wrapper>');

      CurrentUser.$get = sinon.stub();

      digestedScope = function () {
        var $directiveScope = $rootScope.$new();
        var element = $compile(html)($directiveScope);
        $directiveScope.$digest();
        return element.scope();
      };
    });
  });

  it('should attempt to get current user', function () {

    digestedScope();

    expect(CurrentUser.$get.calledOnce).to.be.true;
  });

  it('should have a login handler that adds user to scope', function () {
    var fakeUser = {};

    CurrentUser.addLoginHandler = sinon.stub();

    var $scope = digestedScope();
    // call handler
    CurrentUser.addLoginHandler.getCall(0).args[0](fakeUser);

    expect(CurrentUser.addLoginHandler.calledOnce).to.be.true;
    expect($scope.user).to.equal(fakeUser);
  });

  it('should have a logout handler that removes user from scope', function () {

    CurrentUser.addLogoutHandler = sinon.stub();

    var $scope = digestedScope();
    $scope.user = {};
    // call handler
    CurrentUser.addLogoutHandler.getCall(0).args[0]();

    expect(CurrentUser.addLogoutHandler.calledOnce).to.be.true;
    expect($scope.user).to.be.null;
  });

  it('should clear handlers from CurrentUser service when destroyed', function () {

    CurrentUser.addLoginHandler = sinon.stub();
    CurrentUser.addLogoutHandler = sinon.stub();
    CurrentUser.removeLoginHandler = sinon.stub();
    CurrentUser.removeLogoutHandler = sinon.stub();

    var $scope = digestedScope();
    var loginHandler = CurrentUser.addLoginHandler.getCall(0).args[0];
    var logoutHandler = CurrentUser.addLogoutHandler.getCall(0).args[0];
    $scope.$destroy();

    expect(CurrentUser.removeLoginHandler.withArgs(loginHandler).calledOnce).to.be.true;
    expect(CurrentUser.removeLogoutHandler.withArgs(logoutHandler).calledOnce).to.be.true;
  });

  it('should display elements inside its transclude if user is on scope', function () {
    var elementName = 'test-element';

    html.append('<' + elementName + '>');
    var $scope = digestedScope();
    $scope.user = {};
    $scope.$digest();

    expect(html.find(elementName).length).to.equal(1);
  });

  it('should not display elements inside its transclude if no user on scope', function () {
    var elementName = 'test-element';

    html.append('<' + elementName + '>');
    var $scope = digestedScope();
    $scope.user = null;
    $scope.$digest();

    expect(html.find(elementName).length).to.equal(0);
  });
});
