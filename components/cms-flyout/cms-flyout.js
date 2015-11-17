'use strict';

angular.module('cmsComponents')
  .directive('cmsFlyout', function () {
    return {
      templateUrl: 'components/cms-flyout/cms-flyout.html',
      restrict: 'E',
      transclude: true,

      controller: ['$scope', '$element', '$document',
        function ($scope, $element, $document) {
          var active = false;
          var activeClass = 'cms-flyout-active';
          $scope.$on
          function toggleActive (event) {
            // don't close if clicking on the panel
            if ($(event.target).closest('cms-flyout-panel')[0]) {
              return;
            }

            active = !active;
            if (active) {
              $element.addClass(activeClass)
              setTimeout(function () {
                $document.bind('click', toggleActive);
              });
            }
            else {
              $element.removeClass(activeClass);
              $document.unbind('click', toggleActive);
            }
          }
          $element.on('click', '[cms-flyout-trigger]', toggleActive);
          $scope.$on('flyout-close', function (event) {
            event.stopPropagation();
            if (active) {
              toggleActive(event);
            }
          });

          // do close if navigating
          $scope.$on('$locationChangeStart', function(event, next, current) {
            if (active) { toggleActive(event) };
          });
        }]
    }
  })
  .directive('cmsFlyoutTrigger', function () {
    return {
      restrict: 'A',
      controller: ['$scope', function ($scope) {
      }]
    };
  })
;
