import Link from 'next/link';
import PropTypes from 'prop-types';

function Button({ children, type, color, typeButton, onClick, href, disabled }) {
  let classNameButton;
  if (type === 'primary') {
    if (color === 'success') {
      classNameButton = 'bg-na-green text-white hover:bg-green-500';
    } else if (color === 'warning') {
      classNameButton = 'bg-na-yellow text-white hover:bg-yellow-500';
    } else if (color === 'danger') {
      classNameButton = 'bg-na-red text-white hover:bg-red-500';
    }
  } else if (type === 'secondary') {
    if (color === 'success') {
      classNameButton = 'bg-white text-na-green border border-na-green hover:bg-gray-100';
    }
  }

  let cursor = '';
  if (disabled) {
    cursor = 'cursor-not-allowed';
  }

  if (href) {
    return (
      <Link href={href}>
        <a className={`${classNameButton} text-center inline-block py-2 px-6 rounded-md`}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={typeButton}
      className={`${classNameButton} py-2 px-6 rounded-md ${cursor}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  typeButton: 'button',
  onClick: () => {},
  href: null,
  type: 'primary',
  color: 'success',
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  typeButton: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
