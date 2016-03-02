'use strict';

angular.module('cmsComponents')
  .directive('bettyEditable', ['$http', 'BettyCropper', 'openImageCropModal', function ($http, BettyCropper, openImageCropModal) {
    return {
      templateUrl: 'components/betty-cropper/betty-editable.html',
      restrict: 'E',
      require: ['?^^form'],

      scope: {
        image: '=',
        placeholderText: '@',
        ratio: '@',                           // ratio string, AxB, where A is width, B is height
        editable: '=?',
        imageChangeCallback: '=',
        isDisabled: '=',
        inputName: '@?bettyEditableInputName'  // name of input
      },

      controller: ['$scope', function ($scope) {
        $scope.editable = angular.isDefined($scope.editable) ? $scope.editable : true;

        var parsedRatio = $scope.ratio
          .split('x')
          .map(function (num) {
            return parseInt(num, 10) || 1;
          });
        $scope.parsedRatio = {
          width: parsedRatio[0],
          height: parsedRatio[1]
        };

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
              $scope.setStyles();
              $scope.markDirty();
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

      link: function (scope, element, attrs, ctrls) {

        var parentForm = ctrls[0];

        if (!scope.bettyImage) {
          scope.bettyImage = null;
        }

        scope.markDirty = function () {
          if (parentForm && scope.inputName && parentForm[scope.inputName]) {
            parentForm[scope.inputName].$setDirty();
          }
        };

        scope.setStyles = function () {
          if (scope.bettyImage) {
            scope.imageStyling = scope.bettyImage.getStyles(element.parent().width(), element.parent().height(), scope.ratio);
          } else {
            scope.imageStyling = {
              'position': 'relative',
              'width': element.parent().width(),
              'height': Math.floor(element.parent().width() * scope.parsedRatio.height / scope.parsedRatio.width) + 'px',
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
          scope.image = null;
          scope.bettyImage = null;
          scope.callImageChangeCallback();
          scope.setStyles();
          scope.markDirty();
        };

        scope.editImage = function () {
          openImageCropModal(scope.image).then(function (success) {});
        };

        scope.setStyles();
      }
    };
  }]);
