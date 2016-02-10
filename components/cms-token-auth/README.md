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
          TokenAuthConfigProvider.setApiHost('base.url.for.api.with.drf.token.auth.com');
          TokenAuthConfigProvider.setApiEndpointAuth('/authentication/endpoint/provided/by/api');
          TokenAuthConfigProvider.setApiEndpointRefresh('/token/refresh/endpoint/provied/by/api');
          TokenAuthConfigProvider.setLoginPagePath('/where/the/login/page/is/hosted');
        }
      ]);
  ```
