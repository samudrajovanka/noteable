import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: { title: '', status: '' },
  isShow: false,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState({ title: '', status: '' });
  const [isShowNotification, setIsShowNotification] = useState(false);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
    setIsShowNotification(true);
  }

  function hideNotificationHandler() {
    setActiveNotification({ title: '', status: '' });
    setIsShowNotification(false);
  }

  const context = {
    notification: activeNotification,
    isShow: isShowNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
