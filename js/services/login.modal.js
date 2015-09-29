/* 
 * @Author: renjithks
 * @Date:   2015-09-27 00:55:54
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-29 23:24:25
 */

'use strict';

app.service('loginModal', ['$modal', '$rootScope', 'AuthenticationService', 'StoreService', function($modal, $rootScope, AuthenticationService, StoreService) {

  function assignCurrentUser(response) {
    console.log(response);
    AuthenticationService.SetCredentials(response.data);
    AuthenticationService.ClearStoreContext();
    return response;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'tmpl/login/modal.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };

}]);
