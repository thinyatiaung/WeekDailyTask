import { create } from 'zustand';

interface Notification {
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

interface NotificationStore {
  notification: Notification | null;
  setNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
  clearNotification: () => set({ notification: null }),
}));
