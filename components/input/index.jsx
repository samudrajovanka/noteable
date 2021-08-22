import PropTypes from 'prop-types';

function Input({ type, placeholder, id, value, onChange, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      className="border rounded-md p-2 placeholder-na-gray::placeholder
        focus:outline-none focus:border-na-green transition-colors"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

Input.defaultProps = {
  required: false,
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Input;
