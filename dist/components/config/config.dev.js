(function () {
    
    'use strict';
    
    angular.module('phonelist.config', [])

        .constant('config', {

            // 'svcLocation': 'http://afcuwasdevodc1.americafirst.com:9080/phonelistws/jaxrs/phonelist',
            'svcLocation': 'https://afcuwasprd.americafirst.com:9446/phonelistws/jaxrs/phonelist',
            'version': '0.0.1'

        })
    
})();