import PropTypes from 'prop-types';
import Input from '@components/input';

function TextInput({ errorMsg, id, title, isLarge, ...propsInput }) {
  if (title) {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-md text-na-black mb-1">{title}</label>
        <Input
          id={id}
          error={errorMsg !== ''}
          isLarge={isLarge}
          {...propsInput}
        />
        <p className="text-xs text-na-red">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Input
        id={id}
        error={errorMsg.length > 0}
        isLarge={isLarge}
        {...propsInput}
      />
      <p className="text-xs text-na-red">{errorMsg}</p>
    </div>
  );
}

TextInput.defaultProps = {
  errorMsg: '',
  title: null,
};

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  title: PropTypes.string,
};

export default TextInput;
