(function () {

    'use strict';

    angular.module('phonelist.directives', [])

        // http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field/29963695#29963695
        .directive('doFocus', function ($timeout) {
            return {
                restrict: 'A',
                link: {
                    post: function postLink(scope, element, attrs) {
                        scope.$watch(attrs.doFocus, function (value) {

                            if (attrs.doFocus) {
                                if (scope.$eval(attrs.doFocus)) {
                                    $timeout(function () {
                                        element[0].focus();
                                    }, 100); //need some delay to work with ng-disabled
                                }
                            }
                        });
                    }
                }
            };
        })

        // http://eric.sau.pe/angularjs-detect-enter-key-ngenter/
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
    
})();