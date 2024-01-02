import { ReactNode } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};
