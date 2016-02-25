'use strict';

angular.module('cmsComponents')
  .directive('cmsButton', function () {

    return {
      templateUrl: 'components/cms-button/cms-button.html',
      restrict: 'EA',
      transclude: true,
      scope: {
        buttonType: '@',                    // button type to apply to html button
        buttonDisabled: '&',                // true to set button disabled
        type: '@type',                      // type of button styling to apply, defaults to 'friendly'
        glyph: '@glyph',                    // glyph to use from glyph library, defaults to 'question-circle'
        glyphClass: '@buttonGlyphClass',    // class to use to style glyph, defaults to 'fa'
        glyphPrefix: '@buttonGlyphPrefix',  // prefix for glyph icon, defaults to 'fa'
        glyphSize: '@buttonGlyphSize',      // class to use for glyph size
        glyphPos: '@glyphpos',              // position of glyph, 'before' or 'after', defaults to 'before'
        hideGlyph: '&noglyph',              // truthy to hide glyph
      },
      link: function ($scope, elements, attrs) {
        $scope.iconClasses =
            ($scope.glyphClass || 'fa') + ' ' +
            ($scope.glyphPrefix || 'fa') + '-' +
            ($scope.glyph || 'question-circle') + ' ' +
            ($scope.glyphSize || '');
        $scope.iconIsBefore = $scope.glyphPos !== 'after';
      }
    }
  });
