import PropTypes from 'prop-types';
import Input from '@components/input';

function TextInput({ errorMsg, id, title, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-md text-na-black mb-1">{title}</label>
      <Input
        id={id}
        error={errorMsg && true}
        {...props}
      />
      <p className="text-xs text-na-red">{errorMsg}</p>
    </div>
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
