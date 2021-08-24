import SideNav from '@components/sideNav';
import { useRouter } from 'next/router';
import { useState } from 'react';

function Layout({ children }) {
  const router = useRouter();
  const [widthNav, setWidthNav] = useState('w-1/5');

  const closeSideNav = () => {
    setWidthNav('w-20');
  };

  const openSideNav = () => {
    setWidthNav('w-1/5');
  };

  if (router.pathname === '/auth') {
    return (
      <>
        <main>
          {children}
        </main>
      </>
    );
  }

  return (
    <div className="flex">
      <div className={`${widthNav} h-screen overflow-hidden sticky top-0 transition-all duration-500`}>
        <SideNav onClose={closeSideNav} onOpen={openSideNav} />
      </div>
      <div className="w-full">
        <div className="bg-na-green h-12">2</div>
        <main className="bg-na-yellow">3</main>
      </div>
    </div>
  );
}

export default Layout;
