'use strict';

angular.module('cmsComponents')
  .directive('cmsPartial', ['$templateCache', '$compile',
  function ($templateCache, $compile) {
    return {
      restrict: 'E',
      compile: function (element, attrs) {
        return {
          post: function ($scope, $element, $attrs) {
            $element[0].innerHTML = $templateCache.resolve({
              path: $attrs.template,
              component: $scope.component
            });
            $compile($element.contents())($scope);
          }
        };
      }
    }
  }]);
