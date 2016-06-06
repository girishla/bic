import UserService from "./user.factory";
import permissionRun from "./permission.run";
import PermissionController from "./pages/permission.controller";


export default    angular
  .module('elasticslice.permission', [])
  .factory('UserService', UserService)
  .run(permissionRun)
  .controller('PermissionController', PermissionController);
