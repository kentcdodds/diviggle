angular.module('dv.common.services').factory('AuthService', function(FBAPI, $http, LoginState, _, AlertEventBroadcaster) {
  'use strict';
  return {
    register: register,
    login: login,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
  };

  function register(data) {
    var formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    return _loginOrRegister({
      url: FBAPI + 'register',
      data: formData,
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity
    });
  }

  function login(data) {
    // NOTE: due to limitations of DRF and TokenAuthentication
    // we use "username" rather than "email"...
    return _loginOrRegister({
      url: FBAPI + 'login',
      data: {
        username: data.email,
        password: data.password
      }
    });
  }

  function _loginOrRegister(config) {
    var headers = config.headers || {};
    return $http(_.extend(config, {
      method: 'POST',
      headers: headers
    })).then(function(response) {
      var token = response.data.token;
      if (token) {
        LoginState.setToken(token);
      }
      return response;
    }, function(err) {
      LoginState.clearToken();
      throw err;
    });
  }

  function forgotPassword(email) {
    return $http({
      method: 'POST',
      url: FBAPI + 'password/reset',
      data: {
        email: email
      }
    });
  }

  function resetPassword(newPassword, userId, key) {
    return $http({
      method: 'POST',
      url: FBAPI + 'password/reset/' + userId + '-' + key,
      data: {
        password1: newPassword,
        password2: newPassword
      }
    });
  }
});