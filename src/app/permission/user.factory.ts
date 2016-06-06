/* @ngInject */
export default function UserService($q, $http, RoleStore,eslURL,$location) {
  var currentUser = {
    displayName: 'GirishAA',
    username: 'GirishAA',
    avatar: 'assets/images/avatars/avatar-5.png',
    roles: ['SUPERADMIN']
  };

  var service = {
    getCurrentUser: getCurrentUser,
    getUsers: getUsers,
    hasPermission: hasPermission,
    login: login

  };

  return service;

  ///////////////

  function getCurrentUser() {

    var baseUrl= 'http://' + $location.host().replace('/','') + ':' + $location.port() + ($location.host()=='localhost'?'':'/proteus');

    return $http({
      method: 'GET',
      url: baseUrl + '/user'
    })
  }

  function getUsers() {
    return $http.get('app/permission/data/users.json');
  }

  function hasPermission(permission) {
    var deferred = $q.defer();
    var hasPermission = false;

    // check if user has permission via its roles
    angular.forEach(currentUser.roles, function (role) {
      // check role exists
      if (RoleStore.hasRoleDefinition(role)) {
        // get the role
        var roleDef = RoleStore.getRoleDefinition(role);
        // check if the permission we are validating is in this role's permissions
        if (-1 !== roleDef.permissionNames.indexOf(permission)) {
          hasPermission = true;
        }
      }
    });

    // if we have permission resolve otherwise reject the promise
    if (hasPermission) {
      deferred.resolve();
    }
    else {
      deferred.reject();
    }

    // return promise
    return deferred.promise;
  }

  function login(username) {
    // you would replace the code below with a call you your API
    // request all users
    return getUsers()
      .then(function successCallback(response) {
        var returnUser = getCurrentUser();
        angular.forEach(response.data, function (user) {
          if (user.username === username) {
            returnUser = user;
            currentUser = user;
          }
        });
        return returnUser;
      });
  }
}
