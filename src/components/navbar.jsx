'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import Image from 'next/image';
import { navbarLinks } from '@/data/constData';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';

import NavbarMobile from './NavbarMobile';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <ul className={styles.list}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src="images/logo.svg" width={40} height={40} alt="logo" />
            </Link>
            <h2>JsCase</h2>
          </div>

          <div className={styles.menu}>
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            {/* Menu links start */}
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  <Link className={styles.link} href={link.url}>
                    {link.title}
                  </Link>
                </li>
              );
            })}
            {/* Menu links end */}
            <button
              className="button-main"
              onClick={() => console.log('logout')}
            >
              Logout
            </button>
          </div>
          {/* Navbar mobile */}
          <NavbarMobile />
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
