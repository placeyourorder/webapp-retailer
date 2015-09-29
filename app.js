/* 
 * @Author: renjithks
 * @Date:   2015-09-24 01:55:57
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-29 00:55:13
 */

'use strict';

(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies', 'ngToast'])
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'home.html',
        controllerAs: 'vm'
      })

    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'tmpl/login/login.html',
      controllerAs: 'vm'
    })

    .when('/register', {
      controller: 'RegisterController',
      templateUrl: 'tmpl/register/register.html',
      controllerAs: 'vm'
    })
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

  function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
  }

})();
