'use strict';

angular.module('cmsComponents.notifications.service', [
  'lodash'
])
  .service('NotificationsService', [
    '_',
    function (_) {

      var data = {
        errors: [],
        warnings: [],
        infos: []
      };

      var lastId = 0;
      var put = function (type, message, removalCondition) {
        var typeList = data[type];

        var nextId = lastId++;;
        typeList.push({
          id: nextId,
          message: message,
          doRemove: removalCondition
        });

        return nextId;
      };

      var clear = function (type) {
        data[type] = [];
      };

      var remove = function (type, id) {
        data[type] = data[type].filter(function (notification) {
          return notification.id !== id;
        });
      };

      var list = function (type) {
        // clean up anything we should remove
        data[type] = data[type].filter(function (notification) {
          return !notification.doRemove();
        });

        return data[type];
      };

      return {
        // errors
        addError: put.bind(null, 'errors'),
        removeError: remove.bind(null, 'errors'),
        listErrors: list.bind(null, 'errors'),
        clearErrors: clear.bind(null, 'errors'),
        // warnings
        addWarning: put.bind(null, 'warnings'),
        removeWarning: remove.bind(null, 'warnings'),
        listWarnings: list.bind(null, 'warnings'),
        clearWarnings: clear.bind(null, 'warnings'),
        // infos
        addInfo: put.bind(null, 'infos'),
        removeInfo: remove.bind(null, 'infos'),
        listInfos: list.bind(null, 'infos'),
        clearInfos: clear.bind(null, 'infos')
      };
    }
  ]);
