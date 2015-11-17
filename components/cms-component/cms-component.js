'use strict';

angular.module('cmsComponents')
  .directive('cmsComponent', ['$compile', function ($compile) {
    return {
      template: '',
      restrict: 'E',
      compile: function (element, attrs) {
        return {
          pre: function ($scope, $element, $attrs) {
            $element.append(document.createElement(attrs.tag));
            $compile($element.contents())($scope);
          }
        };
      }
    }
  }]);
