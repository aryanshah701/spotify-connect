import React from 'react';
import Button from '@material-ui/core/Button';

export default function Login(props) {
  const { url } = props;

  return (
    <div>
      <div id="login-page" className="container">
        <div className="row">
          <div className="column">
            <h1>Login Page</h1>
          </div>
        </div>
        <div className="row" id="login-button">
          <div className="column">
            <Button
              onClick={() => (window.location.href = URL)}
              size="large"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
