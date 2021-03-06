// UI Imports
import 'milligram';
import '../App.css';
import Button from '@material-ui/core/Button';

function LoginPage() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="column">
            <h1>Login Page</h1>
          </div>
        </div>
        <div className="row">
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

export default LoginPage;
