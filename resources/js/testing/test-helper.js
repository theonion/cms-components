!(function (global) {

  var directiveBuilder = function ($compile, $scope, html) {
    return function () {
      var $directiveScope = $scope.$new();
      var element = $compile(html)($directiveScope);
      $directiveScope.$digest();
      return element.scope();
    };
  };

  /**
   * Function that, as side-effects, modify the global object to emulate the
   *  real runtime environment for testing.
   */
  var prepEnv = function () {
    global.angular.module('lodash', []).constant('_', window._);

    global.testHelper = {
      directiveBuilder: directiveBuilder
    };
  };

  prepEnv();

})(window);
