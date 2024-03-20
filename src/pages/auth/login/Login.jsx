import { FaArrowRight } from 'react-icons/fa';

import Input from 'src/components/input/Input';
import Button from 'src/components/button/Button';
import { Link, useNavigate } from 'react-router-dom';

import './Login.scss';
import { useEffect, useState } from 'react';
import { authService } from 'src/services/api/auth/auth.service';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const result = await authService.signIn({ username, password });
      console.log(result);
      setKeepLoggedIn(keepLoggedIn);
      setUser(result.data.user);
      setHasError(false);
      alertType('alert-success');
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) navigate('/app/social/streams');
  }, [loading, user, navigate]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={loginUser}>
        <div className="form-input-container">
          {/* username field */}
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeHolder="Enter Username"
            handleChange={(event) => setUsername(event.target.value)}
          />
          {/* password field */}
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeHolder="Enter Password"
            handleChange={(event) => setPassword(event.target.value)}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              value={keepLoggedIn}
              handleChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            Keep me signed in
          </label>
        </div>
        {/* button component */}
        <Button
          label={`${loading ? 'SIGNIN IN PROGRESS.' : 'SIGN IN'}`}
          className="auth-button button"
          disabled={!username || !password}
        />

        <Link to={'/forgot-password'}>
          <span className="forgot-password">
            Forgot password? <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
