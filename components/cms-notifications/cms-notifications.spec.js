'use strict';

describe('Directive: cms-notifications', function () {
  require('./cms-notifications-service');
  require('./cms-notifications');

  var digestedScope;
  var html;
  var NotificationsService;

  beforeEach(function () {
    angular.mock.module('cmsComponents.notifications');

    inject(function (_NotificationsService_, $compile, $rootScope) {
      NotificationsService = _NotificationsService_;

      html = angular.element('<cms-notifications></cms-notifications>');

      digestedScope = window.testHelper.directiveBuilder($compile, $rootScope, html);
    });
  });

  describe('errors', function () {

    it('should display newly added ones', function () {
      var errorMessage = 'My garbage error.';

      NotificationsService.addError(errorMessage);
      digestedScope();

      var errors = html.children().find('li');
      expect(errors.length).to.equal(1);
      expect(errors.html().match(errorMessage).length).to.equal(1);
    });

    it('should allow them to be dismissed', function () {
      var errorMessage = 'My garbage error.';
      sinon.spy(NotificationsService, 'removeError');

      var errorId = NotificationsService.addError(errorMessage);
      var $scope = digestedScope();
      var errors = html.children().find('li');
      errors.find('button').triggerHandler('click');
      $scope.$digest();

      expect(html.children().find('li').length).to.equal(0);
      expect(NotificationsService.removeError.withArgs(errorId).calledOnce).to.be.true;
    });
  });

  describe('warnings', function () {

    it('should display newly added ones', function () {
      var warningMessage = 'My garbage warning.';

      NotificationsService.addWarning(warningMessage);
      digestedScope();

      var warnings = html.children().find('li');
      expect(warnings.length).to.equal(1);
      expect(warnings.html().match(warningMessage).length).to.equal(1);
    });

    it('should allow them to be dismissed', function () {
      var warningMessage = 'My garbage warning.';
      sinon.spy(NotificationsService, 'removeWarning');

      var warningId = NotificationsService.addWarning(warningMessage);
      var $scope = digestedScope();
      var warnings = html.children().find('li');
      warnings.find('button').triggerHandler('click');
      $scope.$digest();

      expect(html.children().find('li').length).to.equal(0);
      expect(NotificationsService.removeWarning.withArgs(warningId).calledOnce).to.be.true;
    });
  });

  describe('infos', function () {

    it('should display newly added ones', function () {
      var infoMessage = 'My garbage info.';

      NotificationsService.addInfo(infoMessage);
      digestedScope();

      var infos = html.children().find('li');
      expect(infos.length).to.equal(1);
      expect(infos.html().match(infoMessage).length).to.equal(1);
    });

    it('should allow them to be dismissed', function () {
      var infoMessage = 'My garbage info.';
      sinon.spy(NotificationsService, 'removeInfo');

      var infoId = NotificationsService.addInfo(infoMessage);
      var $scope = digestedScope();
      var infos = html.children().find('li');
      infos.find('button').triggerHandler('click');
      $scope.$digest();

      expect(html.children().find('li').length).to.equal(0);
      expect(NotificationsService.removeInfo.withArgs(infoId).calledOnce).to.be.true;
    });
  });
});
