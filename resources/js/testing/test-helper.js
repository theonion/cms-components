!(function (global) {

  /**
   * Function that, as side-effects, modify the global object to emulate the
   *  real runtime environment for testing.
   */
  var prepEnv = function () {
    global.angular.module('lodash', []).constant('_', window._);
  };

  prepEnv();

})(window);
