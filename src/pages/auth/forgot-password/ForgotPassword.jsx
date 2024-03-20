import { FaArrowLeft } from 'react-icons/fa';

import Input from 'src/components/input/Input';
import Button from 'src/components/button/Button';
import backgroundImage from 'src/assets/images/background.jpg';

import './ForgotPassword.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from 'src/services/api/auth/auth.service';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleForgotPassword = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const result = await authService.forgotPassword(email);

      setResponseMessage(result?.data?.message);
      setLoading(false);
      setAlertType('alert-success');
      setEmail('');
    } catch (error) {
      setLoading(false);
      setAlertType('alert-error');
      setResponseMessage(error?.response?.data.message);
    }
  };

  return (
    <div
      className="container-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container-wrapper-auth">
        <div
          className="tabs forgot-password-tabs"
          style={{ height: `${responseMessage ? '300px' : ''}` }}
        >
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="auth-form" onSubmit={handleForgotPassword}>
                  <div className="form-input-container">
                    {/* username field */}
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      labelText="Email"
                      placeHolder="Enter Email"
                      handleChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <Button
                    label={`${
                      loading ? 'FORGOT PASSWORD IN PROGRESS.' : 'FORGOT'
                    }`}
                    className="auth-button button"
                    disabled={!email}
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
