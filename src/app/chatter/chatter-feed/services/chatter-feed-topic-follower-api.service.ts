

export function FollowerApi($resource) {
  return $resource('http://localhost:8000/api/followers/:followerId', {followerId: '@id'})
}
export function TopicFollowerApi($resource) {
  return $resource('http://localhost:8000/api/topics/:topicId/followers/:followerId', {
    topicId: '@topicId',
    followerId: '@id'
  })
}



