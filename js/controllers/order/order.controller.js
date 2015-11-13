/* 
 * @Author: renjithks
 * @Date:   2015-10-01 00:53:39
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-02 03:42:58
 */

(function() {
  "use strict";

  angular.module("app").controller("orderController", orderController);
  orderController.$inject = ["$scope", "NgTableParams", "OrderService", "orderModalService"];

  function orderController($scope, NgTableParams, OrderService, orderModalService) {
    $scope.dateFormat = 'yyyy-MM-dd HH:mm';

    this.tableParams = new NgTableParams({}, {
      getData: function(params) {
        return OrderService.Search({
          params: {
            page: params.page(),
            limit: params.count()
          },
          data: {
            sorting: params.sorting(),
            filter: params.filter()
          }
        }).then(function(response) {
          return response.data.data;
        });
      }
    });

    this.view = function(row, rowForm) {
      console.log(row, rowForm);
      orderModalService.showModal({}, row).then(function(result) {});
    }
  }
})();
