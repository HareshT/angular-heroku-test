'use strict';
(function () {
  var injectParams = ['$http', '$q', 'APIService'];
  var service = function ($http, $q, APIService) {

    var apiBaseUrl = APIService.getApiBaseURL() + '/api/v1/images/';
    function imagesModel() {
    }

    imagesModel.prototype = {

      uploadImage: function (data) {
        var promise = $q.defer();
        var $postData = data;
        $http.post(apiBaseUrl + 'uploadImg', $postData).then(function (result) {
          if (!result.data) {
            return promise.reject('Query went wrong!');
          } else {
            return promise.resolve(result);
          }
        }).catch(promise.reject);
        return promise.promise;
      },
      getAllimages: function (data) {
        var promise = $q.defer();
        var $postData = data;
        $http.post(apiBaseUrl + 'getAllImages',$postData).then(function (response) {
          console.log('response data',response.data)
          if (!response.data) {
            return promise.reject('Query went wrong!');
          } else {
            return promise.resolve(response.data);
          }
        }).catch(promise.reject);
        return promise.promise;
      },
      increaseOnePointsForAllAboveImages: function (data) {
        var promise = $q.defer();
        var $postData = data;
        $http.post(apiBaseUrl + 'increaseOnePointsForAllAboveImages',$postData).then(function (response) {
          if (!response.data) {
            return promise.reject('Query went wrong!');
          } else {
            return promise.resolve(response);
          }
        }).catch(promise.reject);
        return promise.promise;
      },
      verifyOneImage : function(data){
        var promise = $q.defer();
        var $postData = data;
        $http.post(apiBaseUrl + 'verifyOneImage',$postData).then(function (response) {
          if (!response.data) {
            return promise.reject('Query went wrong!');
          } else {
            return promise.resolve(response);
          }
        }).catch(promise.reject);
        return promise.promise;
      },
      getApiUrl : function(){
        var promise = $q.defer();
        $http.post(apiBaseUrl + 'getApiUrl').then(function (response) {
          if (!response.data) {
            return promise.reject('Query went wrong!');
          } else {
            return promise.resolve(response);
          }
        }).catch(promise.reject);
        return promise.promise;
      }
    };
    return imagesModel;
  };
  service.$inject = injectParams;
  angular.module("imageCleaningApp").factory('imagesModel', service);
}());
