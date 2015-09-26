/* 
* @Author: renjithks
* @Date:   2015-09-27 00:55:54
* @Last Modified by:   renjithks
* @Last Modified time: 2015-09-27 02:12:26
*/

'use strict';

app.service('loginModal', function ($modal, $rootScope) {

  function assignCurrentUser (user) {
    console.log(user);
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'tmpl/login/modal.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };

});