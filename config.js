/* 
 * @Author: renjithks
 * @Date:   2015-09-26 17:36:39
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-26 18:12:31
 */

'use strict';

(function() {
  'use strict';

  angular
    .module('app')
    .constant('config', config);

  //config.$inject = ['$http'];

  function config() {
    return  {
      "baseUrl": "http://localhost:1337"
    };
  }
})();
