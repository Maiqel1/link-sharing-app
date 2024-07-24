import React from 'react';
import { useLinkContext } from '../context/LinkContext';
import { linkOptions } from '../../linkOptions';
import styles from './PhoneOutline.module.css';
import { ArrowRight } from "phosphor-react";

const PhoneOutline = () => {
  const { links, profile } = useLinkContext();

  return (
    <div className={`${styles.phoneOutline} d-flex flex-column`}>
      <div className={`${styles.imgPlaceholder} mx-auto mt-5`}>
        {profile.profilePicture ? (
          <img src={profile.profilePicture} className="img-fluid rounded-circle mb-3" alt="Profile" />
        ) : (
          <div className={`${styles.imgPlaceholderText}`}></div>
        )}
      </div>
      <section className='text-center px-5 mt-3'>
        <p className={profile.firstName ? 'p-2 mx-4 mt-3' : styles.textPlaceholder}>{profile.firstName} {profile.lastName}</p>
        <p className={profile.email ? 'p-2 mx-4 mt-3' : styles.textPlaceholder}>{profile.email}</p>
      </section>
      <div className="p-2 d-flex flex-column">
        {links.length < 1 && (<div className="bg-light p-3"></div>)}
        {links.length < 1 && (<div className="bg-light p-3 my-3"></div>)}
        {links.length < 1 && (<div className="bg-light p-3"></div>)}
        {links.map((link, index) => {
          const option = linkOptions.find(option => option.platform === link.platform);
          return (
            <a
              key={index}
              href={link.url}
              target='_blank'
              className={`btn btn-block form-control p-3 mb-2 text-white d-flex align-items-center justify-content-between`}
              style={{ backgroundColor: option?.color }}
            >
              <div className="d-flex align-items-center">
                {option?.logo}
                <span className="ml-2">{link.platform}</span>
              </div>
              <ArrowRight color='white' size={16} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PhoneOutline;
