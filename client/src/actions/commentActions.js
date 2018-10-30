import { FETCH_COMMENTS, NEW_COMMENT } from './types'

//action creators
export const fetchComments = (commentId) => dispatch => {
  console.log('fetching comments')
    fetch(`/api/comments/${commentId}`)
    .then(res => res.json())
    .then(comments =>
      dispatch({
      type: FETCH_COMMENTS,
      payload: comments
    }))
}
