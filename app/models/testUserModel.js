'use strict';
(function () {
  var injectParams = ['$http', 'APIService'];
  var service = function ($http, APIService) {

    var apiBaseUrl = APIService.getApiBaseURL() + 'api/v1/testRoute/';

    function testUserModel() {

    }

    testUserModel.prototype = {

      addUser: function ($postData) {
        return $http.post(apiBaseUrl + 'addUser',$postData);
      }
    };
    return testUserModel;
  };
  service.$inject = injectParams;
  angular.module("imageCleaningApp").factory('testUserModel', service);
}());
