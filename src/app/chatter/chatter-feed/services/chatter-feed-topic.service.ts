import * as lodash from "lodash"
var SHA1 = <any>require("crypto-js/sha1")

export default function TopicService($rootScope, $q, TopicApi, CommentApi, TopicCommentApi, Socket, FollowerApi, TopicFollowerApi, UserService) {
  // here we use a simple in memory cache in order to keep actual data synced up in the client
  var cache = {};
  var contextCache = {};
  var contextValueCache = {};



  var initObject = function (data) {


    var contextCacheIndex = SHA1(JSON.stringify(data.level1ContextHash + data.level2ContextHash + data.level3ContextHash + data.level4ContextHash)).toString();

    if (cache[data.id]) {
      // only extend objects that already exist!!! in order to keep bindings
      angular.extend(cache[data.id], new Topic(data));
    } else {
      cache[data.id] = new Topic(data);

      if (!contextCache.hasOwnProperty(contextCacheIndex)) {
        contextCache[contextCacheIndex] = 1;
      }
      else {
        contextCache[contextCacheIndex] = contextCache[contextCacheIndex] + 1
      }

      if (typeof contextValueCache[contextCacheIndex] == 'undefined') {
        contextValueCache[contextCacheIndex] = {};
        contextValueCache[contextCacheIndex].topics = [];
      }

      contextValueCache[contextCacheIndex].topics.push({ topic: cache[data.id] });
      if (cache[data.id].pinned == true) {
        contextValueCache[contextCacheIndex].hasPinnedTopics = true
        contextValueCache[contextCacheIndex];
      }

    }



    if (!(cache[data.id].hasOwnProperty('comments'))) {
      cache[data.id].comments = [];
    }

    if (!(cache[data.id].hasOwnProperty('followers'))) {
      cache[data.id].followers = [];
    } else {


      // Merge User properties into Followers - Similar to SQL Join

      UserService.getAll().then((users: any) => {

        angular.forEach(cache[data.id].followers, function (follower, index) {
          let user = lodash.find(users, function (o: any) { return o.id == follower.userId; });
          if (user.id) {
            cache[data.id].followers[index] = angular.extend({}, user, follower);
          }

        })


      });

    }



    //contextCache[contextCacheIndex]=contextCache[contextCacheIndex]>=0?contextCache[contextCacheIndex]+1:0

    // Object.defineProperty(contextCache, SHA1(JSON.stringify(data.level1ContextHash + data.level2ContextHash + data.level3ContextHash + data.level4ContextHash)).toString(), {
    //   value: true,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // });


    return cache[data.id];
  };



  var Topic: any = function (data) {
    angular.extend(this, data);
  };

  Topic.getContextCache = function () {
    return contextCache
  }


  Topic.getContextValueCache = function (combinedHash) {
    return contextValueCache[combinedHash]
  }


  Topic.getAll = function (options) {

    if (!lodash.isEmpty(cache)) {
      console.log('Cache ALready Exists. Returning Cached Topics.')
      return $q.when(cache);
    }


    var apiResult = TopicApi.query({ sort: 'id DESC' }).$promise.then(function (Topics) {
      angular.copy({}, cache);


      lodash.map(Topics, function (Topic) {
        return initObject(Topic);
      });
      return cache;
    });

    if (lodash.isEmpty(cache)) {
      return apiResult;
    } else {
      return $q.when(cache);
    }
  };


  Topic.getOne = function (id) {

    var apiResult = TopicApi.get({ id: id }).$promise.then(
      function (topic) {

        return initObject(topic);

      });

    if (lodash.isEmpty(cache[id])) {
      return apiResult;
    } else {
      return $q.when(cache[id]);
    }


  };

  Topic.isEmpty = function () {

    return lodash.isEmpty(cache)

  }


  Topic.create = function (data) {

    var apiResult = TopicApi.save(data).$promise.then(
      function (topic) {



        return initObject(topic);

      });


    if (lodash.isEmpty(cache[data.id])) {
      return apiResult;
    } else {
      return $q.when(cache[data.id]);
    }

    /*        return TopicApi.create(data).then(function (Topic) {
     return initObject(Topic);
     });
     */
  };


  Topic.deleteTopicFromValueCache = (contextCacheIndex, topicId) => {
    var pinnedTopicsExist = false;
    angular.forEach(contextValueCache[contextCacheIndex].topics, (topicItem, topicIndex) => {
      console.log('deleteTopicFromValueCache', topicItem.topic.id, topicId)

      if (topicId == topicItem.topic.id) {

        contextValueCache[contextCacheIndex].topics.splice(topicIndex, 1)
        console.log('deleted contextValueCache[contextCacheIndex].topics', contextValueCache[contextCacheIndex].topics)
      }
      else {
        if (topicItem.topic.pinned == true) {
          pinnedTopicsExist = true;
        }
      }



    })
    contextValueCache[contextCacheIndex].hasPinnedTopics = pinnedTopicsExist;
  }


  Topic.prototype.remove = function () {
    var self = this;

    var apiResult = TopicApi.remove({ id: self.id }).$promise.then(
      function () {



        if (cache.hasOwnProperty(self.id)) {
          var contextCacheIndex = SHA1(JSON.stringify(self.level1ContextHash + self.level2ContextHash + self.level3ContextHash + self.level4ContextHash)).toString();
          //in case the topic was already deleted because the socket io notification
          contextCache[contextCacheIndex] = contextCache[contextCacheIndex] > 0 ? contextCache[contextCacheIndex] - 1 : 0;
          //console.log(contextCache[contextCacheIndex]);
          delete cache[self.id];
          Topic.deleteTopicFromValueCache(contextCacheIndex, self.id)
          if (contextCache[contextCacheIndex] == 0) delete contextCache[contextCacheIndex];
          console.log('deleted self.id ', self.id, 'contextCache[contextCacheIndex]:', contextCache[contextCacheIndex]);
        }

      });


  };


  Topic.removeComment = function (commentId) {
    var self = this;
    CommentApi.remove({ commentId: commentId });
    console.log('comment removed...');

  };



  Topic.createComment = function (params, data) {
    var self = this;
    TopicCommentApi.save(params, data).$promise.then(
      function (newComment) {

        //if (!(lodash.find(cache[params.topicId].comments, 'id', newComment.id))) {
        if (!(lodash.findIndex(cache[params.topicId].comments, { 'id': newComment.id }) > -1)) {
          cache[params.topicId].comments.push(newComment)
          console.log('comment ADDED...');
        }

      }
    );

  };

  Topic.createFollower = function (params, data) {
    var self = this;

    console.log('cache[params.topicId].followers', cache[params.topicId].followers)

    //if already following topic, nothing to do, just return;
    if ((cache[params.topicId]) && ((lodash.findIndex(cache[params.topicId].followers, { 'userId': data.userId }) > -1))) return;

    TopicFollowerApi.save(params, data).$promise.then(
      function (newFollower) {

        console.log('newFollower', newFollower, cache[params.topicId].followers)

        if (!(lodash.findIndex(cache[params.topicId].followers, { 'id': newFollower.id }) > -1)) {


          UserService.getAll().then((users: any) => {
            //Users Cached in Service. Nothing more to be done for now.
            console.log('users:', users)
            let user = lodash.find(users, function (o: any) { return o.id == newFollower.userId; });
            console.log('userIndex', user)


            if (user.id) {
              newFollower = angular.extend({}, user, newFollower);
            }
            cache[params.topicId].followers.push(newFollower)
            console.log('follower ADDED...', newFollower);

          });



        }

      }
    );

  };

  Topic.removeFollower = function (followerId) {
    var self = this;
    FollowerApi.remove({ followerId: followerId });
    console.log('follower removed...');

  };




  // include SocketIO notifications service that will fire all the listeners on specified evnts
  // register listener for NewTopic event
  Socket.on('Topic.Create', function (newTopic) {
    // as we already have new Topic we just add it to cache with
    // initObject call
    console.log(newTopic);
    initObject(newTopic);
  });



  Socket.on('Comment.Create', function (topicId, newComment) {
    // as we should already have the Topic we just add the comment to cache ...
    console.log('new comment received for topic:', topicId);
    console.log(newComment);

    var result = lodash.pick(cache, function (value, key) {
      return (key == topicId);
    });

    if (result) {
      //   if (!(lodash.find(cache[topicId].comments, 'id', newComment.id))) {
      if (!(lodash.findIndex(cache[topicId].comments, { 'id': newComment.id }) > -1)) {

        cache[topicId].comments.push(newComment)
        console.log('added comment into topic');
      }

    }
    else {
      console.log('cannot find topic in local memory cache so cant add comment into cache...');

    }

  });


  Socket.on('Topic.Patch', function (updatedTopic) {
    // as we already have new Topic we just add it to cache with
    // initObject call
    initObject(updatedTopic);
  });


  Socket.on('Topic.Delete', function (id) {

    if (cache.hasOwnProperty(id)) {
      var contextCacheIndex = SHA1(JSON.stringify(cache[id].level1ContextHash + cache[id].level2ContextHash + cache[id].level3ContextHash + cache[id].level4ContextHash)).toString();
      contextCache[contextCacheIndex] = contextCache[contextCacheIndex] > 0 ? contextCache[contextCacheIndex] - 1 : 0;
      // here we can find the Topic in the cache by its ID and remove it
      if (contextCache[contextCacheIndex] == 0) delete contextCache[contextCacheIndex];
      delete cache[id];
      Topic.deleteTopicFromValueCache(contextCacheIndex, id)

    }

  });

  Socket.on('Comment.Delete', function (commentId) {

    console.log('comment to be deleted:', commentId);

    lodash.forEach(cache, function (topic: any) {
      lodash.remove(cache[topic.id].comments, function (currentObject: any) {
        return currentObject.id == commentId;
      });

    });


  });



  Socket.on('Follower.Create', function (topicId, newFollower) {
    // as we should already have the Topic we just add the follower to cache ...
    console.log('new follower received for topic:', topicId);
    console.log(newFollower, cache[topicId].followers);

    if ((cache[topicId]) && ((lodash.findIndex(cache[topicId].followers, { 'id': newFollower.id }) > -1))) return;

    var result = lodash.pick(cache, function (value, key) {
      return (key == topicId);
    });

    if (result) {
      // if (!(lodash.find(cache[topicId].followers, 'id', newFollower.id))) {
      if (!(lodash.findIndex(cache[topicId].followers, { 'id': newFollower.id }) > -1)) {

        UserService.getAll().then((users: any) => {
          //Users Cached in Service. Nothing more to be done for now.
          console.log('users:', users)
          let user = lodash.find(users, function (o: any) { return o.id == newFollower.userId; });
          console.log('userIndex', user)
          if (user.id) {
            newFollower = angular.extend({}, user, newFollower);
          }
          cache[topicId].followers.push(newFollower)
          console.log('follower ADDED...', newFollower);

        });



        console.log('added follower into topic');
      }

    }
    else {
      console.log('cannot find topic in local memory cache so cant add follower into cache...');

    }

  });

  Socket.on('Follower.Delete', function (followerId) {

    console.log('follower to be deleted:', followerId);

    lodash.forEach(cache, function (topic: any) {
      lodash.remove(cache[topic.id].followers, function (currentObject: any) {
        return currentObject.id == followerId;
      });

    });


  });


  return Topic;
};



