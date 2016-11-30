(function () {
	
	'use strict';
	
	// Declare app level module which depends on views, and components
	angular.module('phonelist', ['ngRoute', 'ngResource', 'phonelist.config', 'phonelist.controllers', 'phonelist.services', 'phonelist.directives', 'ui.bootstrap', 'dcbImgFallback']).config(['$routeProvider', function($routeProvider) {
		
		$routeProvider.when('/', {templateUrl: 'views/search.html', controller: 'ctrlSearch'});
        $routeProvider.when('/department/:deptId/:categoryId', {templateUrl: 'views/department.html', controller: 'ctrlDept'});
        $routeProvider.when('/employee/:empNum', {templateUrl: 'views/employee.html', controller: 'ctrlEmp'});
		$routeProvider.otherwise({redirectTo: '/'});
		
	}]);

})();