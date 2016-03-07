'use strict';

describe('Directive: cms-nav-user', function () {
  require('./cms-nav-user');

  var $q;
  var CurrentUser;
  var digestedScope;
  var html;

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.user');
    angular.mock.module('cmsComponents.auth.loginRequiredWrapper');
    angular.mock.module('cmsComponents.filters.userDisplay');
    angular.mock.module('cmsComponents.navUser');

    inject(function (_$q_, _CurrentUser_, $compile, $rootScope) {
      $q = _$q_;
      CurrentUser = _CurrentUser_;

      html = angular.element('<cms-nav-user></cms-nav-user>');

      digestedScope = window.testHelper.directiveBuilder($compile, $rootScope, html);
    });
  });

  describe('display conditions', function () {

    it('should not display if there is no user', function () {
      CurrentUser.$get = sinon.stub().returns($q.reject());
      digestedScope();

      expect(html.find('cms-login-required-wrapper').children().length).to.equal(0);
    });

    it('should display if there is a user', function () {
      var user = {};

      CurrentUser.$get = sinon.stub().returns($q.resolve(user));
      digestedScope();

      expect(html.find('cms-login-required-wrapper').children().length).to.be.above(0);
    });
  });

  describe('markup', function () {

    it('should display user name based on userDisplay filter', function () {
      var user = {full_name: 'garbage'};

      CurrentUser.$get = sinon.stub().returns($q.resolve(user));
      digestedScope().$digest();

      expect(html.html().match(user.full_name).length).to.equal(1);
    });

    it('should have a link to logout route', function () {

      CurrentUser.$get = sinon.stub().returns($q.resolve({}));
      digestedScope().$digest();

      expect(html.find('a').attr('ui-sref')).to.equal('logout');
    });
  });
});
