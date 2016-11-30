'use strict';

angular.module('phonelist.version', [
  'phonelist.version.interpolate-filter',
  'phonelist.version.version-directive'
])

.value('version', '0.1');
