# cms-components
A repository to park onionstudios cms components for a while until we figure out what this means to bulbs.

## Installation

Install cms-components.

```json
"cms-components": "https://github.com/theonion/cms-components.git#<version>",
```

### Install ui-router

```
bower install --save angular-ui-router
```

`ui-router` gives nested routing. This is useful for rendering nested states (think navigation elements). The analagous feature in django is template inheritance.

Nested routing means nested state and helpers do render links as 'active' and build link to states.

### Route helpers.

Add a file `app/routes.js`.

If you're building a cms with a `campaigns` section, you might define nested routing like this:

```js
'use strict';

// Set up pushstate routing.
angular.module('<yourAppModule>')
.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}])

.config(['$stateProvider', '$urlRouterProvider', '$renderProvider',
function (state, urlRouter, render) {
  // Create an abstract `campaigns` state. There is no url for this state,
  // we just use it so we can know whether or not the campaigns section is active in the ui.
  state.state('campaigns', { abstract: true });

  // The `campaigns.list` dot notation denotes this as a sub-state of the `campaigns`
  // state. When this state is active, the parent state will also be active.
  state.state('campaigns.list', {

    url: '/campaigns',
    // This special templateProvider helper will render a directive into the root
    // slot of the cms-layout.
    templateProvider: render.renderToRoot('campaigns-list')
  });
  state.state('campaigns.calendar', {
    url: '/calendar',
    templateProvider: render.renderToRoot('calandar')
  });
  state.state('campaigns.notifications', {
    url: '/notifications',
    templateProvider: render.renderToRoot('notifications')
  });

  // It's important to specify the default route here. Because there is no
  // state that handles "/" we need to immediately redirect to /campaigns on page load.
  urlRouter.otherwise('/campaigns');

}]);
```

#### directives: ui-sref-active/ui-sref-active-if

How to add an `active` class to elements when a certain state is active.

If an element is a link to a state, add `ui-sref-active="active"` as an attribute.

```js
<sidebar-nav-item ui-sref-active="active" sref="content.videos">Videos</sidebar-nav-item>
```

Otherwise use: `ui-sref-active-if="active"`
```
<sidebar-panel class="sidebar-panel-content" ui-sref-active-if="content">
```

That example will add an active class to that element if content or any of it's sub-routes are active.

See more in the wild here:

https://github.com/theonion/onionstudios-cms/blob/3b8a4f68eea8031edf55100cce8014082fbbd62f/app/shared/cms-layout/cms-layout.html

## Development

### Setting up your environment

1. Checkout the repo:
  ```bash
  git clone git@github.com:theonion/cms-components.git
  ```

1. Setup your development environment:
  ```bash
  ./scripts/dev-setup
  ```

### Continuous development
To enable building/realtime updating of code changes:

- For **non-docker projects** use `bower link`:
  ```bash
  cd cms-components
  bower link
  ```
  ```bash
  cd path-to-project-using-cms-components/
  bower link cms-components
  ```

- For **docker projects** add the following line to `docker-compose.yml`, under
  the `volumes` section of the particular project `cms-components` is linked to:
  ```yml
    - ../cms-components:/build/bower_components/cms-components
  ```
  Note: this assumes that project is a sibling directory of the `cms-components`
  project directory.

Then, follow the steps in the [Building section below](#building).

### Testing javascript
To run a continuous test:
```bash
$ ./scripts/test-js
```

### Building
For continuous builds while you develop
```bash
./scripts/dev-start
```
or for a single build, run
```bash
./scripts/dev-start --single-run
```

## Generating new components
Use the generator to scaffold out a directive:
```
bin/generate-directive --path components/example-directive --name example-directive
```
And run `scripts/collect-main` to regenerate the `main` key of the `bower.json`

_The `generate-directive` script will be available in your parent project at `node_modules/.bin/generate-directive`._

Once you're done be sure to `git tag X.Y.Z` and test against an install from github (vs bower link in development).
