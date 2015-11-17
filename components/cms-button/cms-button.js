'use strict';

angular.module('cmsComponents')
  .directive('cmsButton', function () {

    return {
      templateUrl: 'components/cms-button/cms-button.html',
      restrict: 'EA',
      transclude: true,
      scope: {
        glyph: '@',
        type: '@',
        glyphsize: '@',
        glyphpos: '@',
        noglyph: '@'
      },
      link: function ($scope, element, attrs) {
        attrs.type  || (attrs.type = 'friendly');
        attrs.glyph || (attrs.glyph = 'question-circle');
        attrs.glyphsize || (attrs.glyphsize = 'lg');
        attrs.glyphpos || (attrs.glyphpos = 'before');
        if (attrs.noglyph !== undefined) {
          attrs.noglyph = 'noglyph';
        }
      }
    }
  });
