import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-primary-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type] || 'bg-primary-500';

  const icon = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  }[type] || 'fa-circle-info';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 animate-slide-up z-50 max-w-md`}>
      <i className={`fa-solid ${icon} text-xl`}></i>
      <p className="flex-1">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <i className="fa-solid fa-times"></i>
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  duration: PropTypes.number,
};

export default Toast;