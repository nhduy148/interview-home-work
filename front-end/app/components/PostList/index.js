import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import PostListItem from 'containers/PostListItem';

function PostList({ loading, error, posts }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem post="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (posts !== false) {
    return <List posts={posts} component={PostListItem} />;
  }

  return null;
}

PostList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  posts: PropTypes.any,
};

export default PostList;
