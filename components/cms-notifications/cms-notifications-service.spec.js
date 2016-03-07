'use strict';

describe('Service: NotificationsService', function () {
  require('./cms-notifications-service');

  var NotificationsService;

  beforeEach(function () {
    angular.mock.module('cmsComponents.notifications.service');

    inject(function (_NotificationsService_) {
      NotificationsService = _NotificationsService_;
    });
  });

  describe('errors', function () {

    it('should have a way to add one', function () {
      var message = 'My garbage error.';

      NotificationsService.addError(message);

      var errors = NotificationsService.listErrors();
      expect(errors.length).to.equal(1);
      expect(errors[0].message).to.equal(message);
    });

    it('should have a way to remove one', function () {

      var id = NotificationsService.addError('blabh albah');
      NotificationsService.removeError(id);

      expect(NotificationsService.listErrors().length).to.equal(0);
    });

    it('should have a way to list all of them', function () {

      NotificationsService.addError('one');
      NotificationsService.addError('two');
      NotificationsService.addError('three');

      expect(NotificationsService.listErrors().length).to.equal(3);
    });

    it('should check removal conditions when listing all of them', function () {

      NotificationsService.addError('my garbage error', function () { return true; });

      expect(NotificationsService.listErrors().length).to.equal(0);
    });

    it('should have a way to clear all of them', function () {

      NotificationsService.addError('one');
      NotificationsService.addError('two');
      NotificationsService.addError('three');
      NotificationsService.clearErrors();

      expect(NotificationsService.listErrors().length).to.equal(0);
    });
  });

  describe('warnings', function () {

    it('should have a way to add one', function () {
      var message = 'My garbage warning.';

      NotificationsService.addWarning(message);

      var warnings = NotificationsService.listWarnings();
      expect(warnings.length).to.equal(1);
      expect(warnings[0].message).to.equal(message);
    });

    it('should have a way to remove one', function () {

      var id = NotificationsService.addWarning('blabh albah');
      NotificationsService.removeWarning(id);

      expect(NotificationsService.listWarnings().length).to.equal(0);
    });

    it('should have a way to list all of them', function () {

      NotificationsService.addWarning('one');
      NotificationsService.addWarning('two');
      NotificationsService.addWarning('three');

      expect(NotificationsService.listWarnings().length).to.equal(3);
    });

    it('should check removal conditions when listing all of them', function () {

      NotificationsService.addWarning('my garbage warning', function () { return true; });

      expect(NotificationsService.listWarnings().length).to.equal(0);
    });

    it('should have a way to clear all of them', function () {

      NotificationsService.addWarning('one');
      NotificationsService.addWarning('two');
      NotificationsService.addWarning('three');
      NotificationsService.clearWarnings();

      expect(NotificationsService.listWarnings().length).to.equal(0);
    });
  });

  describe('infos', function () {

    it('should have a way to add one', function () {
      var message = 'My garbage info.';

      NotificationsService.addInfo(message);

      var infos = NotificationsService.listInfos();
      expect(infos.length).to.equal(1);
      expect(infos[0].message).to.equal(message);
    });

    it('should have a way to remove one', function () {

      var id = NotificationsService.addInfo('blabh albah');
      NotificationsService.removeInfo(id);

      expect(NotificationsService.listInfos().length).to.equal(0);
    });

    it('should have a way to list all of them', function () {

      NotificationsService.addInfo('one');
      NotificationsService.addInfo('two');
      NotificationsService.addInfo('three');

      expect(NotificationsService.listInfos().length).to.equal(3);
    });

    it('should check removal conditions when listing all of them', function () {

      NotificationsService.addInfo('my garbage info', function () { return true; });

      expect(NotificationsService.listInfos().length).to.equal(0);
    });

    it('should have a way to clear all of them', function () {

      NotificationsService.addInfo('one');
      NotificationsService.addInfo('two');
      NotificationsService.addInfo('three');
      NotificationsService.clearInfos();

      expect(NotificationsService.listInfos().length).to.equal(0);
    });
  });
});
