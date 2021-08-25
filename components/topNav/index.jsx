import moment from 'moment';
import { useSession } from 'next-auth/client';
import DownArrowIcon from '@components/icon/downArrow';
import PlusIcon from '@components/icon/plus';
import { useEffect, useState } from 'react';
import DropDown from '@components/dropDown';

function TopNav() {
  const [session, loading] = useSession();
  const [dateNow, setdateNow] = useState('');
  const [activeDropDown, setActiveDropDown] = useState(false);

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
    <div className="bg-na-green h-12 text-1xl py-3 px-6 text-white flex justify-between">
      <div>
        <p>{dateNow}</p>
      </div>
      <div className="flex gap-7">
        <div className="relative">
          <button onClick={toogleDropDown} className="flex items-center">
            <PlusIcon className={`transition-transform transform ${activeDropDown ? 'rotate-45' : 'rotate-0'}`} />
            <DownArrowIcon className={`transition-transform transform ${activeDropDown ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {activeDropDown && (
            <div className="absolute top-7 -right-3 w-56 filter drop-shadow-xl">
              <DropDown />
            </div>
          )}
        </div>
        <p>{session && session.user.name}</p>
      </div>
    </div>
  );
}

export default TopNav;
