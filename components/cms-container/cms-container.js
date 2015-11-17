'use strict';

angular.module('cmsComponents')
  .directive('cmsContainer', function () {
    return {
      templateUrl: 'components/cms-container/cms-container.html',
      restrict: 'E',
      transclude: true
    }
  });
