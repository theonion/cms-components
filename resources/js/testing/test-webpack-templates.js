
angular.module('cmsComponents.templates', []);
var context = require.context(__dirname + '/../../../components', true, /\.\/.*\.html$/);
context.keys().map(context);
