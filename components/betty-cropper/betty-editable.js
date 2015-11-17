'use strict';

angular.module('cmsComponents')
  .directive('bettyEditable', ['$http', 'BettyCropper', 'openImageCropModal', function ($http, BettyCropper, openImageCropModal) {
    return {
      templateUrl: 'components/betty-cropper/betty-editable.html',
      restrict: 'E',
      transclude: true,

      scope: {
        'image': '=',
        'addStyles': '@',
        'placeholderText': '@',
        'ratio': '@',
        'editable': '=?',
        'imageChangeCallback': '=',
        'isDisabled': '='
      },

      controller: ['$scope', function ($scope) {
        $scope.editable = angular.isDefined($scope.editable) ? $scope.editable : true;

        $scope.callImageChangeCallback = function (param) {
          if (_.isFunction($scope.imageChangeCallback)) {
            $scope.imageChangeCallback(param);
          }
        };

        $scope.upload = function () {
          BettyCropper.upload().then(
            function (success) {
              $scope.image = {
                id: success.id,
                caption: null,
                alt: null
              };
              $scope.bettyImage = success;
              $scope.callImageChangeCallback(success);
            },
            function (error) {
              console.error(error);
            },
            function (progress) {
              console.log(progress);
            }
          );
        };

        $scope.edit = function () {
          openImageCropModal($scope.image).then(function (image) {
            if (!image.id) {
              $scope.image = null;
            } else {
              $scope.image = image;
              BettyCropper.get($scope.image.id).then(function (response) {
                $scope.bettyImage = response.data;
                $scope.setStyles();
              });
            }

            $scope.callImageChangeCallback();
          });
        };
      }],

      link: function (scope, element) {

        if (!scope.bettyImage) {
          scope.bettyImage = null;
        }

        scope.setStyles = function () {
          if (scope.bettyImage) {
            scope.imageStyling = scope.bettyImage.getStyles(element.parent().width(), element.parent().height(), scope.ratio);
          } else {
            var ratioWidth = parseInt(scope.ratio.split('x')[0], 10);
            var ratioHeight = parseInt(scope.ratio.split('x')[1], 10);
            scope.imageStyling = {
              'background-color': '#333',
              'position': 'relative',
              'width': element.parent().width(),
              'height': Math.floor(element.parent().width() * ratioHeight / ratioWidth) + 'px',
            };
          }
        };

        scope.$watch('image', function (newImage) {
          if (newImage && newImage.id) {
            BettyCropper.get(newImage.id).then(function (response) {
              scope.bettyImage = response.data;
            });
          }
        });

        scope.$watch('bettyImage', function () {
          scope.setStyles();
        }, true);

        element.resize(scope.setStyles);

        scope.removeImage = function () {
          scope.image.id = null;
          scope.callImageChangeCallback();
        };

        scope.editImage = function () {
          openImageCropModal(scope.image).then(function (success) {});
        };
      }
    };
  }]);
