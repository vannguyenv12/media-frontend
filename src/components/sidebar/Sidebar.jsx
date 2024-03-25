import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { fontAwesomeIcons, sideBarItems } from 'src/services/utils/static.data';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { profile } = useSelector((state) => state.user);
  const [sidebar, setSidebar] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase());
  };

  const naviateToPage = (name, url) => {
    if (name === 'Profile') {
      url = `${url}/${profile.username}?${createSearchParams({
        id: profile?._id,
        uId: profile?.uId,
      })}`;
    }

    navigate(url);
  };

  useEffect(() => {
    setSidebar(sideBarItems);
  }, []);

  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sidebar.map((data) => (
            <li
              key={data.index}
              onClick={() => naviateToPage(data.name, data.url)}
            >
              <div
                className={`sidebar-link ${
                  checkUrl(data.name) ? 'active' : ''
                }`}
              >
                <div className="menu-icon">
                  {fontAwesomeIcons[data.iconName]}
                </div>
                <div className="menu-link">
                  <span>{`${data.name}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
