/* 
 * @Author: renjithks
 * @Date:   2015-09-13 01:58:28
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-27 01:50:22
 */

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('items', {
      url: "/items",
      templateUrl: "tmpl/items.html",
      controller: 'itemsStubController',
      data: {
        requireLogin: true
      }
    })
    .state('store', {
      url: "/list",
      templateUrl: "tmpl",
      controller: 'itemsStubController',
      data: {
        requireLogin: true
      }
    });
});
