import { Outlet } from 'react-router-dom';

import './Socials.scss';
import Header from 'src/components/header/Header';
import Sidebar from 'src/components/sidebar/Sidebar';
const Social = () => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Social;
