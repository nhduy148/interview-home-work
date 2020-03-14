import React from 'react';
import PropTypes from 'prop-types';

import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;

  let content = <div />;

  // If we have posts, render them
  if (props.posts) {
    content = props.posts.map(post => (
      <ComponentToRender key={`post-${post.id}`} post={post} />
    ));
  } else if (props.comments) {
    content = props.comments.map(post => (
      <ComponentToRender key={`comment-${post.id}`} comment={post} />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  posts: PropTypes.array,
  comments: PropTypes.array,
};

export default List;
