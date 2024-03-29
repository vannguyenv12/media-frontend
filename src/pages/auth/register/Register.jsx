import { FaArrowRight } from 'react-icons/fa';

import Input from 'src/components/input/Input';
import Button from 'src/components/button/Button';

import './Register.scss';
import { useEffect, useState } from 'react';
import { Utils } from 'src/services/utils/util.service';
import { authService } from 'src/services/api/auth/auth.service';
import { useNavigate } from 'react-router';
import useLocalStorage from 'src/hooks/useLocalStorage';
import useSessionStorage from 'src/hooks/useSessionStorage';
import { useDispatch } from 'react-redux';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerUser = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(
        username.charAt(0).toUpperCase(),
        avatarColor
      );

      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage,
      });

      console.log(result);

      setLoggedIn(true);
      setStoredUsername(username);

      setUser(result.data.user);
      setHasError(false);
      setAlertType('alert-success');

      Utils.dispatchUser(result, pageReload, dispatch, setUser);
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
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          {/* username field */}
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeHolder="Enter Username"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setUsername(event.target.value)}
          />

          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeHolder="Enter Email"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setEmail(event.target.value)}
          />
          {/* password field */}
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeHolder="Enter Password"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {/* button component */}
        <Button
          label={`${loading ? 'SIGN UP IN PROGRESS.' : 'SIGN UP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />

        <span className="forgot-password">
          Forgot password? <FaArrowRight className="arrow-right" />
        </span>
      </form>
    </div>
  );
};

export default Register;
