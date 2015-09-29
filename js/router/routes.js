/* 
 * @Author: renjithks
 * @Date:   2015-09-13 01:58:28
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-28 00:55:44
 */

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('createstore', {
      url: "/createstore",
      templateUrl: "tmpl/store/store.create.html",
      controller: 'storeCreateController',
      data: {
        requireLogin: true
      }
    })
    .state('editstore', {
      url: "/editstore",
      templateUrl: "tmpl/store/store.edit.html",
      controller: 'storeEditController',
      data: {
        requireLogin: true
      }
    })
    .state('items', {
      url: "/items",
      templateUrl: "tmpl/items.html",
      controller: 'itemsStubController',
      data: {
        requireLogin: true
      }
    });
});
