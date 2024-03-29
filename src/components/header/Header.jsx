import logo from 'src/assets/images/logo.svg';
import {
  FaCaretDown,
  FaCaretUp,
  FaRegBell,
  FaRegEnvelope,
} from 'react-icons/fa';

import './Header.scss';
import Avatar from 'src/components/avatar/Avatar';
import { useEffect, useRef, useState } from 'react';
import { Utils } from 'src/services/utils/util.service';
import useDetectOutsideClick from 'src/hooks/useDetectOutsideClick';
import MessageSidebar from 'src/components/message-sidebar/MessageSidebar';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/components/dropdown/Dropdown';
import useEffectOnce from 'src/hooks/useEffectOnce';
import { ProfileUtils } from 'src/services/utils/profile-utils.service';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'src/hooks/useLocalStorage';
import useSessionStorage from 'src/hooks/useSessionStorage';
import { userService } from 'src/services/api/user/user.service';
import HeaderSkeleton from 'src/components/header/HeaderSkeleton';
import { notificationService } from 'src/services/api/notifications/notifications.service';
import { NotificationUtils } from 'src/services/utils/notification-utils.service';
import NotificationPreview from 'src/components/dialog/NotificationPreview';
import { socketService } from 'src/services/socket/socket.service';

const Header = () => {
  const { profile } = useSelector((state) => state.user);

  const [environment, setEnvironment] = useState('');
  const [settings, setSettings] = useState([]);
  const dispatch = useDispatch();

  const messageRef = useRef(null);
  const settingsRef = useRef(null);
  const notificationRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: '',
    imgUrl: '',
    comment: '',
    reaction: '',
    senderName: '',
  });

  const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(
    messageRef,
    false
  );
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(
    notificationRef,
    false
  );
  const [isSettingActive, setIsSettingActive] = useDetectOutsideClick(
    notificationRef,
    false
  );

  const storedUsername = useLocalStorage('username', 'get');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [deleteStorageUsername] = useLocalStorage('username', 'delete');
  const [deleteSessionPageReload] = useSessionStorage('pageReload', 'delete');

  const navigate = useNavigate();

  const openChatPage = () => {};

  const onLogout = async () => {
    try {
      setLoggedIn(false);

      Utils.clearStore({
        dispatch,
        deleteStorageUsername,
        deleteSessionPageReload,
        setLoggedIn,
      });

      await userService.logoutUser();
      navigate('/');
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        'error',
        dispatch
      );
    }
  };

  const backgroundColor = `${
    environment === 'DEV' ? '#50b5ff' : environment === 'STG' ? '#e9710f' : ''
  }`;

  const getUserNotifications = async () => {
    try {
      const response = await notificationService.getUserNotifications();
      const mappedNotifications =
        NotificationUtils.mapNotificationDropdownItems(
          response.data.notifications,
          setNotificationCount
        );
      setNotifications(mappedNotifications);
      socketService?.socket.emit('setup', { userId: storedUsername });
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        'error',
        dispatch
      );
    }
  };

  const markAsRead = async (notification) => {
    try {
      NotificationUtils.markMessageAsRead(
        notification?._id,
        notification,
        setNotificationDialogContent
      );
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        'error',
        dispatch
      );
    }
  };

  const deleteNotification = async (messageId) => {
    try {
      const response = await notificationService.deleteNotification(messageId);
      Utils.dispatchNotification(response.data.message, 'success', dispatch);
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        'error',
        dispatch
      );
    }
  };

  useEffectOnce(() => {
    Utils.mapSettingsDropdownItems(setSettings);
    getUserNotifications();
  });

  useEffect(() => {
    const env = Utils.appEnvironment();

    setEnvironment(env);
  }, []);

  useEffect(() => {
    NotificationUtils.socketIONotification(
      profile,
      notifications,
      setNotifications,
      'header',
      setNotificationCount
    );
  }, [profile, notifications]);

  return (
    <>
      {!profile ? (
        <HeaderSkeleton />
      ) : (
        <div className="header-nav-wrapper" data-testid="header-wrapper">
          {isMessageActive && (
            <div ref={messageRef}>
              <MessageSidebar
                profile={profile}
                messageCount={0}
                messageNotifications={[]}
                openChatPage={openChatPage}
              />
            </div>
          )}
          {notificationDialogContent?.senderName && (
            <NotificationPreview
              title="Your post"
              post={notificationDialogContent?.post}
              imgUrl={notificationDialogContent?.imgUrl}
              comment={notificationDialogContent?.comment}
              reaction={notificationDialogContent?.reaction}
              senderName={notificationDialogContent?.senderName}
              secondButtonText="Close"
              secondBtnHandler={() => {
                setNotificationDialogContent({
                  post: '',
                  imgUrl: '',
                  comment: '',
                  reaction: '',
                  senderName: '',
                });
              }}
            />
          )}
          <div className="header-navbar">
            <div
              className="header-image"
              data-testid="header-image"
              onClick={() => navigate('/app/social/streams')}
            >
              <img src={logo} className="img-fluid" alt="" />
              <div className="app-name">
                Chatty
                {environment && (
                  <span
                    className="environment"
                    style={{ backgroundColor: `${backgroundColor}` }}
                  >
                    {environment}
                  </span>
                )}
              </div>
            </div>
            <div className="header-menu-toggle">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="header-nav">
              <li
                className="header-nav-item active-item"
                onClick={() => {
                  setIsMessageActive(false);
                  setIsNotificationActive(true);
                  setIsSettingActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegBell className="header-list-icon" />
                  {notificationCount > 0 && (
                    <span
                      className="bg-danger-dots dots"
                      data-testid="notification-dots"
                    >
                      {notificationCount}
                    </span>
                  )}
                </span>
                {isNotificationActive && (
                  <ul className="dropdown-ul" ref={notificationRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '250px', top: '20px' }}
                        data={notifications}
                        notificationCount={notificationCount}
                        title="Notifications"
                        onMarkAsRead={markAsRead}
                        onDeleteNotification={deleteNotification}
                      />
                    </li>
                  </ul>
                )}
                &nbsp;
              </li>
              <li
                className="header-nav-item active-item"
                onClick={() => {
                  setIsMessageActive(true);
                  setIsNotificationActive(false);
                  setIsSettingActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegEnvelope className="header-list-icon" />
                  <span
                    className="bg-danger-dots dots"
                    data-testid="messages-dots"
                  ></span>
                </span>
                &nbsp;
              </li>
              <li
                className="header-nav-item"
                onClick={() => {
                  setIsSettingActive(!isSettingActive);
                  setIsMessageActive(false);
                  setIsNotificationActive(false);
                }}
              >
                <span className="header-list-name profile-image">
                  <Avatar
                    name={profile?.username}
                    bgColor={profile?.avatarColor}
                    textColor="black"
                    size={40}
                    avatarSrc={profile?.profilePicture}
                  />
                </span>
                <span className="header-list-name profile-name">
                  {profile?.username}
                  {!isSettingActive ? (
                    <FaCaretDown className="header-list-icon caret" />
                  ) : (
                    <FaCaretUp className="header-list-icon caret" />
                  )}
                </span>
                {isSettingActive && (
                  <ul className="dropdown-ul" ref={settingsRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '150px', top: '40px' }}
                        data={settings}
                        notificationCount={0}
                        title="Settings"
                        onLogout={onLogout}
                        onNavigate={() =>
                          ProfileUtils.navigateToProfile(profile, navigate)
                        }
                      />
                    </li>
                  </ul>
                )}
                <ul className="dropdown-ul">
                  <li className="dropdown-li"></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
