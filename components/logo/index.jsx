import NoteableIcon from '@components/icon/noteable';
import PropTypes from 'prop-types';

function Logo({ noTitle }) {
  let hiddenTitleClass = 'w-full';
  let container = 'gap-2';

  if (noTitle) {
    hiddenTitleClass = 'w-0 overflow-hidden';
    container = '';
  }

  return (
    <div className={`flex items-center ${container}`}>
      <NoteableIcon />
      <p className={`text-xl font-bold text-na-green transition-all duration-500 inline-block ${hiddenTitleClass}`}>Noteable</p>
    </div>
  );
}

Logo.defaultProps = {
  noTitle: false,
};

Logo.propTypes = {
  noTitle: PropTypes.bool,
};

export default Logo;
