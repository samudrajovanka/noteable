import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Button({ children, type, color, typeButton, onClick }) {
  const [classNameButton, setClassNameButton] = useState('');

  useEffect(() => {
    if (type === 'primary') {
      if (color === 'success') {
        setClassNameButton('bg-na-green text-white hover:bg-green-500');
      }
    } else if (type === 'secondary') {
      if (color === 'success') {
        setClassNameButton('bg-white text-na-green border border-na-green');
      }
    }
  }, []);

  return (
    <button
      type={typeButton}
      className={`${classNameButton} py-2 rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  typeButton: 'button',
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  typeButton: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
