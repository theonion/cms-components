'use strict';

describe('Directive: cms-button', function () {
  require('./cms-button');

  var digestedScope;
  var html;

  beforeEach(function () {
    angular.mock.module('cmsComponents.button');

    inject(function ($compile, $rootScope) {

      html = angular.element('<cms-button></cms-button>');

      digestedScope = window.testHelper.directiveBuilder($compile, $rootScope, html);
    });
  });

  it('should have a transclusion for button content', function () {
    var elementName = 'my-element';

    html.append('<' + elementName + '>');
    digestedScope();

    expect(html.find('ng-transclude').find(elementName).length).to.equal(1);
  });

  describe('button type', function () {

    it('should be "button" by default', function () {

      digestedScope();

      expect(html.find('button').attr('type')).to.equal('button');
    });

    it('should modify the rendered button\'s type attribute', function () {
      var type = 'customtype';

      html.attr('button-type', type);
      digestedScope();

      expect(html.find('button').attr('type')).to.equal(type);
    });
  });

  describe('button disable', function () {

    it('should enable the button by default', function () {

      digestedScope();

      expect(html.find('button').attr('disabled')).to.be.undefined;
    });

    it('should disable the button when truthy', function () {

      html.attr('button-disabled', 'true');
      digestedScope();

      expect(html.find('button').attr('disabled')).to.be.defined;
    });

    it('should enable the button when falsy', function () {

      html.attr('button-disabled', 'false');
      digestedScope();

      expect(html.find('button').attr('disabled')).to.be.undefined;
    });
  });

  describe('button styling', function () {

    it('should be "friendly" by default', function () {

      digestedScope();

      expect(html.find('button').hasClass('friendly-action')).to.be.true;
    });

    it('should apply given css class name', function () {
      var style = 'muted';

      html.attr('type', style);
      digestedScope();

      expect(html.find('button').hasClass(style + '-action')).to.be.true;
    });
  });

  describe('glyph styling', function () {

    it('should default to "fa" for glyph library class', function () {

      digestedScope();

      expect(html.find('i').hasClass('fa')).to.be.true;
    });

    it('should provide a way to give glyph library class', function () {
      var glyphClass = 'ccc';

      html.attr('button-glyph-class', glyphClass);
      digestedScope();

      expect(html.find('i').hasClass(glyphClass)).to.be.true;
    });

    it('should default to "fa" for glyph prefix', function () {

      digestedScope();

      expect(html.find('i').hasClass('fa-question-circle')).to.be.true;
    });

    it('should provide a way to give glyph prefix', function () {
      var glyphPrefix = 'ccc123';

      html.attr('button-glyph-prefix', glyphPrefix);
      digestedScope();

      expect(html.find('i').hasClass(glyphPrefix + '-question-circle')).to.be.true;
    });

    it('should default to "question-circle" for glyph name', function () {

      digestedScope();

      expect(html.find('i').hasClass('fa-question-circle')).to.be.true;
    });

    it('should provide a way to give glyph name', function () {
      var glyphName = 'my-custom-glyph';

      html.attr('glyph', glyphName);
      digestedScope();

      expect(html.find('i').hasClass('fa-' + glyphName)).to.be.true;
    });

    it('should provide a way to give glyph size', function () {
      var glyphSize = 'ccc-3x';

      html.attr('glyphsize', glyphSize);
      digestedScope();

      expect(html.find('i').hasClass(glyphSize)).to.be.true;
    });
  });

  describe('glyph position', function () {

    it('should put the button before content by default', function () {

      digestedScope();

      var children = html.find('button').children();
      expect(children.length).to.equal(2);
      expect(children[0].tagName.toLowerCase()).to.equal('i');
      expect(children[1].tagName.toLowerCase()).to.equal('ng-transclude');
    });

    it('should put the button after content if value is `after`', function () {

      html.attr('glyphpos', 'after');
      digestedScope();

      var children = html.find('button').children();
      expect(children.length).to.equal(2);
      expect(children[0].tagName.toLowerCase()).to.equal('ng-transclude');
      expect(children[1].tagName.toLowerCase()).to.equal('i');
    });

    it('should put the button before content if value is "before"', function () {

      html.attr('glyphpos', 'before');
      digestedScope();

      var children = html.find('button').children();
      expect(children.length).to.equal(2);
      expect(children[0].tagName.toLowerCase()).to.equal('i');
      expect(children[1].tagName.toLowerCase()).to.equal('ng-transclude');
    });
  });

  describe('hide glyph', function () {

    it('should not hide glyph by default', function () {

      digestedScope();

      expect(html.find('i').length).to.equal(1);
    });

    it('should hide glyph when evaluation is truthy', function () {

      html.attr('noglyph', 'true')
      digestedScope();

      expect(html.find('i').length).to.equal(0);
    });
  });
});
