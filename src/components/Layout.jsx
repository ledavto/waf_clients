import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <>
      <header className="nav nav-pills nav-fill d-flex justify-content-between container w-50 ">
        <NavBar />
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
    </>
  );
};
