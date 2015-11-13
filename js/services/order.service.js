/* 
 * @Author: renjithks
 * @Date:   2015-10-01 01:08:00
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-02 02:15:01
 */

(function() {
  "use strict";

  angular
    .module('app')
    .factory('OrderService', OrderService);

  OrderService.$inject = ['$rootScope', '$http', 'config'];

  function OrderService($rootScope, $http, config) {
    var service = {}

    service.Search = Search;

    return service;

    function Search(query) {
      query.method = 'POST';
      query.url = config().baseUrl + '/orders/search';
      return $http(query);
    }
  }
})();
