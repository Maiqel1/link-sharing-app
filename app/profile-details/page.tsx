"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PhoneOutline from "../components/PhoneOutline";
import { useLinkContext } from '../context/LinkContext';
import Image from "next/image";
import { FloppyDiskBack } from "phosphor-react";

const ProfileDetails = () => {
  const { profile, setProfile } = useLinkContext();

  const [profileFirstName, setProfileFirstName] = useState(profile.firstName);
  const [profileLastName, setProfileLastName] = useState(profile.lastName);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [profilePicturePreview, setProfilePicturePreview] = useState(profile.profilePicture);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setProfileFirstName(profile.firstName);
    setProfileLastName(profile.lastName);
    setProfileEmail(profile.email);
    setProfilePicture(profile.profilePicture);
    setProfilePicturePreview(profile.profilePicture);
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setProfilePicturePreview(result);
          setProfilePicture(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const setProfileDetails = () => {
    if (!profileFirstName || !profileEmail || !profilePicture) {
      setErrorMessage("Please fill out all required fields and upload a profile picture.");
      return;
    }

    if (!validateEmail(profileEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setProfile({
      firstName: profileFirstName,
      lastName: profileLastName,
      email: profileEmail,
      profilePicture: profilePicture,
    });

    setErrorMessage("");
    setSuccessMessage("Your changes have been successfully saved!");

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <>
      <div className='container mt-4'>
        <Navbar />
        <div className='row'>
          <div className='col-md-4 d-none d-lg-block'>
            <PhoneOutline />
          </div>
          <div className='col-lg-8 p-4 bg-white'>
            <section>
              <h2>Profile Details</h2>
              <p>
                Add your details to create a personal touch to your profile.
              </p>
            </section>

            <div className='mt-3 bg-l bg-light p-5 d-flex flex-column flex-md-row justify-content-between align-items-center mx-auto'>
              <div className="">
                Profile picture
              </div>
              <div className="my-4" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('profilePictureUpload')?.click()}>
                <label htmlFor="profilePictureUpload" style={{ cursor: 'pointer' }}>
                  <div
                    className="upload-placeholder"
                    style={{
                      width: '153px',
                      height: '153px',
                      backgroundImage: `url(${profilePicturePreview})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '1px solid #ccc'
                    }}
                  >
                    {!profilePicturePreview && <Image src={"/images/img7.png"} className='img-fluid ms-4 mt-4' height={100} width={100} alt='' />}
                  </div>
                </label>
                <input
                  type="file"
                  id="profilePictureUpload"
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="col-12 col-md-4">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </div>
            </div>
            <div className='mt-3 bg-l bg-light p-5'>
              <form>
                <div className='d-flex mb-3 justify-content-between'>
                  <label htmlFor=''>Firstname*</label>
                  <input
                    required
                    type='text'
                    value={profileFirstName}
                    onChange={(e) => setProfileFirstName(e.target.value)}
                  />
                </div>

                <div className='d-flex mb-3 justify-content-between'>
                  <label htmlFor=''>Lastname*</label>
                  <input
                    required
                    type='text'
                    value={profileLastName}
                    onChange={(e) => setProfileLastName(e.target.value)}
                  />
                </div>

                <div className='d-flex justify-content-between'>
                  <label htmlFor=''>Email</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type='text'
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                  />
                </div>
              </form>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            
            <div className="d-none d-md-block">
            <div className="d-flex justify-content-end mt-5">
              <button
                onClick={setProfileDetails}
                disabled={!profileFirstName || !profileEmail || !profilePicture}
                style={{
                  backgroundColor: !profileFirstName || !profileEmail || !profilePicture ? '#EFEBFF' : '#633cff',
                  color: '#fff',
                  cursor: (!profileFirstName || !profileEmail || !profilePicture) ? 'not-allowed' : 'pointer'
                }}
              >
                Save
              </button>
            </div>
            </div>

            <div className="d-block d-md-none">
            <div className="d-flex justify-content-end mt-5">
              <button
              className="form-control"
                onClick={setProfileDetails}
                disabled={!profileFirstName || !profileEmail || !profilePicture}
                style={{
                  backgroundColor: !profileFirstName || !profileEmail || !profilePicture ? '#EFEBFF' : '#633cff',
                  color: '#fff',
                  cursor: (!profileFirstName || !profileEmail || !profilePicture) ? 'not-allowed' : 'pointer'
                }}
              >
                Save
              </button>
            </div>
            </div>
            
          </div>
        </div>
        {successMessage && (
          <div className=" text-center p-2 mb-5 mx-auto w-50" style={{ backgroundColor: '#333', color: '#FAFAFA', borderRadius: '12px' }}> <FloppyDiskBack size={24}/>
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDetails;
