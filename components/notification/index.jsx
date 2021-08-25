import NotificationContext from '@context/notification-context';
import { useContext } from 'react';
import PropTypes from 'prop-types';

function Notification({ className }) {
  const notificationCtx = useContext(NotificationContext);
  const { title, status } = notificationCtx.notification;
  const { isShow } = notificationCtx;

  let background = '';
  if (status === 'success') {
    background = 'bg-na-green text-white';
  } else if (status === 'pending') {
    background = 'bg-blue-300 text-white';
  } else if (status === 'error') {
    background = 'bg-na-red text-white';
  }

  let displayShow = '';
  if (isShow) {
    displayShow = 'inline-block';
  } else {
    displayShow = 'hidden';
  }

  const handleClose = () => {
    if (status !== 'pending') {
      notificationCtx.hideNotification();
    }
  };

  return (
    <div className={`${background} ${displayShow} p-2 rounded w-full ${className}`} onClick={handleClose}>
      {title}
    </div>
  );
}

Notification.defaultProps = {
  className: null,
};

Notification.propTypes = {
  className: PropTypes.string,
};

export default Notification;
