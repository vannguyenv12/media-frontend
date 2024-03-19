import { FaArrowRight } from 'react-icons/fa';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { Link } from 'react-router-dom';

import './Login.scss';
const Login = () => {
  return (
    <div className="auth-inner">
      <div className="alerts alert-error" role="alert">
        Error message
      </div>
      <form className="auth-form">
        <div className="form-input-container">
          {/* username field */}
          <Input
            id="username"
            name="username"
            type="text"
            value="MY VALUE"
            labelText="Username"
            placeHolder="Enter Username"
            handleChange={() => {}}
          />
          {/* password field */}
          <Input
            id="password"
            name="password"
            type="password"
            value="MY PASSWORD"
            labelText="Password"
            placeHolder="Enter Password"
            handleChange={() => {}}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              value={false}
              handleChange={() => {}}
            />
            Keep me signed in
          </label>
        </div>
        {/* button component */}
        <Button
          label={'LOGIN'}
          className="auth-button button"
          disabled={true}
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
