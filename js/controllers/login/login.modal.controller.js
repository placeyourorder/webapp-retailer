/* 
 * @Author: renjithks
 * @Date:   2015-09-27 01:03:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-27 02:16:54
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
        $scope.$close(response);
      })
    };
  }
})();