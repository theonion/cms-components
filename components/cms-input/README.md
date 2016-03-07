# Input
An input component for normalizing interactions and styling around inputs in the
CMS.

## Setup
1. Provide this module as a dependency of your app/module, for example:
  ```js
  angular.module('myModule', ['cmsComponents.input']);
  ```

1. Add `cms-input` directive to your `html`:
  ```html
  <cms-input>
    <input name="myField" type="text">
  </cms-input>
  ```

  Available attributes for this directive:

  | Attribute | Usage | Defaults |
  | --------- | ----- | -------- |
  | `title` | Title for input label. | `""` |
  | `cms-input-errors-show-when` | Only explicitly hide errors when this is `false`, by default errors will always show. | `true` |
  | `cms-input-errors` | Object of errors where each key is an error message to show, and each value is a boolean to use to determine if the error shows or not. e.g. `{'my favorite error message': myError === true && showThisError === true}` | `{}` |
