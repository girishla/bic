import * as lodash from "lodash"

export default function UserService($q, UserApi, Socket) {
  // here we use a simple in memory cache in order to keep actual data synced up in the client
  var cache = {};

  var initObject = function (data) {

    if (cache[data.id]) {
      // only extend objects that already exist!!! in order to keep bindings
      angular.extend(cache[data.id], new User(data));
    } else {
      cache[data.id] = new User(data);

    }

    return cache[data.id];
  };



  var User: any = function (data) {
    angular.extend(this, data);
  };


  User.getAll = function (options) {

    if (!lodash.isEmpty(cache)) {
      console.log('Cache Already Exists. Returning Cached Users.')
      return $q.when(cache);
    }

    var apiResult = UserApi.query({ sort: 'id DESC' }).$promise.then(function (Users) {
      angular.copy({}, cache);


      lodash.map(Users, function (User) {
        return initObject(User);
      });
      return cache;
    });

    if (lodash.isEmpty(cache)) {
      return apiResult;
    } else {
      return $q.when(cache);
    }
  };


  User.getOne = function (id) {

    var apiResult = UserApi.get({ id: id }).$promise.then(
      function (user) {

        return initObject(user);

      });

    if (lodash.isEmpty(cache[id])) {
      return apiResult;
    } else {
      return $q.when(cache[id]);
    }


  };

  User.isEmpty = function () {

    return lodash.isEmpty(cache)

  }


  User.create = function (data) {

    var apiResult = UserApi.save(data).$promise.then(
      function (user) {

        //User creator is a follower by default
        User.createFollower({ userId: user.id }, { "userId": 1 });
        return initObject(user);

      });


    if (lodash.isEmpty(cache[data.id])) {
      return apiResult;
    } else {
      return $q.when(cache[data.id]);
    }

    /*        return UserApi.create(data).then(function (User) {
     return initObject(User);
     });
     */
  };


  User.prototype.remove = function () {
    var self = this;

    var apiResult = UserApi.remove({ id: self.id }).$promise.then(
      function () {

        if (cache.hasOwnProperty(self.id)) {
		//in case the user was already deleted because the socket io notification
          delete cache[self.id];
         
        }

      });


  };




  // include SocketIO notifications service that will fire all the listeners on specified evnts
  // register listener for NewUser event
  Socket.on('User.Create', function (newUser) {
    // as we already have new User we just add it to cache with
    // initObject call
    console.log(newUser);
    initObject(newUser);
  });



  Socket.on('User.Patch', function (updatedUser) {
    // as we already have new User we just add it to cache with
    // initObject call
    initObject(updatedUser);
  });


  Socket.on('User.Delete', function (id) {

    if (cache.hasOwnProperty(id)) {
      delete cache[id];
    }

  });


  return User;
};



