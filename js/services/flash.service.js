(function() {
  'use strict';

  angular
    .module('app')
    .factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope', 'ngToast'];

  function FlashService($rootScope, ngToast) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.ShowErrorFlashMessage = ShowErrorFlashMessage;
    service.ShowErrorToastMessage = ShowErrorToastMessage;

    initService();

    return service;

    function initService() {
      $rootScope.$on('$locationChangeStart', function() {
        clearFlashMessage();
      });

      function clearFlashMessage() {
        var flash = $rootScope.flash;
        if (flash) {
          if (!flash.keepAfterLocationChange) {
            delete $rootScope.flash;
          } else {
            // only keep for a single location change
            flash.keepAfterLocationChange = false;
          }
        }
      }
    }

    function Success(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'success',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }

    function Error(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'error',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }

    function ShowErrorFlashMessage(response, defaultMsg, keepAfterLocationChange) {
      if (response.status == 400) {
        var data = [];
        if (Object.prototype.toString.call(response) === '[object Array]') {
          data = response;
        }
        if (Object.prototype.toString.call(response.data) === '[object Array]') {
          data = response.data;
        }
        console.log(data);
        data.forEach(function(item, index) {
          Error(item.schema + ' ' + item.message);
        });
        return;
      }
      Error(defaultMsg);
    }

    function ShowErrorToastMessage(response, defaultMsg) {
      if (response.status == 400) {
        var data = [];
        if (Object.prototype.toString.call(response) === '[object Array]') {
          data = response;
        }
        if (Object.prototype.toString.call(response.data) === '[object Array]') {
          data = response.data;
        }
        console.log(data);
        data.forEach(function(item, index) {
          ngToast.danger({
            content: item.schema + ' ' + item.message,
            dismissButton: true
          });
        });
        return;
      }
      ngToast.danger({
          content: defaultMsg,
          dismissButton: true
        });
    }
  }

})();
