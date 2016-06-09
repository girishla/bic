export default function TopicApi($resource) {
  return $resource('http://localhost:8000/api/topics/:id', {
    sort: '@sort' //pass in param using @ syntax
  }, {
    'query': {
      method: 'GET', isArray: true,
      /*transformResponse: function (data, header) {

       //Getting string data in response
       var jsonData = JSON.parse(data); //or angular.fromJson(data)
       var topics = [];

       angular.forEach(jsonData, function(topic){
       topics.push(topic);
       });

       console.log(topics);

       return topics;

       }
       */
    }
  });
};





