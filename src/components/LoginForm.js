import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control
            id='username'
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            id='password'
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br/>
          <Button variant="primary" id='login-button' type="submit">login</Button>
        </Form.Group>
      </Form>
      <br/>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm