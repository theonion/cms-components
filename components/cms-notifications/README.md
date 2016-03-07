# Notifications
A component that can display three levels of dismissable notifications to a user.

## Setup
1. Provide this module as a dependency of your app/module, for example"
  ```js
  angular.module('myModule', ['cmsComponents.notifications']);
  ```

1. Add `cms-notifications` directive to your `html`;
  ```html
  <cms-notifications></cms-notifications>
  ```

1. Inject `NotificationsService` into your directive/controller to modify
  what notifications are displayed:
  ```js
  angular.module('myModule.myController', [
    'cmsComponents.notifications.service'
  ])
    .controller('MyController', [
      '$scope', 'NotificationsService',
      function ($scope, NotificationsService) {

        $scope.formThingIsValid = false;
        NotificationsService.addError(
          'Hey something errored out!',
          function () {
            return $scope.formThingIsValid;
          }
        )
      }
    ]);
  ```

  Which will display the error `Hey something errored out!` inside of the
  `<cms-notifications></cms-notifications>` element until `$scope.formThingIsValid`
  is true.

  Functions available on `NotificationsService`:
  | Name | Arguments | Usage |
  | ---- | --------- | ----- |
  | `addError` | `message`, `removalCondition` | Display `message` as an error until `removalCondition` is `true`. Returns the id of the added error, which can be
  used with `removeError` to remove the error from the errors list. |
  | `removeError` | `id` | Remove error with given `id` from errors list. |
  | `listErrors` | N/A | Returns list of current errors. As a side-effect, any errors whose `removalCondition` returns true will be removed from the list. |
  | `clearErrors` | N/A | Clear list of errors. |
  | `addWarning` | `message`, `removalCondition` | Display `message` as an warning until `removalCondition` is `true`. Returns the id of the added warning, which can be
  used with `removeWarning` to remove the warning from the warnings list. |
  | `removeWarning` | `id` | Remove warning with given `id` from warnings list. |
  | `listWarnings` | N/A | Returns list of current warnings. As a side-effect, any warnings whose `removalCondition` returns true will be removed from the list. |
  | `clearWarnings` | N/A | Clear list of warnings. |
  | `addInfo` | `message`, `removalCondition` | Display `message` as an info until `removalCondition` is `true`. Returns the id of the added info, which can be
  used with `removeInfo` to remove the info from the infos list. |
  | `removeInfo` | `id` | Remove info with given `id` from infos list. |
  | `listInfos` | N/A | Returns list of current infos. As a side-effect, any infos whose `removalCondition` returns true will be removed from the list. |
  | `clearInfos` | N/A | Clear list of infos. |
