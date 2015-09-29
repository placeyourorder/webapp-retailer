/* 
 * @Author: Renjith Sasidharan
 * @Date:   2015-09-27 17:07:21
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-28 01:45:52
 */

(function() {
  'use strict';

  angular
    .module('app')
    .factory('StoreService', StoreService);

  StoreService.$inject = ['$http', '$rootScope', '$cookieStore', 'config'];

  function StoreService($http, $rootScope, $cookieStore, config) {
    var service = {};

    service.Create = Create;
    service.Search = Search;
    service.Get = Get;
    service.SetStore = SetStore;
    service.Update =  Update;

    return service;

    function SetStore(id, callback) {
      $rootScope.globals['storeId'] = id;
      $cookieStore.put('globals', $rootScope.globals);
    }

    function Get(store, callback) {
      $http.get(config().baseUrl + '/stores/' + store.id)
        .then(function(response) {
          callback(response);
        });
    }

    function Create(store, callback) {
      $http.post(config().baseUrl + '/stores', store)
        .then(function(response) {
          callback(response);
        });
    }

    function Update(store, callback) {
      $http.put(config().baseUrl + '/stores/' + store._id, store)
        .then(function(response) {
          callback(response);
        });
    }

    function Search(searchParam, callback) {
      $http.post(config().baseUrl + '/stores/search', searchParam)
        .then(function(response) {
          callback(response);
        });
    }
  };
})();
