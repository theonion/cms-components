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
    TokenAuthService.tokenAuthVerify();
  ```
  Which will cause the first required authentication request to fire.

1. Wherever logout occurs, be sure to call the `logout` cleanup method:
  ```js
    TokenAuthServiceProvider.$get().logout();
  ```

1. Configure `TokenAuthConfig` itself:
  ```js
    angular.module('cmsComponents.auth.config')
      .config([
        'TokenAuthConfigProvider',
        function (TokenAuthConfigProvider) {
          TokenAuthConfigProvider.setLogoUrl('myLogo.png');
          TokenAuthConfigProvider.setApiHost('mysite.com');
          TokenAuthConfigProvider.setApiEndpointAuth('/authentication/endpoint/provided/by/api');
          TokenAuthConfigProvider.setApiEndpointRefresh('/token/refresh/endpoint/provied/by/api');
          TokenAuthConfigProvider.setLoginPagePath('/where/the/login/page/is/hosted');
        }
      ]);
  ```

  Available configuration methods on `TokenAuthConfigProvider`:

  | Method    | Usage    | Defaults    |
  | --------- | -------- | ----------- |
  | setAfterLoginPath | Page to route to after a successful login. | `'/'` |
  | setApiEndpointAuth | Endpoint for token `auth`. | `'/api/token/auth'` |
  | setApiEndpointReferesh | Endpoint for token `refresh`. | `'/api/token/refresh` |
  | setApiEndpointVerify | Endpoint for token `verify`. | `'/api/token/verify'` |
  | setApiHost | Host where endpoints are located. | `''` |
  | setHandleHttpCodes | Takes an `Array` of HTTP codes to handle with this token auth library. | `[401, 403]` |
  | setLoginCallback | Callback to execute when a successful login occurs. Receives the logged in user's username. | `function () {}` |
  | setLoginPagePath | Path to login page. | `''` |
  | setLogoUrl | Url of logo to use on login page. | `''` |
  | setLogoutCallback | Callback to execute when logout occurs. | `function () {}` |
  | setMatchers | List of regular expressions to match request URLs. Only matched URLs will be intercepted. | `[/.*/]` |
  | setTokenKey | Local storage key where token is stored. | `'authToken'` |
