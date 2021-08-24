import Overview from '@components/icon/Overview';
import Notes from '@components/icon/Notes';
import Projects from '@components/icon/Projects';

export default function NavItems({ text, isActive }) {
  let icon;
  let colorIcon;
  let backgroundColor = 'text-na-gray';
  if (isActive) {
    colorIcon = 'white';
    backgroundColor = 'bg-na-green text-white';
  }
  if (text === 'Overview') {
    icon = <Overview color={colorIcon} />;
  } else if (text === 'Projects') {
    icon = <Projects color={colorIcon} />;
  } else if (text === 'Notes') {
    icon = <Notes color={colorIcon} />;
  }
  return (
    <div>
      <a
        href="Test"
        className={`${backgroundColor} flex items-center gap-3 text-xl p-2 pl-2 pr-4 rounded-full text-white mb-4`}
      >
        {icon}
        {text}
      </a>
    </div>
  );
}
