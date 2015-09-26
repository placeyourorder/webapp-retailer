/* 
 * @Author: renjithks
 * @Date:   2015-09-13 01:49:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-20 21:39:44
 */

app.factory('itemsStubFactory', ['$resource', function($resource) {
  return $resource('http://localhost:1337/stores/:storeId/items/search', {}, {
    'search': {
      method: 'POST',
      params: {
        storeId: '@storeId',
        page: "@page",
        limit: "@limit"
      }
    }
  });
}]);

app.factory('itemsFactory', ['$resource', function($resource) {
  return $resource('http://localhost:1337/stores/:storeId/items', {}, {
    'update': {
      method: 'PUT'
    }
  });
}]);

app.factory('itemDeleteFactory', ['$resource', function($resource) {
  return $resource('http://localhost:1337/stores/:storeId/items/:itemId', {}, {});
}]);

app.service('RowEditor', ['$rootScope', '$modal', function($rootScope, $modal) {
  var service = {};
  service.editRow = editRow;

  function editRow(grid, row) {
    $modal.open({
      templateUrl: 'dist/tmpl/editItemModal.html',
      controller: ['$rootScope', '$modalInstance', 'ItemSchema', 'grid', 'row', 'itemsFactory', 'itemDeleteFactory', 'ngToast', 'confirmModalService', RowEditCtrl],
      //controllerAs: 'itemsStubController',
      resolve: {
        grid: function() {
          return grid;
        },
        row: function() {
          return row;
        }
      }
    });
  }
  return service;
}]);
