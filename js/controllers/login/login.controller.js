(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$window', '$location', 'AuthenticationService', 'FlashService', 'StoreService'];

  function LoginController($window, $location, AuthenticationService, FlashService, StoreService) {
    var vm = this;

    vm.login = login;

    function handleLoginFailure(response) {
      console.log(response);
      if (response.status == 400 && Object.prototype.toString.call(response.data) === '[object Array]') {
        response.data.forEach(function(item, index) {
          FlashService.Error(item.schema + ' ' + item.message);
        });
      } else {
        FlashService.Error('Failed to login');
      }
    }

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.email, vm.password, function(response) {
        if (response.status === 200) {
          if (response.data.type == 'CUSTOMER') {
            AuthenticationService.Logout(function() {
              FlashService.Error('Login failed');
            });
            return;
          }
          AuthenticationService.SetCredentials(response.data);
          AuthenticationService.SetStoreContext(function() {
              var href = $window.location.href;
              var baseUrl = href.slice(0, href.indexOf("/home.html#/login"));
              // TODO: Use base url
              $window.location.href = baseUrl + '/starter.html';
          });
        } else
        //If login failed
        {
          handleLoginFailure(response);
        }
      });
    };
  }

})();
