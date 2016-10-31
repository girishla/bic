import * as lodash from "lodash"
var SHA1 = <any>require("crypto-js/sha1")

export default function TopicService($rootScope, $q, TopicApi, CommentApi, TopicCommentApi, Socket) {
  // here we use a simple in memory cache in order to keep actual data synced up in the client
  var cache = {};
  var contextCache = {};


  var initObject = function (data) {

    if (cache[data.id]) {
      // only extend objects that already exist!!! in order to keep bindings
      angular.extend(cache[data.id], new Topic(data));
    } else {
      cache[data.id] = new Topic(data);

      var contextCacheIndex = SHA1(JSON.stringify(data.level1ContextHash + data.level2ContextHash + data.level3ContextHash + data.level4ContextHash)).toString();


      if (!contextCache.hasOwnProperty(contextCacheIndex)) {
        contextCache[contextCacheIndex] = 1;
      }
      else {
        contextCache[contextCacheIndex] = contextCache[contextCacheIndex] + 1
      }

      console.log('contextCache[contextCacheIndex] is:', contextCache[contextCacheIndex])

    }
    if (!(cache[data.id].hasOwnProperty('comments'))) {
      cache[data.id].comments = [];
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

        if (!(lodash.find(cache[params.topicId].comments, 'id', newComment.id))) {
          cache[params.topicId].comments.push(newComment)
          console.log('comment ADDED...');
        }

      }
    );

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
      if (!(lodash.find(cache[topicId].comments, 'id', newComment.id))) {
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
      //   delete contextCache[SHA1(JSON.stringify(cache[id].level1ContextHash + cache[id].level2ContextHash + cache[id].level3ContextHash + cache[id].level4ContextHash)).toString()]
      // here we can find the Topic in the cache by its ID and remove it
      if (contextCache[contextCacheIndex] == 0) delete contextCache[contextCacheIndex];
      delete cache[id];

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

  return Topic;
};



