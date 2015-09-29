/* 
 * @Author: Renjith Sasidharan
 * @Date:   2015-09-28 01:55:45
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-29 23:24:49
 */

'use strict';

(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$window', 'ngToast', 'AuthenticationService'];

  function MainCtrl($scope, $window, ngToast, AuthenticationService) {

    $scope.Logout = function(email, password) {
      AuthenticationService.Logout(function(response) {
        if (response.status == 200) {
          AuthenticationService.ClearCredentials();
          AuthenticationService.ClearStoreContext();
          var href = $window.location.href;
          var baseUrl = href.slice(0, href.indexOf("/starter.html"));
          // TODO: Use base url
          $window.location.href = baseUrl + '/home.html#/login';
        } else {
          ngToast.danger({
            content: 'Failed to Logout',
            dismissButton: true
          });
        }
      })
    };
  }
})();
