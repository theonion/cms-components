'use strict';

angular.module('cmsComponents.input', [
  'cmsComponents.tooltip',
  'cmsComponents.templates'
])
  .directive('cmsInput', [
    function () {
      return {
        templateUrl: 'components/cms-input/cms-input.html',
        restrict: 'E',
        scope: {
          title: '@',                             // title for input label
          showErrors: '&cmsInputErrorsShowWhen',  // only show errors when this is true, by default errors will always show
          errors: '&cmsInputErrors'               // object of errors where key is the error message and value is a boolean to use to determine if error shows or not
        },
        transclude: true,
        link: function ($scope) {

          $scope.doShowErrors = function () {
            var doShowAttr = $scope.showErrors();
            // specifically checking false, so falsy values like undefined don't
            //  trigger errors not showing up
            return doShowAttr === false ? false : true;
          };
        }
      }
    }
  ]);
