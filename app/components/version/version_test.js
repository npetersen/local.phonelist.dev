'use strict';

describe('phonelist.version module', function() {
  beforeEach(module('phonelist.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
