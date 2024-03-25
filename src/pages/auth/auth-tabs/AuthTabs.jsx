import backgroundImage from 'src/assets/images/background.jpg';
import { useEffect, useState } from 'react';

import './AuthTabs.scss';
import { Login, Register } from 'src/pages/auth/index';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { Utils } from 'src/services/utils/util.service';

const AuthTabs = () => {
  const [type, setType] = useState('Sign In');
  const keepLoggedIn = useLocalStorage('keepLoggedIn', 'get');
  const [environment, setEnvironment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const env = Utils.appEnvironment();
    setEnvironment(env);

    if (keepLoggedIn) navigate('/app/social/streams');
  }, [keepLoggedIn, navigate]);

  return (
    <>
      <div
        className="container-wrapper"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="environment">{environment}</div>
        <div className="container-wrapper-auth">
          <div className="tabs">
            <div className="tabs-auth">
              <ul className="tab-group">
                <li
                  className={`tab ${type === 'Sign In' ? 'active' : ''}`}
                  onClick={() => setType('Sign In')}
                >
                  <button className="login">Sign In</button>
                </li>
                <li
                  className={`tab ${type === 'Sign Up' ? 'active' : ''}`}
                  onClick={() => setType('Sign Up')}
                >
                  <button className="signup">Sign Up</button>
                </li>
              </ul>
              {type === 'Sign In' && (
                <div className="tab-item">
                  <Login />
                </div>
              )}

              {type === 'Sign Up' && (
                <div className="tab-item">
                  <Register />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthTabs;
