'use strict';

describe('Directive: cms-unsaved-changes-guard', function () {
  require('./cms-unsaved-changes-guard');

  var digestedScope;
  var html;
  var formName = 'coolForm';
  var sandbox;

  beforeEach(function () {
    angular.mock.module('cmsComponents.unsavedChangesGuard');

    inject(function ($compile, $rootScope) {

      html = angular.element('<form name="' + formName + '" cms-unsaved-changes-guard></form>');

      digestedScope = window.testHelper.directiveBuilder($compile, $rootScope, html);

      sandbox = sinon.sandbox.create();
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('window navigation', function () {

    beforeEach(function () {
      sandbox.stub(window, 'addEventListener').withArgs('beforeunload');
    });

    it('should not be blocked if form is not dirty', function () {

      var $scope = digestedScope();
      $scope[formName].$setPristine();
      var checkDirty = window.addEventListener.args[0][1];

      expect(typeof checkDirty()).to.equal('undefined');
    });

    it('should be blocked if form is dirty', function () {

      var $scope = digestedScope();
      $scope[formName].$setDirty();
      var checkDirty = window.addEventListener.args[0][1];

      expect(typeof checkDirty()).to.equal('string');
    });
  });

  describe('element removal', function () {

    it('should remove befureunload event listener', function () {
      sandbox.stub(window, 'addEventListener').withArgs('beforeunload');
      sandbox.stub(window, 'removeEventListener').withArgs('beforeunload');

      var $scope = digestedScope();
      var checkDirty = window.addEventListener.args[0][1];
      $scope.$destroy();
      var checkDirtyRemoved = window.removeEventListener.args[0][1];

      expect(window.removeEventListener.calledOnce).to.be.true;
      expect(checkDirtyRemoved).to.equal(checkDirty);
    });
  });

  describe('angular navigation', function () {

    it('should not be blocked if form is not dirty', function () {
      var shouldRun = sandbox.stub();
      window.confirm = sandbox.stub();

      var $scope = digestedScope();
      $scope.$on('$stateChangeStart', shouldRun);
      $scope.$emit('$stateChangeStart');

      expect(shouldRun.calledOnce).to.be.true;
      expect(window.confirm.called).to.be.false;
    });

    it('should be blocked if form is dirty', function () {
      var checker = sandbox.stub();
      window.confirm = sandbox.stub();

      var $scope = digestedScope();
      $scope[formName].$setDirty();
      $scope.$on('$stateChangeStart', checker);
      $scope.$emit('$stateChangeStart');

      expect(checker.args[0][0].defaultPrevented).to.be.true;
      expect(window.confirm.calledOnce).to.be.true;
    });
  });
});
