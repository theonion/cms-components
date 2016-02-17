'use strict';

describe('Service: CurrentUser', function () {
  require('./cms-token-auth-user');

  var $httpBackend;
  var CurrentUser;
  var fakeUrl = '/some/me/endpoint';
  var fakeUser = {
    username: 'fakeuser',
    first_name: 'Fake',
    last_name: 'User',
    email: 'fakeuser@abc.123'
  };

  var prepRequest = function (status, userData) {
    return $httpBackend.expectGET(fakeUrl)
      .respond(status, {
        results: [userData]
      });
  };

  beforeEach(function () {
    angular.mock.module('cmsComponents.auth.user');

    inject(function (_$httpBackend_, _CurrentUser_, TokenAuthConfig) {

      $httpBackend = _$httpBackend_;
      CurrentUser = _CurrentUser_;

      TokenAuthConfig.getApiEndpointCurrentUser = sinon.stub().returns(fakeUrl);
    });
  });

  describe('$get function', function () {

    it('should make a request to get current user data', function () {
      var responseUser;

      prepRequest(200, fakeUser);

      CurrentUser.$get().then(function (user) {
        responseUser = user;
      });
      $httpBackend.flush();

      expect(responseUser).to.eql(fakeUser);
    });

    it('should not get user data again if it already has user data', function () {

      prepRequest(200, fakeUser);

      CurrentUser.$get();
      CurrentUser.$get();

      // expectation is that this doesn't fail since only 1 request should have
      //  been made
      $httpBackend.flush();
    });

    it('should call login handlers with user data', function () {
      var handlerArg;

      prepRequest(200, fakeUser);

      CurrentUser.addLoginHandler(function (user) {
        handlerArg = user;
      });
      CurrentUser.$get();
      $httpBackend.flush();

      expect(handlerArg).to.eql(fakeUser);
    });

    it('should return a promise interface', function () {

      var retInterface = CurrentUser.$get();

      expect(retInterface.then).to.be.defined;
      expect(retInterface.catch).to.be.defined;
      expect(retInterface.finally).to.be.defined;
    });
  });

  describe('logout', function () {

    it('should empty user data', function () {

      prepRequest(200)
      prepRequest(200)

      CurrentUser.$get();
      CurrentUser.logout();
      CurrentUser.$get();

      // expectation is that this doesn't fail since both requests should go
      //  through if user data was cleared
      $httpBackend.flush();
    });

    it('should call logout handlers', function () {
      var handler = sinon.stub();

      CurrentUser.addLogoutHandler(handler)
      CurrentUser.logout();

      expect(handler.calledOnce).to.be.true;
    });
  });

  describe('handlers', function () {

    it('should provide a way to remove a login handler', function () {
      var handler = sinon.stub();

      prepRequest(200);

      CurrentUser.addLoginHandler(handler);
      CurrentUser.removeLoginHandler(handler);
      CurrentUser.$get()
      $httpBackend.flush();

      expect(handler.callCount).to.equal(0);
    });

    it('should provide a way to remove a logout handler', function () {
      var handler = sinon.stub();

      CurrentUser.addLogoutHandler(handler);
      CurrentUser.removeLogoutHandler(handler);
      CurrentUser.logout();

      expect(handler.callCount).to.equal(0);
    });
  });
});
