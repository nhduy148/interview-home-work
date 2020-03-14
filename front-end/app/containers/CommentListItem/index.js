/**
 *
 * PostListComment
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';
import Name from './Name';
import Avatar from './Avatar';
import Img from '../../components/Img';
import userImage from './user-icon.png';
import DateCreated from './DateCreated';
import Content from './Content';
import ContentWrap from './ContentWrap';

function CommentListItem({ comment }) {
  // console.log(comment);

  const { name } = comment.owner;
  const dateCreate = comment.created_at;
  const commentContent = comment.content;

  const timeSince = time => {
    const currentTime = Date.now();
    const seconds = Math.floor((currentTime - time) / 1000);
    const overYear = Math.floor(seconds / 31536000);
    const overMonth = Math.floor(seconds / 2592000);
    const overDay = Math.floor(seconds / 86400);
    const overHour = Math.floor(seconds / 3600);
    const overMinutes = Math.floor(seconds / 60);
    const fullDate = new Date(time).toLocaleDateString();

    // return fullDate;
    return overYear >= 1
      ? `${overYear} years ago.`
      : overMonth >= 1
        ? `${overMonth} months ago.`
        : overDay >= 1
          ? `${overDay} days ago.`
          : overHour >= 1
            ? `${overHour} hours ago.`
            : overMinutes >= 1
              ? `${overMinutes} minutes ago.`
              : seconds >= 1
                ? `${seconds} seconds ago.`
                : seconds <= 1
                  ? `just now.`
                  : fullDate
  }

  // Put together the content of the repository
  const content = comment ? (
    <Wrapper>
      <Avatar>
        <Img src={userImage} alt={name} />
      </Avatar>
      <ContentWrap>
        <Name>
          {name}
          <DateCreated>{timeSince(dateCreate)}</DateCreated>
        </Name>
        <Content>{commentContent}</Content>
      </ContentWrap>
    </Wrapper>
  ) : (
    <Name>No comments yet.</Name>
  );

  // Render the content into a list item
  return <ListItem item={content} />;
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
};

export default CommentListItem;
