# cms-components Change Log

## 0.4.0
PR [#6](https://github.com/theonion/cms-components/pull/6)

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
