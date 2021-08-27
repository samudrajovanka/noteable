import { useRouter } from 'next/router';
import Logo from '@components/logo';
import NavItem from '@components/navItem';
import MinimizeIcon from '@components/icon/minimize';
import { signOut } from 'next-auth/client';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SideNav({ onClose, onOpen }) {
  const [isCollapse, setIsCollapse] = useState(false);
  const router = useRouter();
  const path = router.pathname.split('/');

  const toggleCollapse = () => {
    setIsCollapse((curEl) => !curEl);

    if (!isCollapse) {
      onClose();
    } else {
      onOpen();
    }
  };

  const handlerLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-na-light-green w-full h-screen py-10 px-4 flex flex-col">
      <i className={`${isCollapse && 'self-center'} self-end cursor-pointer transition-transform duration-500 ${isCollapse && 'transform rotate-180'}`} onClick={toggleCollapse}><MinimizeIcon /></i>

      <div className="mt-4 flex flex-col gap-5 h-full">
        <Logo noTitle={isCollapse} />

        <div className="h-0.5 w-full bg-na-green rounded-md" />

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-3">
            <NavItem href="/" text="Overview" isActive={router.pathname === '/'} noTitle={isCollapse} />
            <NavItem href="/" text="Projects" isActive={path[0] === 'projects'} noTitle={isCollapse} />
            <NavItem href="/" text="Notes" isActive={path[0] === 'notes'} noTitle={isCollapse} />
          </div>
          <NavItem text="Logout" onClick={handlerLogout} noTitle={isCollapse} />
        </div>
      </div>
    </nav>
  );
}

SideNav.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default SideNav;
