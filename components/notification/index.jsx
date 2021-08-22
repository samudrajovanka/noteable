import NotificationContext from '@context/notification-context';
import { useContext } from 'react';

function Notification({ className }) {
  const notificationCtx = useContext(NotificationContext);
  const { title, status } = notificationCtx.notification;
  let background = '';

  if (status === 'success') {
    background = 'bg-na-gren text-white';
  } else if (status === 'pending') {
    background = 'bg-blue-300 text-white';
  } else if (status === 'error') {
    background = 'bg-na-red text-white';
  }

  return (
    <div className={`${background} p-2 rounded ${className}`} onClick={notificationCtx.hideNotification}>
      {title}
    </div>
  );
}

export default Notification;
