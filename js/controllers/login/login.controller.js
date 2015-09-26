(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$window', '$location', 'AuthenticationService', 'FlashService'];

  function LoginController($window, $location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.email, vm.password, function(response) {
        if (response.status === 200) {
          AuthenticationService.SetCredentials(vm.email, vm.password);
          var href = $window.location.href;
          var baseUrl = href.slice(0, href.indexOf("/home.html#/login"));
          // TODO: Use base url
          $window.location.href =  baseUrl + '/starter.html';
        }
      });
    };
  }

})();
