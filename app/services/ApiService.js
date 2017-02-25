'use strict';
(function () {
  var injectParams = [];
  var service = function () {
    var factory = this;

    var env = 'production';
    //var env = 'beta';
    //var env = 'localhost';
    if (env === 'production') {
      factory.protocal = 'https://';
      factory.environment = {
        ipAddress: 'image-cleaning-api.herokuapp.com',
        port: '' // Live server
      };
    } else {
      factory.protocal = 'http://';
      factory.environment = {
        ipAddress: 'localhost',
        port: ':3004' // Port written for Development server.
      };
    }

    factory.domain = {
      apiBaseUrl: factory.protocal + factory.environment.ipAddress + factory.environment.port
    };

    factory.getApiBaseURL = function () {
      return factory.domain.apiBaseUrl;
    };

    return factory;
  };
  service.$inject = injectParams;
  angular.module("imageCleaningApp").factory('APIService', service);
}());
