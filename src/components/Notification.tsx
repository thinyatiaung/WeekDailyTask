import { useNotificationStore } from '@store/useNotification';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const Notification: React.FC = () => {
  const { notification, clearNotification } = useNotificationStore();

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        clearNotification();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [notification, clearNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
      <Alert show={true} variant={notification.variant} dismissible>
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
