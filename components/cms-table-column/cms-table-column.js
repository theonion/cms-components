'use strict';

/**
 * Specifies layout and rendering of a given column for a cms-table. Defines how
 *  cms-table-cell elements will render.
 */
angular.module('cmsComponents')
  .directive('cmsTableColumn', [
    '$compile', '$interpolate', '$parse', '$q', '$templateRequest',
    function ($compile, $interpolate, $parse, $q, $templateRequest) {

      return {
        restrict: 'E',
        require: '^cmsTable',
        scope: {
          title: '@',           // title of column
          sort: '@',            // name of field that this sorts
          size: '&',            // size of column relative to other columns
          // will use only one of the following cell-* attrs to render contents
          cellTemplate: '@',    // template to use for cell rendering, for use with simple, non-html templates
          cellTemplateUrl: '@'  // url to template to use for cell rendering, for use with complex templates with html
        },
        link: function (scope, element, attrs, cmsTable) {
          var defer = $q.defer();
          var getTemplate = defer.promise;

          cmsTable.addColumn({
            title: scope.title,
            sort: scope.sort,
            size: scope.size() || 1,
            buildHtml: function (scope) {
              return getTemplate.then(function (compiler) {
                return compiler(scope);
              });
            }
          });

          if (scope.cellTemplateUrl) {
            $templateRequest(scope.cellTemplateUrl)
              .then(function (template) {
                defer.resolve(function (scope) {
                  // seems weird and unnecessary, why doesn't $compile fill in
                  //  {{ interpolateSections }}?
                  return $compile($interpolate(template)(scope))(scope);
                });
              })
              .catch(defer.reject);
          } else if (scope.cellTemplate) {
            defer.resolve($parse(scope.cellTemplate));
          }
        }
      }
    }
  ]);
