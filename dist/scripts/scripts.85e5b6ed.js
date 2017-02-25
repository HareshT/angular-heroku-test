"use strict";angular.module("imageCleaningApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","toaster","oc.lazyLoad","datatables","datatables.bootstrap","rzModule","angularLazyImg"]).config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider",function(a,b,c){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"views/admin/main.html",controller:"MainCtrl"}).state("testUser",{url:"/testUser",templateUrl:"views/admin/testUser.html",controller:"testUserCtrl"}).state("images",{url:"/images",templateUrl:"views/admin/images.html",controller:"imagesCtrl"})}]),function(){var a=[],b=function(){var a=this,b="production";return"production"===b?(a.protocal="https://",a.environment={ipAddress:"image-cleaning-api.herokuapp.com",port:""}):(a.protocal="http://",a.environment={ipAddress:"localhost",port:":3004"}),a.domain={apiBaseUrl:a.protocal+a.environment.ipAddress+a.environment.port},a.getApiBaseURL=function(){return a.domain.apiBaseUrl},a};b.$inject=a,angular.module("imageCleaningApp").factory("APIService",b)}(),function(){var a=["toaster"],b=function(a){var b=this;return b.toastWarnig=function(b,c,d,e){a.pop("Warning","Warning",b)},b.toastError=function(b,c,d,e){a.pop("error","Error",b)},b.toastSuccess=function(b,c,d,e){a.pop("success","Success",b)},b};b.$inject=a,angular.module("imageCleaningApp").factory("ToasterService",b)}(),function(){var a=["$http","APIService"],b=function(a,b){function c(){}var d=b.getApiBaseURL()+"api/v1/testRoute/";return c.prototype={addUser:function(b){return a.post(d+"addUser",b)}},c};b.$inject=a,angular.module("imageCleaningApp").factory("testUserModel",b)}(),function(){var a=["$http","$q","APIService"],b=function(a,b,c){function d(){}var e=c.getApiBaseURL()+"/api/v1/images/";return d.prototype={uploadImage:function(c){var d=b.defer(),f=c;return a.post(e+"uploadImg",f).then(function(a){return a.data?d.resolve(a):d.reject("Query went wrong!")}).catch(d.reject),d.promise},getAllimages:function(c){var d=b.defer(),f=c;return a.post(e+"getAllImages",f).then(function(a){return console.log("response data",a.data),a.data?d.resolve(a.data):d.reject("Query went wrong!")}).catch(d.reject),d.promise},increaseOnePointsForAllAboveImages:function(c){var d=b.defer(),f=c;return a.post(e+"increaseOnePointsForAllAboveImages",f).then(function(a){return a.data?d.resolve(a):d.reject("Query went wrong!")}).catch(d.reject),d.promise},verifyOneImage:function(c){var d=b.defer(),f=c;return a.post(e+"verifyOneImage",f).then(function(a){return a.data?d.resolve(a):d.reject("Query went wrong!")}).catch(d.reject),d.promise},getApiUrl:function(){var c=b.defer();return a.post(e+"getApiUrl").then(function(a){return a.data?c.resolve(a):c.reject("Query went wrong!")}).catch(c.reject),c.promise}},d};b.$inject=a,angular.module("imageCleaningApp").factory("imagesModel",b)}(),angular.module("imageCleaningApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("imageCleaningApp").controller("imagesCtrl",["$scope","$compile","$sce","DTOptionsBuilder","DTColumnBuilder","ToasterService","imagesModel",function(a,b,c,d,e,f,g){function h(a){var b="";return b="<span>"+a.imgPath+a.imgName+"</span>"}function i(a){var b="";return b='<span style="max-width:20px;">'+a.imgPoint+"</span>"}function j(b){var d="",e=c.trustAsResourceUrl(a.apiUrl+""+b.imgPath+b.imgName);return d='<img height="50px" width="50px" lazy-img="'+e+'">'}function k(a){var b="";return b='<i class="glyphicon glyphicon-trash" style="cursor: pointer;" ng-click="deleteImage(\''+a._id+"')\"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",b+='<i class="btn btn-default" ng-click="verifyImage(\''+a._id+"')\">Verify</i>"}a.images=this,a.allImagaesId=[],a.AllImageDetails=[];var g=new g,l={};g.getApiUrl(l).then(function(b){a.apiUrl=b.data}),a.rangeSlider={minValue:0,maxValue:100,options:{floor:0,ceil:100,step:1}},a.$watchCollection("rangeSlider",function(b,c){l.filter={minPoint:b.minValue,maxPoint:b.maxValue},a.images.reloadData()}),a.images.dttOptions=d.newOptions().withOption("ajax",function(b,c){l.limit=b.length,l.offset=b.start,l.order=b.order[0],g.getAllimages(l).then(function(b){_.each(b.data,function(b){_.indexOf(a.allImagaesId,b._id)===-1&&(a.allImagaesId.push(b._id),a.AllImageDetails[b._id]=b)}),c(b)})}).withDataProp("data").withOption("processing",!0).withOption("serverSide",!0).withOption("bLengthChange",!0).withPaginationType("full_numbers").withDisplayLength(10).withOption("bFilter",!1).withBootstrap().withOption("createdRow",function(c){b(angular.element(c).contents())(a)}),a.images.dtColumns=[e.newColumn(null).withTitle("Image").withClass("col-sm-2").renderWith(j),e.newColumn(null).withTitle("Path").notSortable().withClass("col-sm-2").renderWith(h),e.newColumn(null).withTitle("Point").withClass("col-sm-2").renderWith(i),e.newColumn(null).withTitle("Action").notSortable().withClass("col-sm-2").renderWith(k)],a.images.dtInstance={},a.images.reloadData=function(){a.images.dtInstance.reloadData()},a.deleteImage=function(b){var c=_.indexOf(a.allImagaesId,b),d=_.take(a.allImagaesId,c);l={incresePointImgsArray:d,arcivedImgId:b,destinationPath:"AllArchivedImages",archivedImgDetail:a.AllImageDetails[b]},g.increaseOnePointsForAllAboveImages(l).then(function(b){b.data&&(a.allImagaesId=[],a.AllImageDetails=[],f.toastSuccess("image successfully moved to archived"),a.images.reloadData())})},a.verifyImage=function(b){l={verifyImageId:b},g.verifyOneImage(l).then(function(b){b.data&&(f.toastSuccess("1 point added in image"),a.images.reloadData())})}}]),angular.module("imageCleaningApp").controller("testUserCtrl",["$scope","testUserModel","ToasterService",function(a,b,c){var b=new b,d={name:"testUser1",surName:"testSurname1"};b.addUser(d).then(function(b){b.data&&(a.userData=b,c.toastSuccess("user added"))},function(a){c.toastError(a.data.error.message)})}]),angular.module("angularHerokuTestApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/admin/images.html",'<div> <div> <div class="col-md-offset-4 col-md-4 text-center"><label for="rangePicker">Filter by Point</label> <rzslider id="rangePicker" rz-slider-model="rangeSlider.minValue" rz-slider-high="rangeSlider.maxValue" rz-slider-options="rangeSlider.options"></rzslider> </div> <div class="col-md-offset-2 col-md-8 col-sm-12 col-xs-12"> <table id="imagesTable" datatable="" dt-options="images.dttOptions" dt-columns="images.dtColumns" dt-instance="images.dtInstance" class="table table-striped table-bordered table-hover" align="center"> </table> </div> </div> </div>'),a.put("views/admin/main.html",'<div class="jumbotron"> <h1>ImageCleaningApp Home page</h1> </div>'),a.put("views/admin/testUser.html",'<div class="jumbotron"> <h1>this testUser Page</h1> <h4>user Data :{{userData}} </h4> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);