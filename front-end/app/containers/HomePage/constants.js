/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_POSTS = 'boilerplate/Home/LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'boilerplate/Home/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'boilerplate/Home/LOAD_POSTS_ERROR';
export const LOAD_MORE_POSTS = 'boilerplate/Home/LOAD_MORE_POSTS';
export const LOAD_MORE_POSTS_SUCCESS =
  'boilerplate/Home/LOAD_MORE_POSTS_SUCCESS';
export const LOAD_MORE_POSTS_ERROR = 'boilerplate/Home/LOAD_MORE_POSTS_ERROR';
