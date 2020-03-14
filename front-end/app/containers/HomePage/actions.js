/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LOAD_MORE_POSTS,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_ERROR,
} from './constants';

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function postsLoaded(posts) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
  };
}

export function postLoadingError(error) {
  return {
    type: LOAD_POSTS_ERROR,
    error,
  };
}

export function loadMorePosts() {
  return {
    type: LOAD_MORE_POSTS,
  };
}

export function morePostsLoaded(postsMore) {
  return {
    type: LOAD_MORE_POSTS_SUCCESS,
    postsMore,
  };
}

export function morePostLoadingError(error) {
  return {
    type: LOAD_MORE_POSTS_ERROR,
    error,
  };
}
