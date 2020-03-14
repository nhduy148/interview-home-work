/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LoginForm(props) {
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" type="reset" style={{ marginLeft: 10 }}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

LoginForm.propTypes = {};

export default memo(LoginForm);
