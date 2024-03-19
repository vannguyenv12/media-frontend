import { FaArrowLeft } from 'react-icons/fa';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import backgroundImage from '../../../assets/images/background.jpg';

import './ForgotPassword.scss';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  return (
    <div
      className="container-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {/* <div className="alerts alert-error" role="alert">
                  Error message
                </div> */}
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
                  </div>
                  <Button
                    label={'LOGIN'}
                    className="auth-button button"
                    disabled={true}
                  />

                  <Link to={'/'}>
                    <span className="forgot-password">
                      <FaArrowLeft className="arrow-right" />
                      back to login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
