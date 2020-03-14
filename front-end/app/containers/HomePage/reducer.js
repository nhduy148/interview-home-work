/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LOAD_MORE_POSTS,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  limit: 10,
  postData: {},
  posts: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.posts = action.posts.result;
        draft.postData = action.posts;
        break;
      case LOAD_POSTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case LOAD_MORE_POSTS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_MORE_POSTS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.postsMore = action.postsMore.result;
        draft.postData = action.posts;
        break;
      case LOAD_MORE_POSTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default homeReducer;
