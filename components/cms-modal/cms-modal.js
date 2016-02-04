'use strict';

angular.module('cmsComponents')
  .directive('cmsModal', function () {
    return {
      templateUrl: 'components/cms-modal/cms-modal.html',
      restrict: 'E',
      modalTitle: '=',
      transclude: true,
      controller: ['$scope', '$element', '$document',

        function ($scope, $element, $document) {

          var active = false;
          var activeClass = 'cms-modal-active';
          
          function toggleActive (event) {
            // don't close if clicking on the inner
            if ($(event.target).closest('cms-modal-content')[0]) {
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
          $element.on('click', '[cms-modal-trigger]', toggleActive);
          $element.on('click', '.close', toggleActive);
          
          $scope.$on('modal-close', function (event) {
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
  .directive('cmsModalTrigger', function () {
    return {
      restrict: 'A',
      controller: ['$scope', function ($scope) {
      }]
    };
  })
;
