'use strict';

angular.module('<%= directiveModule %>')
  .directive('<%= directiveVarName %>', function () {
    return {
      templateUrl: '<%= directiveTemplatePath %>',
      restrict: 'E'
    }
  });
