/* 
 * @Author: renjithks
 * @Date:   2015-09-27 01:03:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-29 23:20:52
 */

(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginModalCtrl', LoginModalCtrl);

  LoginModalCtrl.$inject = ['$scope', 'AuthenticationService'];

  function LoginModalCtrl($scope, AuthenticationService) {
    this.cancel = $scope.$dismiss;

    this.submit = function(email, password) {
      AuthenticationService.Login(email, password, function(response) {
        AuthenticationService.SetCredentials(response.data);
        AuthenticationService.SetStoreContext(function() {});
        $scope.$close(response);
      })
    };
  }
})();
