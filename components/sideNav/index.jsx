import { useRouter } from 'next/router';
import Logo from '@components/logo';
import NavItems from '@components/navItems';
import Minimize from '@components/icon/Minimize';
import Exit from '@components/icon/Exit';

export default function sideNav() {
  const router = useRouter();
  const path = router.pathname.split('/');
  return (
    <div
      id="container"
      className="bg-na-light-green w-22 h-screen pt-16 pl-12 pr-12 pb-12 flex flex-col justify-between w-1/6 items-left"
    >
      <div>
        <a href="test" className="flex justify-end mb-12">
          <Minimize />
        </a>
        <Logo />
        <div id="garis" className="bg-na-green w-22 h-1 mt-4 mb-4" />
        <NavItems text="Overview" isActive={path[0] === 'overview'} />
        <NavItems text="Projects" isActive={path[0] === 'projects'} />
        <NavItems text="Notes" isActive={path[0] === 'notes'} />
      </div>
      <div>
        <ul>
          <li>
            <a href="test" className="flex gap-3 items-center">
              <Exit />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
