import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button } from 'reactstrap';
import Widget from '../../../components/Widget';
import { loginUser, receiveToken, doInit } from 'store/actions/authActions';
import jwt from 'jsonwebtoken';
import microsoft from '../../../images/microsoft.png';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('admin@flatlogic.com');
  const [password, setPassword] = useState('password');

  const location = useLocation();

  const dispatch = useDispatch();
  const authStore = useSelector((store) => store.auth);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const doLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const googleLogin = () => {
    dispatch(loginUser({ social: 'google' }));
  };

  const microsoftLogin = () => {
    dispatch(loginUser({ social: 'microsoft' }));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      dispatch(receiveToken(token));
      dispatch(doInit());
    }
  }, [dispatch, location.search]);

  const signUp = () => {
    dispatch(push('/register'));
  };

  return (
    <div className="auth-page">
      <Container>
        <h5 className="auth-logo">
          <i className="la la-circle text-primary" />
          react
          <i className="la la-circle text-danger" />
        </h5>
        <Widget
          className="widget-auth mx-auto"
          title={<h3 className="mt-0">Login to your Web App</h3>}
        >
          <p className="widget-auth-info">Use your email to sign in.</p>
          <Alert className="alert-sm text-center mt-2" color="secondary">
            For user with "admin" role use
            <br />
            <span className="font-weight-bold">"admin@flatlogic.com / password"</span>
            <br />
            to login!
          </Alert>
          <form className="mt" onSubmit={doLogin}>
            {authStore.errorMessage && (
              <Alert className="alert-sm" color="danger">
                {authStore.errorMessage}
              </Alert>
            )}
            <div className="form-group">
              <input
                className="form-control no-border"
                value={email}
                onChange={changeEmail}
                type="email"
                required
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-0">
              <input
                className="form-control no-border"
                value={password}
                onChange={changePassword}
                type="password"
                required
                name="password"
                placeholder="Password"
              />
            </div>
            <Link className="d-block text-right mb-3 mt-1 fs-sm" to="forgot">
              Forgot password?
            </Link>
            <Button type="submit" color="info" className="auth-btn mb-3" size="sm">
              {authStore.isFetching ? 'Loading...' : 'Login'}
            </Button>
            <p className="widget-auth-info">or sign in with</p>
            <div className="social-buttons">
              <Button onClick={googleLogin} color="primary" className="social-button mb-2">
                <i className="social-icon social-google" />
                <p className="social-text">GOOGLE</p>
              </Button>
              <Button onClick={microsoftLogin} color="success" className="social-button">
                <i
                  className="social-icon social-microsoft"
                  style={{ backgroundImage: `url(${microsoft})` }}
                />
                <p className="social-text">MICROSOFT</p>
              </Button>
            </div>
          </form>
          <p className="widget-auth-info">Don't have an account? Sign up now!</p>
          <Link className="d-block text-center" to="register">
            Create an Account
          </Link>
        </Widget>
      </Container>
      <footer className="auth-footer">{new Date().getFullYear()} &copy; MedicationTracker.</footer>
    </div>
  );
};

Login.isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = jwt.decode(token);
  if (!data) return;
  return date < data.exp;
};

export default Login;
