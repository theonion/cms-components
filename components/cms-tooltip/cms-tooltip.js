'use strict';

angular.module('cmsComponents.tooltip', [])
  .directive('cmsTooltip', function () {
    return {
      template: '<span class="cms-tooltip-text">{{ text }}</span>',
      restrict: 'E',
      scope: {
        text: '@cmsTooltipText'
      },
      link: function (scope, elements) {
        elements.siblings('[cms-tooltip-opener]').hover(function (e) {
          var $target = angular.element(e.target);

          var left = $target[0].offsetLeft + $target.width() + 10;
          var top = $target[0].offsetTop - $target.height() / 2;

          elements.css('left', left);
          elements.css('top', top);
        });
      }
    }
  });
