import Link from 'next/link';
import PropTypes from 'prop-types';
import ExitIcon from '@components/icon/exit';
import ProjectIcon from '@components/icon/projects';
import NoteIcon from '@components/icon/notes';
import OverviewIcon from '@components/icon/overview';
import style from './style.module.css';

function NavItem({ text, isActive, href, noTitle, onClick }) {
  let icon;
  let styleIcon = 'text-na-gray';
  let backgroundColor = 'text-na-gray';
  let hiddenTitleClass = 'w-full';
  let container = 'gap-2';

  if (isActive) {
    styleIcon = 'text-white';
    backgroundColor = 'bg-na-green text-white';
  }

  if (noTitle) {
    hiddenTitleClass = 'w-0 overflow-hidden';
    container = 'gap-0';
    styleIcon += ' text-3xl';
  }

  if (text === 'Overview') {
    icon = <OverviewIcon className={`${styleIcon} ${style.icon} `} />;
  } else if (text === 'Projects') {
    icon = <ProjectIcon className={`${styleIcon} ${style.icon}`} />;
  } else if (text === 'Notes') {
    icon = <NoteIcon className={`${styleIcon} ${style.icon} `} />;
  } else if (text === 'Logout') {
    icon = <ExitIcon className={`${styleIcon} ${style.icon} `} />;
  }

  if (href) {
    return (
      <Link href={href}>
        <a className={`${backgroundColor} flex items-center ${container} py-2 px-3 rounded-full hover:text-white hover:bg-na-green ${style.container}`}>
          {icon}
          <p className={`inline-block ${hiddenTitleClass} ${style.title}`}>{text}</p>
        </a>
      </Link>
    );
  }

  return (
    <button
      className={`flex items-center ${container} py-2 px-3 rounded-full text-na-gray hover:text-white hover:bg-na-green ${style.container}`}
      onClick={onClick}
    >
      {icon}
      <p className={`inline-block ${hiddenTitleClass} ${style.title}`}>{text}</p>
    </button>
  );
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NavItem;
