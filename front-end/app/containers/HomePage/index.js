/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectPosts,
  makeSelectPostInfo,
  makeSelectLoading,
  makeSelectError,
} from 'containers/HomePage/selectors';
import PostList from 'components/PostList';
import Section from './Section';
import { loadPosts } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({ loading, error, posts, postData, actionLoadPosts }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    actionLoadPosts();
  }, []);

  useEffect(() => {
    const infiniteScrolling = () => {
      const scrolling = window.scrollY + window.innerHeight;
      console.log(scrolling);
    };
    window.addEventListener("scroll", infiniteScrolling);

    return () => window.removeEventListener("scroll", infiniteScrolling);
  }, []);

  const postsListProps = {
    loading,
    error,
    posts,
  };

  // console.log(postsListProps);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Section>
          <PostList {...postsListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.any,
  actionLoadPosts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  postData: makeSelectPostInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actionLoadPosts: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadPosts());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
