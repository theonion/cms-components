'use strict';

angular.module('BettyCropper')
  .factory('openImageCropModal', ['$modal', function ($modal) {
    var openImageCropModal = function (imageData, ratios) {
      return $modal.open({
        templateUrl: 'components/betty-cropper/image-crop-modal.html',
        controller: 'ImageCropModalCtrl',
        resolve: {
          imageData: function () { return imageData; },
          ratios: function () { return ratios || false; }
        },
        backdrop: 'static'
      }).result;
    };

    return openImageCropModal;
  }]);
