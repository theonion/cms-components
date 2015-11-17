'use strict';

angular.module('cmsComponents')
  .service('BettyService', ['$http', 'Config', 'BettyCropper', function ($http, Config, BettyCropper) {
    var service = {};

    service.updateBettyConfig = function () {
      return $http.get(Config.apiUrl + 'photo-service-details/')
        .success(service.bettyConfigRetrieved);
    };

    service.bettyConfigRetrieved = function (response) {
      BettyCropper.config.publicToken = response.public_token;
      BettyCropper.config.imageServerUrl = response.image_url;
    };

    return service;
  }]);
