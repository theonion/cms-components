'use strict';

angular.module('cmsComponents')
  .directive('cmsContentList', function () {
    return {
      templateUrl: 'shared/cms-content-list/cms-content-list.html',
      restrict: 'E'
    };
  });
