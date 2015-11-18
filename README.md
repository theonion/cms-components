# cms-components
A repository to park onionstudios cms components for a while until we figure out what this means to bulbs.

# Installation

Install cms-components.

```json
"cms-components": "https://0469c955e10241b40fffe0225e29a3c238aadf69@github.com/theonion/cms-components.git#<version>",
```

## Update your grunt tasks.
cms-component does not build itself for distribution, it relies on being added to your grunt tasks.

### Add a section to your `tasks/options/ngtemplates.js` configuration:

```js
  components: {
    cwd: 'bower_components/cms-components',
    src: [
      'components/**/*.html'
    ],
    dest: '.tmp/pre-complete/scripts/cms-templates.js',
    options: {
      htmlmin: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      module: 'cmsComponents.templates',
      standalone: true
    }
  }
```

### And update `tasks/options/sass.js`.
Add cms-components to the loadPaths
```
  options: {
      loadPath: [
        'bower_components/',
        'app/styles/',
        'bower_components/cms-components/styles' // <<<=== THIS LINE
      ],
    },
```

And add an entry for the sass files:
```
    files: [{
      expand: true,
      flatten: true,
      cwd: 'bower_components/cms-components',
      src: [
        'components/**/*.scss',
        'styles/**/*.scss',
      ],
      dest: '.tmp/pre-3/styles',
      ext: '.css'
    }]
```

# Development
Checkout the repo:

```
git clone git@github.com:theonion/cms-components.git
```

Use `bower link`
```
cd cms-components
bower link
```
```
cd path-to-project-using-cms-components/
bower link cms-components
```

# Generating new components
Use the generator to scaffold out a directive:
```
bin/generate-directive --path components/example-directive --name example-directive
```
And run `scripts/collect-main` to regenerate the `main` key of the `bower.json`

_The `generate-directive` script will be available in your parent project at `node_modules/.bin/generate-directive`._

Once you're done be sure to `git tag X.Y.Z` and test against an install from github (vs bower link in development).
