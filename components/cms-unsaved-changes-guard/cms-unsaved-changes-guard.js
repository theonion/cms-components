'use strict';

angular.module('cmsComponents.unsavedChangesGuard', [])
  .directive('cmsUnsavedChangesGuard', [
    function () {
      return {
        require: ['form'],
        restrict: 'A',
        link: function ($scope, elements, attrs, ctrls) {
          var parentForm = ctrls[0];

          var checkDirty = function () {
            if (parentForm.$dirty) {
              return 'You have unsaved changes! Are you sure you want to continue?';
            }
          };

          window.addEventListener('beforeunload', checkDirty);

          $scope.$on('$destroy', function () {
            window.removeEventListener('beforeunload', checkDirty);
          });

          $scope.$on('$stateChangeStart', function (e) {
            var check = checkDirty();
            if (!e.defaultPrevented && check && !confirm(check)) {
              e.preventDefault();
            }
          });
        }
      }
    }
  ]);
