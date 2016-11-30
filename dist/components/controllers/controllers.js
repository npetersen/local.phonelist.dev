(function () {

	'use strict';
	
	angular.module('phonelist.controllers', [])
    
    
    .controller('ctrlEmpsByDept', ['$scope', '$routeParams', '$location', 'EmpsByDept', function ($scope, $routeParams, $location, EmpsByDept) {

		$scope.empsByDept = {};
        $scope.deptId = $routeParams.deptId;
        $scope.sortBy = 'firstName';
        $scope.reverse = false;
        
        EmpsByDept.query({deptId: $scope.deptId}, function(response) {
            
            $scope.empsByDept.emps = response;
            
            // console.debug(response);
            
        });
        
        $scope.showEmp = function(empNum) {
            
            $location.path('/employee/' + empNum);
            
        };
        
        $scope.doSort = function(propName) {
            
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
            
        };
		
	}])
    
    
    .controller('ctrlSearchAllEmps', ['$scope', 'AllEmps', function($scope, AllEmps) {
        
        $scope.allEmps = {};
        
        AllEmps.query(function(response) {
            
           $scope.allEmps = response; 
            
        });
        
    }])
    
    
    .controller('ctrlDept', ['$scope', '$routeParams', '$location', '$modal', 'DeptInfo', 'EmpsByDept', 'Emp', function($scope, $routeParams, $location, $modal, DeptInfo, EmpsByDept, Emp) {
        
        $scope.empsByDept = {};
        $scope.deptInfo = {};
        $scope.dspData = {};
        $scope.deptId = $routeParams.deptId;
        $scope.categoryId = $routeParams.categoryId;
        
        DeptInfo.query({deptId: $scope.deptId}, function(response) {
            
           $scope.deptInfo = response; 
        
        });
        
        EmpsByDept.query({deptId: $scope.deptId}, function(response) {
            
            $scope.empsByDept.emps = response;
        
        });
        
        $scope.dspData.categoryLabel = function() {
            
            if ($scope.categoryId == 0) {
                
                return 'Department';
                
            } else if ($scope.categoryId == 1) {
                
                return 'Branch';
                
            }
            
        };
        
        $scope.showEmp = function(empNum) {
            
            $location.path('/employee/' + empNum);
            
        };
        
        $scope.popModal = function(empNum, size) {
            
            var modalInstance = $modal.open({
                templateUrl: 'views/modal.html',
                controller: 'ctrlEmpModal',
                size: size,
                resolve: {
                    empNum: function () {
                        return empNum;
                    }
                }
            });
            
        };

            $scope.goBack = function() {
                window.history.back();
            };
    
    }])
    
    
    .controller('ctrlEmp', ['$scope', '$routeParams', 'Emp', function($scope, $routeParams, Emp) {
    
        $scope.emp = {};
        $scope.empNum = $routeParams.empNum;
        
        Emp.query({empNum: $scope.empNum}, function(response) {
            
            $scope.emp.empInfo = response;
            
            // console.debug(response);
            
        });
        
    }])
    
    
    .controller('ctrlSearch', ['$scope', '$location', '$modal', 'AllEmps', function($scope, $location, $modal, AllEmps) {

        // http://plnkr.co/edit/eAdqHY?p=preview

        $scope.allNames = {};
            $scope.date = new Date();

        AllEmps.query(function(response) {

            // http://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
            
            $scope.allNames = response.filter(function(obj) {
                
                return obj.categoryId !== 3 && obj.categoryId !== 4;
                
            });
            
        });
        
        $scope.onSelect = function($item) {
            
            switch ($item.categoryId) {
                
                case 0:
                case 1: 
                    $location.path('/department/' + $item.id + '/' + $item.categoryId)
                    break;
                case 2:
                    // $location.path('/employee/' + $item.id);
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'ctrlEmpModal',
                        // size: size,
                        // windowClass: 'modal-middle',
                        resolve: {
                            empNum: function () {
                                return $item.id;
                            }
                        }
                    });
                    break;
            }
            
        };
        
    }])
    
    
    .controller('ctrlEmpModal', ['$scope', '$routeParams', '$modalInstance', 'Emp', 'empNum', function($scope, $routeParams, $modalInstance, Emp, empNum) {
        
        $scope.modalOptions = {};
        $scope.empDetails = {};
        $scope.empNum = empNum;
        
        // console.log(empNum);
        
        Emp.query({empNum: $scope.empNum}, function(empResponse) {
            
            empResponse.$promise.then(function() {
                
                $scope.empDetails = empResponse;
                
                // console.log($scope.empDetails);
                
                $scope.modalOptions.headerText = $scope.empDetails.firstName + ' ' + $scope.empDetails.lastName;
                $scope.modalOptions.image = $scope.empDetails.image.picture;
                $scope.modalOptions.title = $scope.empDetails.title;
                $scope.modalOptions.deptName = $scope.empDetails.deptName;
                $scope.modalOptions.extension = $scope.empDetails.extension;
                $scope.modalOptions.busPhoneNum = $scope.empDetails.busPhoneNum;
                $scope.modalOptions.mobile = $scope.empDetails.mobile;
                $scope.modalOptions.email = $scope.empDetails.email;
                
            });
            
        });
        
        $scope.modalOptions.bodyText = 'Modal Body Text Here';
        $scope.modalOptions.closeButtonText = 'Close';
        $scope.modalOptions.actionButtonText = 'Action Button Text Here';
        
        $scope.close = function () {
            $modalInstance.close();
        };
        
    }]);

})();