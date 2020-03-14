/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => {
  return state.home || initialState;
}

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

const makeSelectPosts = () =>
  createSelector(
    selectHome,
    homeState => homeState.posts,
  );

const makeSelectPostInfo = () =>
  createSelector(
    selectHome,
    homeState => {
      const { postData } = homeState;
      delete postData.result;
      return postData;
    },
  );

export {
  selectHome,
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
  makeSelectPostInfo,
};
