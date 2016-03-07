'use strict';

describe('Directive: CmsTokenAuthLogout', function () {
  require('./cms-token-auth-logout');

  var digestedScope;
  var TokenAuthService;

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.logout');

    inject(function (_TokenAuthService_, $compile, $rootScope) {
      TokenAuthService = _TokenAuthService_;

      var html = '<cms-token-auth-logout>';

      digestedScope = window.testHelper.directiveBuilder($compile, $rootScope, html);
    });
  });

  it('should call token auth logout', function () {
    TokenAuthService.logout = sinon.stub();

    digestedScope();

    expect(TokenAuthService.logout.calledOnce).to.be.true;
  });
});
