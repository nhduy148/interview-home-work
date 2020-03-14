/* eslint-disable no-nested-ternary */
/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import TagList from 'components/TagList';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import Wrapper from './Wrapper';
import Title from './Title';
import Author from './Author';
import DateCreated from './DateCreated';
import A from '../../components/Header/A';
import Summary from './Summary';
import CommentList from '../../components/CommentList';

export function PostListItem(props) {
  const { post } = props;
  const authorName = post.owner.name;
  const dateCreated = new Date(post.created_at).toDateString();
  const { tags, comments } = post;
  const totalComments = comments.length;
  const [open, setOpen] = useState(false);

  // Put together the content of the repository
  const content = (
    <Wrapper>
      <A href={`post/${post.id}`}>
        <Title>{post.title}</Title>
      </A>
      <Container>
        <Row className="justify-content-between">
          <Col md={6} xs={12}>
            <Author>Author: {authorName}</Author>
            <DateCreated>Created at: {dateCreated}</DateCreated>
          </Col>
          <Col md={4} xs={12}>
            <TagList tags={tags} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Summary>{post.excerpt}</Summary>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="view-comments"
              aria-expanded={open}
              variant="link"
            >
              {totalComments === 1
                ? `${totalComments} reply`
                : totalComments > 1
                  ? `${totalComments} replies`
                  : '0 reply'
              }
            </Button>
            {
              totalComments >= 1
              ?
                <Collapse in={open}>
                  <div id="view-comments">
                    <CommentList comments={comments} />
                  </div>
                </Collapse>
              : ""
            }
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );

  // Render the content into a list item
  return <ListItem item={content} />;
}

PostListItem.propTypes = {
  post: PropTypes.object,
  // currentUser: PropTypes.string,
};

export default PostListItem;
