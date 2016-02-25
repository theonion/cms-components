'use strict';

angular.module('cmsComponents.input', [
  'cmsComponents.tooltip'
])
  .directive('cmsInput', [
    function () {
      return {
        templateUrl: 'components/cms-input/cms-input.html',
        restrict: 'E',
        scope: {
          title: '@',                         // title for input label
          inputErrorsShowOnlyWhen: '&',       // only show errors when this is true, any errors will always show
          inputErrors: '&'                    // object of errors where key is the error message and value is a boolean to use to determine if error shows or not
        },
        transclude: true,
        link: function ($scope) {
          $scope.doShowErrors = function () {
            var doShowAttr = $scope.inputErrorsShowOnlyWhen();
            // specifically checking false, so falsy values like undefined don't
            //  trigger errors not showing up
            return doShowAttr === false ? false : true;
          };
        }
      }
    }
  ]);
