'use strict';

angular.module('cmsComponents')
  .directive('sidebarNavItem', function () {
    return {
      templateUrl: 'components/sidebar-nav-item/sidebar-nav-item.html',
      restrict: 'E',
      scope: {
        'sref': '@'
      },
      transclude: true
    }
  });
