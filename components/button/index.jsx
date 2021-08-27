import Link from 'next/link';
import PropTypes from 'prop-types';

function Button({ children, type, color, typeButton, onClick, href }) {
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

  if (href) {
    return (
      <Link href={href}>
        <a className={`${classNameButton} inline-block py-2 px-6 rounded-md`}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={typeButton}
      className={`${classNameButton} py-2 px-6 rounded-md`}
      onClick={onClick}
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
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  typeButton: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

export default Button;
