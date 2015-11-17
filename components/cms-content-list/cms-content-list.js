'use strict';

angular.module('cmsComponents')
  .directive('cmsContentList', function () {
    return {
      templateUrl: 'components/cms-content-list/cms-content-list.html',
      restrict: 'E'
    };
  });
