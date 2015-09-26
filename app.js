/* 
 * @Author: renjithks
 * @Date:   2015-09-24 01:55:57
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-25 01:18:03
 */

'use strict';

(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies'])
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
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }

})();
