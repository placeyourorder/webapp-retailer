/* 
* @Author: renjithks
* @Date:   2015-10-02 03:20:17
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-02 03:49:54
*/

'use strict';

app.service('orderModalService', ['$modal',
  function($modal) {

    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: 'tmpl/order/order.view.html',
      windowClass: 'order-dialog'
    };

    var modalOrder = {};

    this.showModal = function(customModalDefaults, order) {
      if (!customModalDefaults) customModalDefaults = {};
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, order);
    };

    this.show = function(customModalDefaults, order) {
      //Create temp objects to work with since we're in a singleton service
      var tempModalDefaults = {};
      var tempmodalOrder = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      //Map modal.html $scope custom properties to defaults defined in service
      angular.extend(tempmodalOrder, modalOrder, order);

      if (!tempModalDefaults.controller) {
        tempModalDefaults.controller = function($scope, $modalInstance) {
          $scope.modalOrder = tempmodalOrder;
          $scope.modalOrder.ok = function(result) {
            $modalInstance.close(result);
          };
          $scope.modalOrder.close = function(result) {
            $modalInstance.dismiss('cancel');
          };
        }
      }

      return $modal.open(tempModalDefaults).result;
    };

  }
]);