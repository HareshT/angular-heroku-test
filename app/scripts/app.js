'use strict';

/**
 * @ngdoc overview
 * @name imageCleaningApp
 * @description
 * # imageCleaningApp
 *
 * Main module of the application.
 */
angular
  .module('imageCleaningApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'toaster',
    'oc.lazyLoad',
    'datatables',
    'datatables.bootstrap',
    'rzModule',
    'angularLazyImg'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/admin/main.html',
        controller: 'MainCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/admin/main.js'
              ]
            })
          }
        }
      })
      .state('testUser', {
        url: '/testUser',
        templateUrl: 'views/admin/testUser.html',
        controller: 'testUserCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/admin/testUserCtrl.js',
                'models/testUserModel.js'
              ]
            })
          }
        }
      })
      .state('images', {
        url: '/images',
        templateUrl: 'views/admin/images.html',
        controller: 'imagesCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/admin/imagesCtrl.js',
                'models/imagesModel.js'
              ]
            })
          }
        }
      })
  });
