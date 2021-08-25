import PropTypes from 'prop-types';

function Input({ error, ...props }) {
  let borderColor = 'focus:border-na-green';
  if (error) {
    borderColor = 'border-na-red';
  }

  return (
    <input
      className={`border ${borderColor} rounded-md p-2 placeholder-na-gray::placeholder
        focus:outline-none transition-colors`}
      {...props}
    />
  );
}

Input.defaultProps = {
  error: null,
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
