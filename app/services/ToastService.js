'use strict';
(function () {
  var injectParams = ['toaster'];
  var service = function (toaster) {
    var factory = this;

    factory.toastWarnig = function(message, forever, position, timeout){
      toaster.pop('Warning', "Warning", message);
    };
    factory.toastError = function(message, forever, position, timeout){
      toaster.pop('error', "Error", message);
    };
    factory.toastSuccess = function(message, forever, position, timeout){
      toaster.pop('success', "Success", message);
    };
    return factory;
  };
  service.$inject = injectParams;
  angular.module("imageCleaningApp").factory('ToasterService', service);
}());
