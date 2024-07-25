import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { Link, Eye, UserCircle } from 'phosphor-react';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='container d-flex justify-content-between mx-auto bg-white p-3 mb-4'>
      <div className='d-none d-md-block'>
        <Image src='/images/logo.png' className='img-fluid' alt='Logo' width={184} height={40} />
      </div>
      <div className='d-block d-md-none'>
        <Image src='/images/logosm.png' className='me-3 mt-2' alt='Logo' width={32} height={32} />
      </div>
      <div className='d-flex me-md-5'>
        <div className={`${pathname === '/dashboard' ? styles.active : styles.navBack} pt-2  me-md-0`}>
          <NextLink 
            href='/dashboard'  
            className={`${pathname === '/dashboard' ? styles.activeLink : styles.navBack} d-flex align-items-center`} 
            style={{ textDecoration: 'none' }} 
            passHref
          >
            <Link size={16} />
            <span className='d-none d-md-inline ms-2'>Link</span>
          </NextLink>
        </div>
        <div className={`${pathname === '/profile-details' ? styles.active : styles.navBack} pt-2 me-0 me-md-0`}>
          <NextLink 
            href='/profile-details' 
            className={`${pathname === '/profile-details' ? styles.activeLink : styles.navBack} d-flex align-items-center`} 
            style={{ textDecoration: 'none' }} 
            passHref
          >
            <UserCircle size={16} />
            <span className='d-none d-md-inline'>Profile details</span>
          </NextLink>
        </div>
      </div>
      <div className={`${styles.previewDiv} mt-1 pt-2`}>
        <NextLink href='/preview' style={{ textDecoration: 'none' }} passHref>
          <Eye size={16} className='d-block d-md-none mt-1' />
          <span className='d-none d-md-inline ms-2'>Preview</span>
        </NextLink>
      </div>
    </div>
  );
};

export default Navbar;
