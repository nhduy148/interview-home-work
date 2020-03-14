import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import A from './A';
import SytleHeader from './StyleHeader';
import Logo from './Logo';
import BlogName from './BlogName';
import AuthenArea from '../AuthenArea';
import WrapAvatar from '../AuthenArea/WrapAvatar';
import Avatar from '../AuthenArea/Avatar';

function Header() {
  return (
    <SytleHeader>
      <Container>
        <Row className="justify-content-between">
          <Col md={4}>
            <A href="/">
              <Logo>Logo</Logo>
            </A>
          </Col>
          <Col md={3}>
            <A href="/">
              <BlogName>Blogs</BlogName>
            </A>
          </Col>
          <Col md={4}>
            <AuthenArea />
          </Col>
        </Row>
      </Container>
    </SytleHeader>
  );
}

export default Header;
