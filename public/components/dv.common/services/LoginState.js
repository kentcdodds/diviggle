angular.module('dv.common.services').factory('LoginState', function($rootScope, $window, AlertEventBroadcaster, $firebaseSimpleLogin, firebaseRef, loggedInUsersRef, $firebase) {
  'use strict';
  var userKey = 'user-object';
  var currentUser = null;
  var loginObj = $firebaseSimpleLogin(firebaseRef);
  var loggedInUsers = $firebase(loggedInUsersRef);

  return {
    getUser: getUser,
    setUser: setUser,
    clearUser: clearUser,
    logout: logout,
    login: login,
    broadcastChange: broadcastChange,
    isAuthenticated: isAuthenticated
  };

  function getUser() {
    if (!currentUser) {
      currentUser = $window.localStorage.getItem(userKey);
      if (currentUser) {
        _setUser(JSON.parse(currentUser));
      }
    }
    return currentUser;
  }

  function isAuthenticated() {
    return !!getUser();
  }

  function setUser(user) {
    $window.localStorage.setItem(userKey, JSON.stringify(user));
    _setUser(user);
    broadcastChange(true);
  }

  function logout() {
    $window.localStorage.removeItem(userKey);
    _setUser(null);
    broadcastChange(true);
  }

  function clearUser() {
    $window.localStorage.removeItem(userKey);
    _setUser(null);
    broadcastChange();
  }

  function _setUser(user) {
    _updateLoggedInUsers(user);
    $rootScope.currentUser = currentUser = user;
  }

  function _updateLoggedInUsers(user) {
    var id = user ? user.id : currentUser ? currentUser.id : null;
    if (id && user) {
      loggedInUsersRef.child(id).set(_getFirebaseUserObject(user || currentUser));
    } else if (id && currentUser) {
      loggedInUsersRef.child(id).remove();
    }
  }

  function _getFirebaseUserObject(user) {
    var data = user.thirdPartyUserData;
    return {
      id: user.id,
      displayName: user.displayName,
      provider: user.provider,
      profilePhoto: data.profile_image_url || data.picture || 'http://graph.facebook.com/' + user.id + '/picture?type=square'
    };
  }

  function login(provider) {
    return loginObj.$login(provider, {
      rememberMe: true
    }).then(function(user) {
      setUser(user);
      console.log(user);
      return user;
    }, function error(error) {
      $rootScope.currentUser = currentUser = null;
      console.log(error);
      throw error;
    });
  }

  function broadcastChange(alert) {
    var authenticated = isAuthenticated();
    $rootScope.$broadcast('login.change', authenticated);
    if (!alert) {
      return;
    }
    if (authenticated) {
      AlertEventBroadcaster.broadcast({
        type: 'info',
        message: 'How\'s it going?',
        title: 'Welcome!'
      });
    } else {
      AlertEventBroadcaster.broadcast({
        type: 'info',
        message: 'See you again soon!',
        title: 'Bye!'
      });
    }
  }
});