/* 
 * @Author: renjithks
 * @Date:   2015-09-13 01:49:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-30 01:33:48
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

app.factory('itemsFactory', ['$rootScope', '$http', '$resource', 'config',
  function($rootScope, $http, $resource, config) {
    var service = {};

    service.create = create;
    service.update = update;
    service.remove = remove;

    return service;

    function create(item, success, error) {
      $http.post(config().baseUrl + '/stores/' + $rootScope.globals.storeId + '/items', item)
        .then(success, error);
    }

    function update(item, success, error) {
      $http.put(config().baseUrl + '/stores/' + $rootScope.globals.storeId + '/items', item)
        .then(success, error);
    }

    function remove(item, success, error) {
      $http.delete(config().baseUrl + '/stores/' + $rootScope.globals.storeId + '/items/' + item._id)
        .then(success, error);
    }
  }
]);

app.service('RowEditor', ['$rootScope', '$modal', function($rootScope, $modal) {
  var service = {};
  service.editRow = editRow;

  function editRow(grid, row) {
    $modal.open({
      templateUrl: 'dist/tmpl/editItemModal.html',
      controller: ['$rootScope', '$scope', '$modalInstance', 'ItemSchema', 'grid', 'row', 'itemsFactory', 'ngToast', 'confirmModalService', 'FlashService', RowEditCtrl],
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
