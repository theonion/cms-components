# Unsaved Changes Guard
A component that checks a form for unsaved changes and displays a confirmation
if necessary to verify navigation.

## Setup
1. Provide this module as a dependency of your app/module, for example:
  ```js
  angular.module('myModule', ['cmsComponents.unsavedChangesGuard']);
  ```

1. Add `cms-unsaved-changes-guard` directive to your `html` as an attribute on
  the form you'd like this guard to apply to:
  ```html
  <form cms-unsaved-changes-guard></form>
  ```
  Now a confirmation will intercept any navigation away from the form if the
  form's `$dirty` property is `true`.
