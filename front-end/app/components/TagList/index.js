/**
 *
 * TagList
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Item from './Item';

function TagList({ tags }) {
  let content = <div />;
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // If we have items, render them
  if (tags) {
    content = tags.map((tag, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Item style={{ color: getRandomColor() }} key={`tag-${index}`}>
        {tag}
      </Item>
    ));
  } else {
    // Otherwise render a single component
    content = <Item />;
  }

  return <Wrapper>{content}</Wrapper>;
}

TagList.propTypes = {
  tags: PropTypes.array,
};

export default TagList;
