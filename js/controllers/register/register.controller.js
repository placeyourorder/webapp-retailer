/* 
 * @Author: renjithks
 * @Date:   2015-09-24 01:37:58
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-29 01:41:41
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
      UserService.Create(vm.user, function(response) {
        if (response.status === 200) {
          FlashService.Success('Registration successful', true);
          $location.path('login');
        } else {
          FlashService.ShowErrorFlashMessage(response, 'Registration failed');
          vm.dataLoading = false;
        }
      });
    }
  }
})();
