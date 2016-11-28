export default function UserApi($resource) {
  return $resource('http://localhost:8000/api/users/:id', {
    sort: '@sort' //pass in param using @ syntax
  }, {
    'query': {
      method: 'GET', isArray: true,
    }
  });
};





