import Link from 'next/link';
import PropTypes from 'prop-types';

function DropDownItem({ children, href }) {
  return (
    <Link href={href}>
      <a className="px-3 py-2 hover:bg-gray-200">{children}</a>
    </Link>
  );
}

DropDownItem.propTypes = {
  href: PropTypes.string.isRequired,
};

export default DropDownItem;
