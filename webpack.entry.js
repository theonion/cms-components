require('./cms-components');

angular.module('cmsComponents.templates', []);
var context = require.context('./components', true, /\.\/.*\.(js|html|scss)$/);
context.keys().map(context);
