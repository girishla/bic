export function CommentApi($resource) {
  return $resource('http://localhost:8000/api/comments/:commentId', {commentId: '@id'})
}
export function TopicCommentApi($resource) {
  return $resource('http://localhost:8000/api/topics/:topicId/comments/:commentId', {
    topicId: '@topicId',
    commentId: '@id'
  })
}



