/* 
 * @Author: renjithks
 * @Date:   2015-09-13 01:58:28
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-13 18:15:56
 */

app.config(function($routeProvider) {
  $routeProvider
    .when('/items', {
      templateUrl: 'dist/tmpl/items.html',
      controller: 'itemsStubController'
    }).otherwise({
      redirectTo: '/'
    });
});
