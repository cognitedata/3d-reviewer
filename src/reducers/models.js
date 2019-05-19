import PropTypes from 'prop-types'
import ActionTypes from '../constants/actionTypes'

export const Comment = PropTypes.shape({
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
});

export const Comments = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(Comment).isRequired,
});

const initialState = {
  // nodeId -> { loading: boolean, items: array of comments }
  comments: {},
}

export default function model(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_COMMENTS: {
      const nodeId = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [nodeId]: undefined,
        }
      }
    }
    case ActionTypes.ADD_COMMENT: {
      const { comment, nodeId } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [nodeId]: {
            ...state.comments[nodeId],
            items: [
              ...state.comments[nodeId].items,
              comment,
            ],
          },
        }
      }
    }
    case ActionTypes.SET_COMMENTS: {
      const { items, nodeId } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [nodeId]: { loading: false, items },
        }
      }
    }
    case ActionTypes.FETCH_COMMENTS: {
      const { nodeId } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [nodeId]: { loading: true, items: [] },
        }
      }
    }
    default:
      return state
  }
}
