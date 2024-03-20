import './ResetPassword.scss';
import backgroundImage from 'src/assets/images/background.jpg';
import Input from 'src/components/input/Input';
import Button from 'src/components/button/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { authService } from 'src/services/api/auth/auth.service';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [searchParams] = useSearchParams();

  const handleResetPassword = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const body = { password, confirmPassword };
      const token = searchParams.get('token');

      const result = await authService.resetPassword(token, body);

      setResponseMessage(result?.data?.message);
      setLoading(false);
      setAlertType('alert-success');
      setPassword('');
      setConfirmPassword('');
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
          className="tabs reset-password-tabs"
          style={{ height: `${responseMessage ? '400px' : ''}` }}
        >
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form
                  className="reset-password-form"
                  onSubmit={handleResetPassword}
                >
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      labelText="New Password"
                      placeholder="New Password"
                      handleChange={(event) => setPassword(event.target.value)}
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={confirmPassword}
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      handleChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                  </div>

                  <Button
                    label={`${
                      loading ? 'RESET PASSWORD IN PROGRESS.' : 'RESET'
                    }`}
                    className="auth-button button"
                    disabled={!password || !confirmPassword}
                  />

                  <Link to={'/'}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> Back to Login
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

export default ResetPassword;
