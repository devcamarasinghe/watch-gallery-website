// src/utils/toast.js
import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => toast.success(message, {
    style: {
      borderRadius: '20px',
      background: '#333',
      color: '#fff',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#4BB543',
    },
  }),

  error: (message) => toast.error(message, {
    style: {
      borderRadius: '20px',
      background: '#D22B2B',
      color: '#fff',
    },
  }),

  promise: (promise, messages) => toast.promise(promise, messages),

  loading: (message) => toast.loading(message),

  dismiss: () => toast.dismiss(),
};