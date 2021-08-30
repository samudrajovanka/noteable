import moment from 'moment';
import { useSession } from 'next-auth/client';
import DownArrowIcon from '@components/icon/downArrow';
import PlusIcon from '@components/icon/plus';
import { useEffect, useRef, useState } from 'react';
import DropDown from '@components/dropDown';
import DropDownItem from '@components/dropDownItem';

function TopNav() {
  const [session, loading] = useSession();
  const [dateNow, setdateNow] = useState('');
  const [activeDropDown, setActiveDropDown] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    if (!activeDropDown) return;

    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setActiveDropDown(false);
      }
    }

    window.addEventListener('click', handleClick);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [activeDropDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = moment().format('ddd, DD MMMM YYYY');
      setdateNow(date);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const toogleDropDown = () => {
    setActiveDropDown((currentEl) => !currentEl);
  };

  return (
    <div className="bg-na-green h-12 text-1xl py-3 px-6 text-white flex justify-between sticky top-0">
      <div>
        <p>{dateNow}</p>
      </div>
      <div className="flex gap-7">
        <div className="relative">
          <button
            className="flex items-center"
            onClick={toogleDropDown}
            tabIndex="0"
          >
            <PlusIcon className="transition-transform transform" />
            <DownArrowIcon className={`transition-transform transform ${activeDropDown ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          <div
            className={`absolute top-7 -right-3 w-56 filter drop-shadow-xl ${activeDropDown ? 'inline-block' : 'hidden'}`}
            ref={dropdown}
          >
            <DropDown>
              <DropDownItem href="/" onClick={toogleDropDown}>New project</DropDownItem>
              <DropDownItem href="/notes/create" onClick={toogleDropDown}>New note</DropDownItem>
            </DropDown>
          </div>
        </div>
        <p>{session && session.user.name}</p>
      </div>
    </div>
  );
}

export default TopNav;
