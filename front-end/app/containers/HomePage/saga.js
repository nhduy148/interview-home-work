/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { postsLoaded, postLoadingError } from 'containers/HomePage/actions';
import {LOAD_POSTS, LOAD_MORE_POSTS} from 'containers/HomePage/constants';
import request from 'utils/request';
import { makeSelectPostInfo } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */

export function* getPosts() {
  let {limit, page, has_next_page, next_page} = yield select(makeSelectPostInfo());
  limit = limit || 1;
  page = page || 1;
  next_page = next_page || page;

  // Select username from store
  const requestURL = `http://localhost:5003/post?limit=${limit}&page=${page}`;

  try {
    // Call our request helper (see 'utils/request')
    const post = yield call(request, requestURL);
    yield put(postsLoaded(post));
  } catch (err) {
    yield put(postLoadingError(err));
  }
}

export function* getMorePosts() {
  // Select username from store
  const requestURL = `http://localhost:5003/post?limit=10`;

  try {
    // Call our request helper (see 'utils/request')
    const post = yield call(request, requestURL);
    yield put(postsLoaded(post));
  } catch (err) {
    yield put(postLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSaga() {
  yield all([
    takeLatest(LOAD_POSTS, getPosts),
    takeLatest(LOAD_MORE_POSTS, getMorePosts),
  ]);
}
