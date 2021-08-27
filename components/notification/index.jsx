import NotificationContext from '@context/notification-context';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import CrossIcon from '@components/icon/cross';
import Image from 'next/image';

function Notification({ className }) {
  const notificationCtx = useContext(NotificationContext);
  const { title, status } = notificationCtx.notification;
  const { isShow } = notificationCtx;

  let background = '';
  let backgroundCross = '';
  if (status === 'success') {
    background = 'border border-na-green text-na-green bg-green-100';
    backgroundCross = 'fill-current text-na-green';
  } else if (status === 'pending') {
    background = 'border border-blue-500 text-blue-500 bg-blue-100';
  } else if (status === 'error') {
    background = 'border border-na-red text-na-red bg-red-100';
    backgroundCross = 'fill-current text-na-red';
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
    <div className={`${background} ${displayShow} flex justify-between items-center p-2 rounded w-full ${className}`}>
      {title}
      {status === 'pending' && (
        <Image
          src="/images/loading.svg"
          alt="loading"
          width="20"
          height="20"
        />
      )}
      {status !== 'pending' && (
        <div className="cursor-pointer" onClick={handleClose}>
          <CrossIcon className={`${backgroundCross}`} />
        </div>
      )}
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
