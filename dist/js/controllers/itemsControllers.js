/*
 * @Author: renjithks
 * @Date:   2015-09-13 01:51:39
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-22 02:06:36
 */
var storeId = '55fd6801a89cbdea702a1024';
var searchModalInstance;

app.constant('ItemSchema', {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "name": {
      "id": "/name",
      "type": "string",
      "title": "Name"
    },
    "description": {
      "id": "/description",
      "type": "string",
      "title": "Description"
    },
    "tags": {
      "id": "/tags",
      "type": "array",
      'minItems': 1,
      "uniqueItems": true,
      "items": {
        "id": "/tags/0",
        "type": "string",
        "title": "Tag",
        "minLength": 2
      }
    },
    "variations": {
      "id": "/variations",
      "type": "array",
      'minItems': 1,
      "items": {
        "id": "/variations/0",
        "type": "object",
        "title": "Variation",
        "properties": {
          "quantity": {
            "id": "/variations/0/quantity",
            "type": "integer",
            "title": "Quantity",
            "minimum": 0,
            "maximum": 9999
          },
          "uom": {
            "id": "/variations/0/uom",
            "type": "string",
            "title": "UOM"
          },
          "price": {
            "id": "/variations/0/price",
            "type": "number",
            "title": "Price",
            "minimum": 0,
            "maximum": 9999
          }
        },
        "required": ["quantity", "uom", "price"]
      }
    }
  },
  "required": [
    "name",
    "tags",
    "description",
    "variations"
  ]
});

app.constant('ItemSearchSchema', {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "name": {
      "id": "name",
      "title": "Name",
      "type": "string"
    },
    "description": {
      "id": "description",
      "title": "Description",
      "type": "string"
    },
    "tags": {
      "id": "tags",
      "title": "Tags",
      "type": "string"
    }
  }
})


RowEditCtrl.$inject = ['$scope', '$modalInstance', 'ItemSchema', 'grid', 'row', 'itemsFactory', 'itemDeleteFactory', 'ngToast', 'confirmModalService'];

function RowEditCtrl($scope, $modalInstance, ItemSchema, grid, row, itemsFactory, itemDeleteFactory, ngToast, confirmModalService) {

  $scope.itemschema = ItemSchema;
  $scope.itemeditentity = angular.copy(row.entity);
  $scope.itemeditform = [
    "name",
    "description", {
      "type": "help",
      "helpvalue": "<div class=\"alert alert-info\"><b>Item Variations</b></div>"
    }, {
      "key": "variations",
      "type": "tabarray",
      "add": "Add Variation",
      "remove": "Remove Variation",
      "style": {
        "remove": "btn-danger"
      },
      "title": "{{ value.quantity || 'Tab '+$index }}",
    }, {
      "type": "help",
      "helpvalue": "<div class=\"alert alert-info\" style=\"padding-top:10px;\"><b>Item Tags</b></div>"
    }, {
      "key": "tags",
      "type": "tabarray",
      "add": "Add Tag",
      "remove": "Remove Tag",
      "style": {
        "remove": "btn-danger"
      },
      "title": "{{ value || 'Tab '+$index }}",
    }
  ];

  $scope.save = save;
  $scope.deleteItem = deleteItem;

  function saveSuccess() {
    row.entity = angular.extend(row.entity, $scope.itemeditentity);
    $modalInstance.close(row.entity);
    var msg = 'Item ' + $scope.itemeditentity.name + ' updated';
    var myToastMsg = ngToast.success({
      content: msg,
      dismissButton: true
    });
  }

  function saveError(error) {
    console.log(error);
    var msg = 'Error updating Item ' + $scope.itemeditentity.name;
    console.log(error.data);

    if (Object.prototype.toString.call(error.data) === '[object Array]') {
      error.data.forEach(function(item, index) {
        msg = item.schema + ' ' + item.message;
        var myToastMsg = ngToast.danger({
          content: msg,
          dismissButton: true
        });
      });
    } else {
      msg = error.data || msg;
      var myToastMsg = ngToast.danger({
        content: msg,
        dismissButton: true
      });
    }
  }

  function deleteSuccess() {
    row.entity = angular.extend(row.entity, $scope.itemeditentity);
    var index = grid.appScope.gridOptions.data.indexOf(row.entity);
    grid.appScope.gridOptions.data.splice(index, 1);
    $modalInstance.close(row.entity);
    var msg = 'Item ' + $scope.itemeditentity.name + ' deleted';
    var myToastMsg = ngToast.success({
      content: msg,
      dismissButton: true
    });
  }

  function save() {
    // Copy row values over
    itemsFactory.update({
      storeId: storeId
    }, $scope.itemeditentity, saveSuccess, saveError);
  }

  function deleteItem() {
    // Copy row values over
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete Item',
      headerText: 'Delete ' + $scope.itemeditentity.name + '?',
      bodyText: 'Are you sure you want to delete this item?'
    };

    confirmModalService.showModal({}, modalOptions).then(function(result) {
      itemDeleteFactory.delete({
        storeId: storeId,
        itemId: $scope.itemeditentity._id
      }, $scope.itemeditentity, deleteSuccess, saveError);
    });
  }
};

app.controller("itemsStubController", ['$scope', 'itemsStubFactory', 'RowEditor', function($scope, itemsStubFactory, RowEditor, $location) {

  $scope.editRow = RowEditor.editRow;
  var paginationOptions = {
    pageNumber: 1,
    pageSize: 50,
    sort: null
  };

  $scope.gridOptions = {
    expandableRowTemplate: 'dist/tmpl/expandableRowTemplate.html',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
      subGridVariable: 'subGridScopeVariable'
    },
    enablePaginationControls: true,
    enableFiltering: true,
    paginationPageSizes: [50, 100, 200],
    paginationPageSize: paginationOptions.pageSize,
    useExternalPagination: true,
    minRowsToShow: 15,
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
      $scope.$on('onItemSearch', function(event, args) {
        $scope.searchParams = args;
        getPage();
      });
    }
  };

  $scope.gridOptions.columnDefs = [{
    field: '_id',
    name: '',
    cellTemplate: 'dist/tmpl/editButton.html',
    width: 34,
    enableColumnMenu: false,
    enableFiltering: false
  }, {
    name: 'name',
    field: 'name'
  }, {
    name: 'description',
    field: 'description'
  }, {
    name: 'tags',
    field: 'tags'
  }];

  var successPostCallback = function(res) {
    $scope.gridOptions.totalItems = res.itemCount;
    var data = res.data;
    for (i = 0; i < data.length; i++) {
      data[i].subGridOptions = {
        columnDefs: [{
          name: "quantity",
          field: "quantity"
        }, {
          name: "uom",
          field: "uom"
        }, {
          name: "price",
          field: "price"
        }],
        data: data[i].variations
      }
    }
    $scope.gridOptions.data = data;
  };

  var errorCallback = function(e) {
    console.log(e.data.Message);
  };

  var getPage = function() {
    itemsStubFactory.search({
      storeId: storeId,
      page: paginationOptions.pageNumber,
      limit: paginationOptions.pageSize
    }, $scope.searchParams, successPostCallback, errorCallback);
  };

  getPage();

  $scope.search = function() {
    //$scope.itemSearchEntity;
    console.log($scope);
    paginationOptions.pageNumber = 1;
    getPage();
  }

  $scope.expandAllRows = function() {
    $scope.gridApi.expandable.expandAllRows();
  }

  $scope.collapseAllRows = function() {
    $scope.gridApi.expandable.collapseAllRows();
  }

  $scope.back = function() {
    window.history.back();
  };
}]);

app.controller("itemActionsController", ['$scope', '$modal', 'itemsFactory', 'ItemSchema', 'ItemSearchSchema', '$location', function($scope, $modal, itemsFactory, ItemSchema, ItemSearchSchema, $location) {

  $scope.animationsEnabled = true;
  console.log($location);
  $scope.addItem = function(size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'dist/tmpl/addItemModal.html',
      controller: 'addItemModalInstanceCtrl',
      size: size
    });
  }


  $scope.searchItem = function(size) {
    searchModalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'dist/tmpl/searchItemModal.html',
      controller: 'itemsSearchModalController',
      size: size
    });
  }
}]);

app.controller('itemsSearchModalController', ['$rootScope', '$scope', '$modalInstance', 'ItemSearchSchema', 'ngToast', function($rootScope, $scope, $modalInstance, ItemSearchSchema, ngToast) {
  $scope.itemSearchEntity = $rootScope.searchParams || {};
  $scope.itemSearchSchema = ItemSearchSchema;
  $scope.itemSearchForm = [
    "name",
    "description",
    "tags"
  ];

  $scope.search =  function() {
    $rootScope.$broadcast('onItemSearch', $scope.itemSearchEntity);
    $rootScope.searchParams = $scope.itemSearchEntity;
    $modalInstance.close();
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.clear = function() {
    $scope.itemSearchEntity = {};
  };
}]);

app.controller('addItemModalInstanceCtrl', ['$scope', '$modalInstance', 'ItemSchema', 'itemsFactory', 'ngToast', function($scope, $modalInstance, ItemSchema, itemsFactory, ngToast) {

  $scope.schema = ItemSchema;
  $scope.entity = {};
  $scope.form = [
    "name",
    "description", {
      "type": "help",
      "helpvalue": "<div class=\"alert alert-info\"><b>Item Variations</b></div>"
    }, {
      "key": "variations",
      "type": "tabarray",
      "add": "Add Variation",
      "remove": "Remove Variation",
      "style": {
        "remove": "btn-danger"
      },
      "title": "{{ value.quantity || 'Tab '+$index }}",
    }, {
      "type": "help",
      "helpvalue": "<div class=\"alert alert-info\" style=\"padding-top:10px;\"><b>Item Tags</b></div>"
    }, {
      "key": "tags",
      "type": "tabarray",
      "add": "Add Tag",
      "remove": "Remove Tag",
      "style": {
        "remove": "btn-danger"
      },
      "title": "{{ value || 'Tab '+$index }}",
    }
  ];


  $scope.save = save;

  function saveSuccess() {
    $modalInstance.close();
    var msg = 'Item ' + $scope.entity.name + ' updated';
    var myToastMsg = ngToast.success({
      content: msg,
      dismissButton: true
    });
  }

  function saveError(error) {
    console.log(error);
    var msg = 'Error updating Item ' + $scope.entity.name;
    console.log(error.data);

    if (Object.prototype.toString.call(error.data) === '[object Array]') {
      error.data.forEach(function(item, index) {
        msg = item.schema + ' ' + item.message;
        var myToastMsg = ngToast.danger({
          content: msg,
          dismissButton: true
        });
      });
    } else {
      msg = error.data || msg;
      var myToastMsg = ngToast.danger({
        content: msg,
        dismissButton: true
      });
    }
  }

  function save() {
    $scope.$broadcast('schemaFormValidate');
    if ($scope.form) {
      $scope.entity.store_id = storeId;
      itemsFactory.save({
        storeId: storeId
      }, $scope.entity, saveSuccess, saveError);
    }
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
