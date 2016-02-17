'use strict';

describe('Filter: userDisplay', function () {
  require('./filters-user-display-name');

  var userDisplay;

  beforeEach(function () {
    angular.mock.module('cmsComponents.filters.userDisplay');

    inject(function ($filter) {
      userDisplay = $filter('userDisplay');
    });
  });

  it('should return empty string when there is no user', function () {
    expect(userDisplay(null)).to.equal('');
  });

  it('should return first and last name when present', function () {
    expect(userDisplay({
      first_name: 'First',
      last_name: 'Last'
    })).to.equal('First Last');
  });

  it('should return username when no first and last name', function () {
    expect(userDisplay({
      username: 'username'
    })).to.equal('username');
  });

});
