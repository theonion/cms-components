# Token Auth
A login component that interacts with [django-rest-framework-jwt](https://github.com/GetBlimp/django-rest-framework-jwt).

## Setup
1. Provide this module as a dependency of your app/module, for example:
  ```js
    angular.module('myModule', ['cmsComponents.auth']);
  ```

1. In the `config` step of your app/module, setup auth interceptor to authenticate requests:
  ```js
    $httpProvider.interceptors.push('TokenAuthInterceptor');
  ```

1. In the `run` step of your app/module, add the following:
  ```js
    TokenAuthService.tokenVerify();
  ```
  Which will cause the first required authentication request to fire.

1. Provide a route to the login directive provided as `cms-token-auth-login-form`, which will bring users to the login page.

1. Wherever logout occurs, be sure to call the `logout` cleanup method:
  ```js
    TokenAuthService.logout();
  ```
  Alternatively, you can route to the logout directive provided as `cms-token-auth-logout`, which will call the logout method.

1. Configure `TokenAuthConfig` itself:
  ```js
    angular.module('cmsComponents.auth.config')
      .config([
        'TokenAuthConfigProvider',
        function (TokenAuthConfigProvider) {
          TokenAuthConfigProvider
            .setLogoUrl('myLogo.png');
            .setApiHost('mysite.com');
            .addAuthFailureHandler(function () {
              // TODO : route to your login path here
            })
            .addAuthSuccessHandler(function () {
              // TODO : route to your landing path here
            })
            .addUnauthHandler(function () {
              // TODO : route to your login path here
            });
          ...
        }
      ]);
  ```

  Available configuration methods on `TokenAuthConfigProvider`:

  | Method    | Usage    | Defaults    |
  | --------- | -------- | ----------- |
  | `setAfterLoginPath` | Page to route to after a successful login. | `'/'` |
  | `setApiEndpointAuth` | Endpoint for token `auth`. | `'/api/token/auth'` |
  | `setApiEndpointReferesh` | Endpoint for token `refresh`. | `'/api/token/refresh` |
  | `setApiEndpointVerify` | Endpoint for token `verify`. | `'/api/token/verify'` |
  | `setApiEndpointCurrentUser` | Endpoint for current user data. | `/api/me` |
  | `setApiHost` | Host where endpoints are located. | `''` |
  | `setHandleHttpCodes` | Takes an `Array` of HTTP codes to handle with this token auth library. | `[401, 403]` |
  | `addAuthFailureHandler` | Takes a function to run when authorization fails. | N/A |
  | `addAuthSuccessHandler` | Takes a function to run when authorization succeeds. Function will recieve the `CurrentUser` object. | N/A |
  | `setLogoUrl` | Url of logo to use on login page. | `''` |
  | `setMatchers` | List of regular expressions to match request URLs. Only matched URLs will be intercepted. | `[/.*/]` |
  | `setTokenKey` | Local storage key where token is stored. | `'authToken'` |
  | `addUnauthHandler` | Takes a function to run when manual unauthorization occurrs (logout). | N/A |
