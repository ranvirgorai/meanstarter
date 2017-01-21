var app=angular.module("ngAngExp",["ui.router","ngAnimate",'ui.bootstrap','angulike','checklist-model']);
/*
.run
.config
.factory
.controller
.value
.const
.provider
.service
*/

console.log('this is form app js 1');

app.config(function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider,$locationProvider){

console.log('this is form app js 2');
	$urlMatcherFactoryProvider.caseInsensitive(true);
	console.log('this is form app js 3');
	$stateProvider
		.state("app",{
			url:"/",
			templateUrl :"template/index.html",
			controller: ""
				})
		.state("app.home",{
			url:"home",
			templateUrl :"template/home.html",
			controller: "homeCtrl"
				})
		.state("app.cources",{
			url:"cources",
			templateUrl :"template/cources.html",
			controller: "courcesCtrl"
				})

		.state("app.filter",{
			url:"filter",
			templateUrl :"template/customFilter.html",
			controller: "filterCtrl"
				})

.state("app.directive",{
			url:"directive",
			templateUrl :"template/custom-directive.html",
			controller: "cusDirCtrl"
				})
			.state("app.students",{
			resolve:{
					"check":function($location,$rootScope){
						if(!$rootScope.logIn){
							$location.path('/');
						}
					}
				},
			url:"students",
			templateUrl :"template/students.html",
			controller: "studentsCtrl"
				})
			.state("app.login",{
			url:"login",
			templateUrl :"template/login.html",
			controller: "loginCtrl"
				})
			.state("app.httptest",{
			url:"http",
			templateUrl :"template/httptest.html",
			controller: "httpCtrl"
				})
				.state("app.todo",{
			url:"todo",
			templateUrl :"template/todo.html",
			controller: "todoCtrl"
				})
 	$urlRouterProvider.otherwise("/")
})


			.controller('homeCtrl',function ($scope) {
			$scope.message="Home Page";
			})

			.controller('courcesCtrl',function ($scope) {


			$scope.cources=['VB','JAVA','ANGULAR','NODE','Python','Ruby','Java Script'];
			$scope.stud={
				cource:['vb']
			}
		})

			.controller('studentsCtrl',function ($scope ) {

			$scope.students=['Ravi','Rohit','Rahul','Soniya','Deepika'];
			})

			.controller("countryCtrl",function(){
				this.name="India";
			})

			.controller("stateCtrl",function(){
				this.name="Maharastra";
			})

			.controller("loginCtrl",function($scope,$location,$rootScope){
				$scope.submit=function(){
					var uName=$scope.username;
					var pass=$scope.password;
					if(uName=='admin' && pass=='admin'){
					// window.location.hash='#/dashboard';
						$rootScope.logIn=true;
						$location.path('students');
					}else{
						alert('Username/Password Wrong')
					}
				}
			})


			.controller("cityCtrl",function(){
				this.name="Mumbai";
			})

			app.service('fromService',function(){
				this.message="This Is From Service"
			})

			app.factory('fromFactory',function(){
				var factory={};
				factory.message="this IS from factory";
				return factory;
			})

			app.provider('fromProvider',function(){
				var m1="This is From Provider";
				return{
					setName:function(name){
						m1+=" "+name;
					},

					$get: function(){
						return {
							message : m1
						}
					}
				}
			});


		app.controller("httpCtrl",function($scope,$http,fromService,fromFactory,fromProvider){
					$http.get('template/database.json')
					.success(function(responce){
							$scope.persons=responce.records;
					})

					$scope.msg=[fromFactory.message,fromProvider.message,fromService];
						$scope.show='msg1';
						$scope.toogle=function(){
								$scope.show=$scope.show=='msg1'? 'msg2' : 'msg1';
						};



			})

		app.controller("todoCtrl",function($scope){
			$scope.task=[];

			var taskData=localStorage['taskList'];
			if(taskData!==undefined){
				$scope.task=JSON.parse(taskData);
			}


				$scope.serachEnter=function(){
					if(event.which==13 && $scope.taskText!=""){
					//console.log(event.which || event.keyCode);
						$scope.addTask();
				}
				};
			$scope.addTask=function(){
					$scope.task.push({'mess':$scope.taskText,'status':false });
					console.log($scope.task)
					$scope.taskText="";
					localStorage['taskList']=JSON.stringify($scope.task );
					console.log(localStorage);
					};

					$scope.contentEdit=function(msg){

						for (var i =0;i< $scope.task.length ;i++) {
									if($scope.task[i].mess==msg){
										$scope.task[i].mess=event.target.innerText;
									}
							}
						localStorage['taskList']=JSON.stringify($scope.task);

						event.target.contentEditable=event.target.contentEditable=="false" ? "true" : "false";
						console.log(event.target.contenteditable);
					};

					$scope.enterAgain=function(msg){
							if(event.which==13 && msg!=""){
					//console.log(event.which || event.keyCode);
						$scope.contentEdit(msg);
				}
					};



			});

			app.controller('filterCtrl',function ($scope) {



			});
			app.controller('cusDirCtrl',function ($scope) {

			$scope.name="Vikash";
			$scope.age =100;
			$scope.alertTheName=function(){
								alert($scope.name);
							};

			});

			app.directive('cusDir',function(){
				function linkFunction($scope,ele,attr){
					// ele.bind('click', function(){
					// 	alert(ele[0].innerHTML);
					// })

					$scope.name="Ranvir";
					$scope.changeText=function(newName){
						$scope.name="Ranvir Kumar";
					}
				}

				return{
						template:['<p>Value Of Name in Directive : {{name}}',
											'<p>Enter new "name":<input type="text" ng-model="name"></p>',
											'<p>Value Of Age in Directive : {{age}}</p>',
											'<p>Enter new "age":<input type="text" ng-model="age"></p>',
											'<button class="btn btn-info" ng-click="func()">{{name}} from dir</button>'].join(''),
						restrict:'EA',
						link:linkFunction,
						scope:{
							name: '@',
							age: '=',
							func:'&'

						}
				}
			});


			app.filter('base',function(){
					var some=function(input,base){
							var parsed=parseInt(input,10);
							var based=parseInt(base,10);
							if(isNaN(parsed) || isNaN(based)||based<=1 || based>=36) return input;
						return parsed.toString(based);
					}
					return some;
			});



