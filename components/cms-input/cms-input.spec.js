'use strict';

describe('Directive: cms-input', function () {
  require('../cms-tooltip/cms-tooltip')
  require('./cms-input');

  var digestedScope;
  var html;

  beforeEach(function () {
    angular.mock.module('cmsComponents.input');
    angular.mock.module('cmsComponents.tooltip');

    inject(function ($compile, $rootScope) {

      html = angular.element('<cms-input></cms-input>');

      digestedScope = function () {
        var $directiveScope = $rootScope.$new();
        var element = $compile(html)($directiveScope);
        $directiveScope.$digest();
        return element.scope();
      };
    });
  });

  it('should have a transclusion for content', function () {
    var elementName = 'input';

    html.append('<' + elementName + '>');
    digestedScope();

    expect(html.find('ng-transclude').find(elementName).length).to.equal(1);
  });

  describe('title', function () {

    it('should display the title inside a label', function () {
      var title = 'My Favorite Input';

      html.attr('title', title);
      digestedScope();

      expect(html.find('label').html().match(title).length).to.equal(1);
    });
  });

  describe('show input errors', function () {

    it('should show errors by default', function () {
      var errorMessage = 'My Favorite Error';

      html.attr('cms-input-errors', '{"' + errorMessage + '": true}');
      var $scope = digestedScope();

      expect(html.find('i').attr('cms-tooltip')).to.equal(errorMessage);
    });

    it('should hide errors when false', function () {

      html.attr('cms-input-errors-show-when', 'false');
      html.attr('cms-input-errors', '{"garbage": true}');
      digestedScope().$digest();

      expect(html.find('i').length).to.equal(0);
    });

    it('should show errors when any value that\'s not false', function () {
      var errorMessage = 'My Favorite Error';

      html.attr('cms-input-errors-show-when', 'true');
      html.attr('cms-input-errors', '{"' + errorMessage + '": true}');
      digestedScope();

      expect(html.find('i').attr('cms-tooltip')).to.equal(errorMessage);
    });
  });

  describe('input errors map', function () {

    it('should display listed errors', function () {
      var errorMessage1 = 'My garbage error 1';
      var errorMessage2 = 'My garbage error 2';
      var errorMessage3 = 'My garbage error 3';
      var errors = {};
      errors[errorMessage1] = true;
      errors[errorMessage2] = true;
      errors[errorMessage3] = false;

      html.attr('cms-input-errors', JSON.stringify(errors));
      digestedScope();

      var icons = html.find('i');
      expect(icons.length).to.equal(2);
      expect(icons.eq(0).attr('cms-tooltip')).to.equal(errorMessage1);
      expect(icons.eq(1).attr('cms-tooltip')).to.equal(errorMessage2);
    });
  });
});
