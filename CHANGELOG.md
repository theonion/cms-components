# cms-components Change Log

<!-- markdown-toc -->

- [0.7.0](#070)
  * [Fixed](#fixed)
  * [Breaking](#breaking)
- [0.6.1](#061)
  * [Updated](#updated)
- [0.6.0](#060)
  * [New](#new)
    + [Image Upload](#image-upload)
    + [Button](#button)
    + [Input](#input)
  * [Updated](#updated-1)
    + [Image Upload](#image-upload-1)
    + [Button](#button-1)
  * [Breaking](#breaking-1)
- [0.5.0](#050)
  * [Breaking](#breaking-2)
- [0.4.2](#042)
  * [Fixed](#fixed-1)
  * [Breaking](#breaking-3)
- [0.4.1](#041)
  * [Added](#added)
  * [Updated](#updated-2)
- [0.4.0](#040)
  * [New](#new-1)
  * [Updated](#updated-3)
  * [Breaking](#breaking-4)
    + [Token Auth](#token-auth)
    + [Other Components](#other-components)
    + [Styling](#styling)

<!-- markdown-toc-stop -->

<sub>**Note**: update table of contents with `./scripts/update-changelog-toc`.</sub>

## 0.7.0

### Fixed
1. `cms-token-auth-login-form` now displays an error message if backend returns an empty response.

### Breaking
1. `cms-table*` components refactored to no longer operate on DOM nodes directly.


## 0.6.1

### Updated
1. Add an error message for 500 server errors, which were getting lost.


## 0.6.0

Updates to components touched by `tunic-cms` `campaign-edit-form` in https://github.com/theonion/tunic-cms/pull/9.

### New
1. `cms-components` `$render.renderToRoot` now takes an `template` parameter that is the template string to use to render the given route.
1. Added `cms-notifications` directive that can be used to display notifications registered with `NotificationsService`.
1. Added `cms-tooltip` directive that can be applied as an attribute to an element that should open up a tooltip.
1. Added `cms-unsaved-changes-guard` directive that can be applied as an attribute on a form to intercept navigation when the form's `$dirty` property is `true` property.
1. `error`, `warning`, and `info` color palettes added to `colors.scss`.
1. `input-with-icon-container` added to `mixins.scss` for styling an input that looks like it has icons inside of it.
1. `button-unstyled` added to `mixins.scss` for removing all styling from a button element.

#### Image Upload
1. If nested within an angular `form` will set the `form` to dirty when any image changes occur.
1. Added `betty-editable-button-text` attribute which allows customization of text displayed on main button.
1. Added `betty-editable-input-name` attribute which opens up the angular form interface for this form component.

#### Button
1. Added `button-type` attribute which maps directly to `type` attribute on rendered button.
1. Added `button-disabled` attribute which will disable the button when truthy.
1. Added `button-glyph-class` attribute which specifies the class to use to style the rendered button.
1. Added `button-glyph-prefix` attribute which specifies the prefix to use for glyph.

#### Input
1. Added `cms-input-errors-show-when` attribute to turn all errors on/off for input.
1. Added `cms-input-errors` attribute that can be used to provide a map of error messages and when they should render.
1. Use `invalid` class on input to style it as invalid.


### Updated
1. `cms-nav-user` directive is now responsible for showing/hiding itself based on whether or not given user is logged in.
1. `cms-row` `cms-row-col-*` classes added for determining how many columns a given `cms-row` should take up in their flex container.

#### Image Upload
1. Buttons are now `type="button"` to prevent issues with form submission.
1. Crop changes update image display within the component.
1. `image-crop-modal` buttons are now `type="button"` to prevent issues with form submission.

#### Button
1. `glyphpos` can be set to `after` to render icon after component's transclusion.
1. `type` attribute defaults to `friendly`.


### Breaking
1. Removed `cms-layout` `cms-row` transclusion styling that was causing layout headaches.
1. Removed unused `TokenAuthConfig` `setAfterLoginPath` and `getAfterLoginPath`.


## 0.5.0

Hotfix for the way `TokenAuthService` calls `CurrentUser.$get`. Should actually fix locking issue.

### Breaking

1. Auth success handlers will no longer receive user object.

## 0.4.2
**PR [#8](https://github.com/theonion/cms-components/pull/8)**

More hotfixes for `bulbs-cms-2`.

### Fixed

1. Avoid condition where a `CurrentUser.$get` request before a `TokenAuthService.tokenVerify` would lock up the token auth logic.

### Breaking

1. Removed unused `loginPagePath` variable and associated methods from `TokenAuthConfig`.

## 0.4.1
**PR [#7](https://github.com/theonion/cms-components/pull/7)**

Hotfixes to accommodate `bulbs-cms-2`'s new dep on this project in [bulbs-cms-2#16](https://github.com/theonion/bulbs-cms-2/pull/16).

### Added

1. Chainable configurations for `TokenAuthConfig`.

### Updated

1. User is now retrieved directly from response instead of unpacked from an array. Reflects tunic changes made @ https://github.com/theonion/tunic/pull/29.
1. Using `addLoginHandler`/`addLogoutHandler` after a successful login/logout, will cause that handler to fire immediately.

## 0.4.0
**PR [#6](https://github.com/theonion/cms-components/pull/6)**

Moves [theonion/token-auth-frontend](https://github.com/theonion/token-auth-frontend) into this library and cleans up related components.

### New

1. Added `bower` deps for `angular`, `angular-local-storage`, `lodash`, dev dep for `angular-mocks`. For testing and keeping deps local to the projects that use them.
1. Added `cms-nav-user` directive under the `'cmsComponents.navUser'` module that can be used to display a user's name and a dropdown to access user-related actions.
1. Added `userDisplay` filter under the `'cmsComponents.filters.userDisplay'` module that can be used on a user object to get their display name.

### Updated

1. `cms-layout` component no longer listens to user change events and is not responsible for knowing when a user is logged in or logged out. `cms-login-requried-wrapper` has been added for this purpose and should be used to wrap any elements that should be hidden if a user is not logged in.
1. Karma now runs tests properly.
1. Added `resources/js/testing/test-helper.js` for modifications to the overall test environment and test utilities.

### Breaking
#### Token Auth
Following are breaking changes to token authentication, see [token auth README](https://github.com/theonion/cms-components/blob/c0e841fe135b8dfc6c904226f30814f9b65f25c7/components/cms-token-auth/README.md) for implementation details of new token auth library. *Note*: replacements are not 1 to 1 and implementation details for new library must be followed.

1. Removed `components/auth/auth-interceptor.*` and `components/auth/http-request-buffer-factory.js`  in favor of `cms-token-auth/cms-token-auth-interceptor/`.
1. Removed `components/auth/auth-service.*` in favor of `cms-token-auth/cms-token-auth-service/`.
1. Removed `components/auth/auth.js` in favor of `cms-token-auth/cms-token-auth.js` and related directives/services/configurations.
1. Removed `components/auth/current-user.js` in favor of `cms-token-auth/cms-token-auth-user/`. `CurrentUser` as implemented here no longer emits a `userchange` event and instead listeners should be added/removed with `addLoginHandler`, `addLogoutHandler`, `removeLoginHandler`, `removeLogoutHandler`.
1. Removed `components/cms-login/` in favor of `components/cms-token-auth/cms-token-auth-login-form/`.
1. Removed `components/cms-logout/` in favor of `components/cms-token-auth/cms-token-auth-logout/`.

#### Other Components
1. Removed `components/user-menu/` and `components/user-profile/` in favor of `components/cms-nav-user/`.

#### Styling
1. `styles/forms.scss` `.control-label` no longer uppercases and unbolds. This was undoing any styling bootstrap would be doing to `control-label` elements.
