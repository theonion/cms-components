'use strict';

angular.module('cmsComponents.tooltip', [])
  .directive('cmsTooltip', function () {
    return {
      restrict: 'A',
      scope: {
        text: '@cmsTooltip',
        classes: '@cmsTooltipClasses'
      },
      link: function (scope, elements) {

        var tooltipEle = angular.element(
          '<div class="cms-tooltip-container ' + scope.classes + '">' +
            '<span class="cms-tooltip-text">' + scope.text + '</span>' +
          '</div>'
        );
        angular.element(document.body).append(tooltipEle);

        elements.on('mouseenter', function (e) {
          var $target = angular.element(e.target);

          var offset = $target.offset();
          var left = offset.left + $target.width() + 10;
          var top = offset.top - $target.height() / 2;

          tooltipEle.css('display', 'block');
          tooltipEle.css('left', left);
          tooltipEle.css('top', top);
        });

        elements.on('mouseleave', function () {
          tooltipEle.css('display', 'none');
        });

        scope.$on('$destroy', function () {
          tooltipEle.remove();
        });
      }
    }
  });
