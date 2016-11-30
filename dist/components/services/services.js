(function () {
	
	'use strict';
	
	angular.module('phonelist.services', ['ngResource'])
    
    .config(function($httpProvider) {
    
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    })
	
	.factory('EmpsByDept', function ($resource, config) {
	
		return $resource(config.svcLocation + '/employeeByDepartment/:deptId', {}, {
        
            query: {method: 'GET', isArray: true, params: {deptId: '@deptId'}}
        
        })
		
	})
    
    .factory('DeptInfo', function($resource, config) {
        
        return $resource(config.svcLocation + '/department/:deptId', {}, {
            
            query: {method: 'GET', isArray: false, params: {deptId: '@deptId'}}
        
        })
    
    })
    
    .factory('Emp', function ($resource, config) {
    
        var empData = {};
        
        return $resource(config.svcLocation + '/employee/:empNum', {}, {
        
            query: {method: 'GET', isArray: false, params: {empNum: '@empNum'}}
        
        })
    
    })
    
    .factory('AllEmps', function($resource, config) {
        
        return $resource(config.svcLocation + '/allemplyees/', {}, {
            
            query: {method: 'GET', cache: true, isArray: true, params: {}}
            
        })
        
    })
	
	.value('version', '0.1');
	
	// See more at: http://coder1.com/articles/consuming-rest-services-angularjs#sthash.cFvssGbi.dpuf

})();