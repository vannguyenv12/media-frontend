import Avatar from 'src/components/avatar/Avatar';
import { FaCircle, FaRegCircle, FaRegTrashAlt } from 'react-icons/fa';

import './Notifications.scss';
import { useEffect, useState } from 'react';
import { Utils } from 'src/services/utils/util.service';
import { useDispatch, useSelector } from 'react-redux';
import { notificationService } from 'src/services/api/notifications/notifications.service';
import useEffectOnce from 'src/hooks/useEffectOnce';
import { NotificationUtils } from 'src/services/utils/notification-utils.service';
import NotificationPreview from 'src/components/dialog/NotificationPreview';
const Notifications = () => {
  const { profile } = useSelector((state) => state.user);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: '',
    imgUrl: '',
    comment: '',
    reaction: '',
    senderName: '',
  });

  const dispatch = useDispatch();

  const getUserNotifications = async () => {
    try {
      const response = await notificationService.getUserNotifications();
      setNotifications(response.data.notifications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const deleteNotification = async (event, messageId) => {
    event.stopPropagation();
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
    getUserNotifications();
  });

  useEffect(() => {
    NotificationUtils.socketIONotification(
      profile,
      notifications,
      setNotifications,
      'notificationPage'
    );
  }, [profile, notifications]);

  return (
    <>
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
      <div className="notifications-container">
        <div className="notifications">Notifications</div>
        {notifications.length > 0 && (
          <div className="notifications-box">
            {notifications.map((notification, index) => (
              <div
                className="notification-box"
                data-testid="notification-box"
                key={index}
                onClick={() => markAsRead(notification)}
              >
                <div className="notification-box-sub-card">
                  <div className="notification-box-sub-card-media">
                    <div className="notification-box-sub-card-media-image-icon">
                      <Avatar
                        name={notification?.userFrom?.username}
                        bgColor={notification?.userFrom?.avatarColor}
                        textColor="#ffffff"
                        size={40}
                        avatarSrc={notification?.userFrom?.profilePicture}
                      />
                    </div>
                    <div className="notification-box-sub-card-media-body">
                      <h6 className="title">
                        {notification?.message}
                        <small
                          data-testid="subtitle"
                          className="subtitle"
                          onClick={(event) =>
                            deleteNotification(event, notification?._id)
                          }
                        >
                          <FaRegTrashAlt className="trash" />
                        </small>
                      </h6>
                      <div className="subtitle-body">
                        <small className="subtitle">
                          {!notification?.read ? (
                            <FaCircle className="icon" />
                          ) : (
                            <FaRegCircle className="icon" />
                          )}
                        </small>
                        <p className="subtext">1 hr ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && !notifications.length && (
          <div className="notifications-box"></div>
        )}
        {!loading && !notifications.length && (
          <h3 className="empty-page" data-testid="empty-page">
            You have no notification
          </h3>
        )}
      </div>
    </>
  );
};

export default Notifications;
