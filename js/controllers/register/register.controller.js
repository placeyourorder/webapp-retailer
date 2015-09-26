/* 
 * @Author: renjithks
 * @Date:   2015-09-24 01:37:58
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-26 19:05:04
 */

(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

  function RegisterController(UserService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      console.log(vm);
      if (vm.user.password != vm.user.repPassword) {
        vm.dataLoading = false;
        FlashService.Error('Passwords don\'t match');
        return;
      }
      vm.user.type = 'RETAILER';
      UserService.Create(vm.user)
        .then(function(response) {
          if (response.status === 200) {
            FlashService.Success('Registration successful', true);
            $location.path('home.html#/login');
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        });
    }
  }

})();
