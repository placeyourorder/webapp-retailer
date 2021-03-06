﻿(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserService', UserService);

  UserService.$inject = ['$http', 'config'];

  function UserService($http, config) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http.get(config.baseUrl + '/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetById(id) {
      return $http.get(config.baseUrl + '/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function GetByUsername(username) {
      return $http.get(config.baseUrl + '/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user, callback) {
      console.log(config());
      return $http.post(config().baseUrl + '/users/register', user).then(function(response) {
        callback(response);
      }).catch(function(response) {
        callback(response);
      });
    }

    function Update(user) {
      return $http.put(config.baseUrl + '/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
      return $http.delete(config.baseUrl + '/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions

    function handleSuccess(data) {
      return data;
    }

    function handleError(error) {
      return error
    }
  }

})();
