/* 
 * @Author: renjithks
 * @Date:   2015-09-27 15:26:56
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-30 00:38:40
 */

'use strict';

app.constant('StoreCreateSchema', {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "_id": {
      "id": "_id",
      "type": "string"
    },
    "title": {
      "id": "title",
      "type": "string",
      "title": "Title",
      "maxLength": 128
    },
    "address": {
      "id": "address",
      "type": "object",
      "title": "Address",
      "properties": {
        "address1": {
          "id": "address1",
          "type": "string",
          "title": "Address 1",
          "maxLength": 128
        },
        "address2": {
          "id": "address2",
          "type": "string",
          "title": "Address 2",
          "maxLength": 64
        },
        "city": {
          "id": "city",
          "type": "string",
          "title": "City",
          "maxLength": 64
        },
        "state": {
          "id": "state",
          "type": "string",
          "title": "Sate",
          "maxLength": 64
        },
        "country": {
          "id": "country",
          "type": "string",
          "title": "Country",
          "maxLength": 64
        },
        "zipcode": {
          "id": "zipcode",
          "type": "string",
          "title": "Pin",
          "maxLength": 32
        },
        "phone": {
          "id": "phone",
          "type": "integer",
          "title": "Phone",
          "maxLength": 10
        },
        "latitude": {
          "id": "latitude",
          "type": "number",
          "title": "Latutude",
          "maxLength": 16
        },
        "longitude": {
          "id": "longitude",
          "type": "number",
          "title": "Longitude",
          "maxLength": 16
        }
      },
      "required": ["address1", "address2", "city", "state", "country", "zipcode", "phone", "latitude", "longitude"]
    }
  },
  "required": [
    "title",
    "address"
  ]
});

app.constant('Storeform', [{
  "type": "section",
  "htmlClass": "row",
  "items": [{
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "title"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "address.phone"
    ]
  }]
}, {
  "type": "help",
  "helpvalue": "<b>Address</b>"
}, {
  "type": "section",
  "htmlClass": "row",
  "items": [{
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "address.latitude"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "address.longitude"
    ]
  }]
}, {
  "type": "section",
  "htmlClass": "row",
  "items": [{
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "address.address1"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-6",
    "items": [
      "address.address2"
    ]
  }]
}, {
  "type": "section",
  "htmlClass": "row",
  "items": [{
    "type": "section",
    "htmlClass": "col-xs-3",
    "items": [
      "address.city"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-3",
    "items": [
      "address.state"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-3",
    "items": [
      "address.country"
    ]
  }, {
    "type": "section",
    "htmlClass": "col-xs-3",
    "items": [
      "address.zipcode"
    ]
  }, {
    type: 'submit',
    style: 'btn-success',
    title: 'Save'
  }]
}]);

app.controller('storeCreateController', ['$rootScope', '$scope', 'StoreCreateSchema', 'Storeform', 'ngToast', 'StoreService', function($rootScope, $scope, StoreCreateSchema, Storeform, ngToast, StoreService) {

  $scope.newStoreEntity = {};
  $scope.newStoreSchema = StoreCreateSchema;
  $scope.newStoreform = Storeform;

  function handleCreateResponse(response) {
    console.log(response);
    if (response.status == 200) {
      $rootScope.globals.storeId = response.data._id;
      ngToast.success({
        content: 'Successfully created store',
        dismissButton: true
      });
      return;
    }
    if (response.status == 400 && Object.prototype.toString.call(response.data) === '[object Array]') {
      response.data.forEach(function(item, index) {
        ngToast.danger({
          content: item.schema + ' ' + item.message,
          dismissButton: true
        });
      });
    } else {
      ngToast.danger({
        content: 'Error creating store',
        dismissButton: true
      });
    }
  }
  $scope.create = function(form) {
    $scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      StoreService.Create($scope.newStoreEntity, handleCreateResponse);
    }
  }
  $scope.clear = function() {
    $scope.itemSearchEntity = {};
  };
}]);

app.controller('storeEditController', ['$rootScope', '$scope', 'StoreCreateSchema', 'Storeform', 'ngToast', 'StoreService', function($rootScope, $scope, StoreCreateSchema, Storeform, ngToast, StoreService) {
  var storeId = $rootScope.globals.storeId;

  StoreService.Get({
    id: storeId
  }, function(response) {
    if (response.status == 200) {
      $scope.currentStoreEntity = response.data;
      $scope.currentStoreSchema = StoreCreateSchema;
      $scope.currentStoreform = Storeform;
    } else {
      ngToast.danger({
        content: 'Error getting store information',
        dismissButton: true
      });
    }
  });


  function handleEditResponse(response) {
    console.log(response);
    if (response.status == 200) {
      ngToast.success({
        content: 'Successfully saved store',
        dismissButton: true
      });
      return;
    }
    if (response.status == 400 && Object.prototype.toString.call(response.data) === '[object Array]') {
      response.data.forEach(function(item, index) {
        ngToast.danger({
          content: item.schema + ' ' + item.message,
          dismissButton: true
        });
      });
    } else {
      ngToast.danger({
        content: 'Error updating store',
        dismissButton: true
      });
    }
  }
  $scope.save = function(form) {
    $scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      StoreService.Update($scope.currentStoreEntity, handleEditResponse);
    }
  }
  $scope.clear = function() {
    $scope.itemSearchEntity = {};
  };
}]);
