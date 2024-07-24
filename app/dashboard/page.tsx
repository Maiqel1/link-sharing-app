"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AddLink from "../components/AddLink";
import PhoneOutline from "../components/PhoneOutline";
import withAuth from "../withAuth";
import Image from "next/image";
import { useLinkContext } from "../context/LinkContext";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const { links, addLink, updateLink } = useLinkContext();
  const [pendingLinks, setPendingLinks] = useState<
    { platform: string; url: string }[]
  >([]);

  const handleAddLink = () => {
    setPendingLinks([...pendingLinks, { platform: "", url: "" }]);
  };

  const handleSaveLinks = async () => {
    try {
      const existingPlatforms = new Set(links.map((link) => link.platform));

      for (const link of pendingLinks) {
        if (link.platform && link.url) {
          if (existingPlatforms.has(link.platform)) {
            await updateLink(link);
          } else {
            await addLink(link);
          }
        }
      }
      setPendingLinks([]);
    } catch (error) {
      console.error("Error saving links:", error);
    }
  };

  return (
    <>
      <div className='container mt-4'>
        <Navbar />
        <div className='row'>
          <div className='col-md-4 d-none d-lg-block'>
            <PhoneOutline />
          </div>
          <div className='col-lg-8'>
            <section className='p-5 bg-white rounded'>
              <h2>Customize your links</h2>
              <p>
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>

              <button
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #633CFF",
                  color: "#633CFF",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                className={`${styles.addLinkBtn} btn form-control my-3`}
                onClick={handleAddLink}
              >
                <span>+</span> Add new link
              </button>

              {pendingLinks.length < 1 && (
                <div className='d-flex flex-column justify-content-center align-items-center bg-light p-5 '>
                  <div className=''>
                    <Image
                      src={"/images/img3.svg"}
                      className='img-fluid'
                      height={160}
                      width={249}
                      alt=''
                    />
                  </div>
                  <h2 className='my-3 text-center'>Let’s get you started</h2>
                  <p className='text-center'>
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              )}

              {pendingLinks.map((link, index) => (
                <AddLink
                  key={index}
                  index={index}
                  link={link}
                  setPendingLinks={setPendingLinks}
                />
              ))}
            </section>
            <div className='bg-white p-3'>
              <hr />
              <div className="d-none d-md-block">
              <div className='d-flex justify-content-end'>
                <button
                  onClick={handleSaveLinks}
                  disabled={pendingLinks.length < 1}
                  style={{
                    backgroundColor:
                      pendingLinks.length < 1 ? "#EFEBFF" : "#633CFF",
                    cursor: pendingLinks.length < 1 ? "not-allowed" : "pointer",
                  }}
                  className='btn p-2 text-white'
                >
                  Save
                </button>
              </div>
              </div>

              <div className="d-block d-md-none">
              <div className='d-flex justify-content-end'>
                <button
                  onClick={handleSaveLinks}
                  disabled={pendingLinks.length < 1}
                  style={{
                    backgroundColor:
                      pendingLinks.length < 1 ? "#EFEBFF" : "#633CFF",
                    cursor: pendingLinks.length < 1 ? "not-allowed" : "pointer",
                  }}
                  className='btn form-control p-2 text-white'
                >
                  Save
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
