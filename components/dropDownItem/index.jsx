import Link from 'next/link';
import PropTypes from 'prop-types';

function DropDownItem({ children, href, onClick }) {
  return (
    <Link href={href}>
      <a className="px-3 py-2 hover:bg-gray-200" onClick={onClick}>{children}</a>
    </Link>
  );
}

DropDownItem.defaultProps = {
  onClick: () => {},
};

DropDownItem.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DropDownItem;
