angular.module('dv.common.services').factory('UtilService', function(_, $http, $q, FBAPI, $upload) {
  'use strict';
  return {
    uploadAvatar: uploadAvatar,
    inviteUser: inviteUser,
    inviteAdmin: inviteAdmin
  };

  function uploadAvatar(file) {
    return $upload.upload({
      method: 'POST',
      url: FBAPI + 'users/avatar',
      file: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  function inviteUser(email) {
    return $http({
      method: 'POST',
      url: FBAPI + 'invite/user',
      data: {
        email: email
      }
    });
  }

  function inviteAdmin(email) {
    return $http({
      method: 'POST',
      url: FBAPI + 'invite/lock_admin',
      data: {
        email: email
      }
    });
  }
});