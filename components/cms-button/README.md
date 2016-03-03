# Button
A button component for normalizing interactions and styling around buttons in the
CMS.

## Setup
1. Provide this module as a dependency of your app/module, for example:
  ```js
  angular.module('myModule', ['cmsComponents.button']);
  ```

1. Add `cms-button` directive to your `html`:
  ```html
  <cms-button>My Button</cms-button>
  ```

  Available attributes for this directive:
  | Attribute | Usage | Defaults |
  | --------- | ----- | -------- |
  | `button-type` | Type to apply to button, corresponds directly to html button attribute `type`. | `button` |
  | `button-disabled` | Interpreted string that returns falsy when button should be disabled. | N/A |
  | `type` | Type of styling to apply to button, one of `success`, `friendly`, `muted`, `subtle`, `blended`, `destructive`, `reset`. | `friendly` |
  | `glyph` | Glyph to use from chosen glyph library. | `question-circle` |
  | `button-glyph-class` | Class to use to style glyph. The default is `fa` which will style glyphs according to font-awesome. | `fa` |
  | `button-glyph-prefix` | Prefix to use for glyph icon. The default is `fa` which will prefix `glyph` to look up glpyhs in font-awesome, such as `fa-question-circle`. | `fa` |
  | `button-glyph-size` | A class to use for glyph size. | `''` |
  | `glyph-pos` | Position of glyph relative to text, one of `before` or `after`. | `before` |
  | `no-glyph` | Interpreted string that returns truthy when glyph should be hidden. | N/A |
