import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import CommentListItem from 'containers/CommentListItem';

function CommentList({ comments }) {
  if (comments.length <= 0) {
    const ErrorComponent = () => (
      <ListItem post="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }
  return <List comments={comments} component={CommentListItem} />;
}

CommentList.propTypes = {
  comments: PropTypes.any,
};

export default CommentList;
