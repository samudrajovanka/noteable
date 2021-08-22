import PropTypes from 'prop-types';
import Input from '@components/input';

function TextInput({ type, title, placeholder, id, value, onChange, required }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-md text-na-black mb-1">{title}</label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

TextInput.defaultProps = {
  required: false,
};

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default TextInput;
