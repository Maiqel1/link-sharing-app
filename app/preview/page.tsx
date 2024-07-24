"use client";

import React from 'react';
import { useLinkContext } from '../context/LinkContext';
import styles from './Preview.module.css';
import { linkOptions } from '../../linkOptions';

const Preview = () => {
  const { links, profile } = useLinkContext();

  return (
    <div className={styles.container}>
      <div className={styles.topHalf}></div>
      <div className={styles.bottomHalf}></div>
      <div className={styles.content}>
        <div className={`${styles.phoneOutline} d-flex flex-column`}>
          <div className={`${styles.imgPlaceholder} mx-auto mt-5`}>
            {profile.profilePicture ? (
              <img src={profile.profilePicture} className="img-fluid rounded-circle mb-3" alt="Profile" />
            ) : (
              <div className={styles.imgPlaceholderText}>Profile Image</div>
            )}
          </div>
          <section className='text-center px-5 mt-3'>
            <p className={profile.firstName ? 'p-2 mx-4 mt-3' : styles.textPlaceholder}>{profile.firstName} {profile.lastName}</p>
            <p className={profile.email ? 'p-2 mx-4 mt-3' : styles.textPlaceholder}>{profile.email}</p>
          </section>
          <div className="p-2 d-flex flex-column">
            {links.length < 1 && (<div className="bg-light p-3"></div>)}
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target='_blank'
                className='btn btn-block mb-2 text-white'
                style={{ backgroundColor: linkOptions.find(option => option.platform === link.platform)?.color }}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
