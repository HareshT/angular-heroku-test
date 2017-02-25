'use strict';

/**
 * @ngdoc function
 * @name imageCleaningApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the imageCleaningApp
 */
angular.module('imageCleaningApp')
    .controller('testUserCtrl', ["$scope", "testUserModel", "ToasterService", function ($scope, testUserModel, ToasterService) {
        var testUserModel = new testUserModel();
        var $postData = {
            name: 'testUser1',
            surName: 'testSurname1'
        }
        testUserModel.addUser($postData).then(function (response) {
            if (response.data) {
                $scope.userData = response;
                ToasterService.toastSuccess('user added');
            }
        }, function (error) {
            ToasterService.toastError(error.data.error.message);
        });
    }
    ]);
