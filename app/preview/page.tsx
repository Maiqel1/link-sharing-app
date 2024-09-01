"use client";

import React, { useState, useEffect } from "react";
import { useLinkContext } from "../context/LinkContext";
import styles from "./Preview.module.css";
import { linkOptions } from "../../linkOptions";
import Link from "next/link";
import { ArrowRight, Spinner } from "phosphor-react";
import Image from "next/image";
import ShareButton from "../components/ShareButton";
import { Link as LinkType, Profile, LinkOption } from '../types'

interface PreviewProps {
  links?: LinkType[];
  profile?: Profile;
  isSharedView?: boolean;
}

const Preview: React.FC<PreviewProps> = ({ links, profile, isSharedView = false }) => {
  const [loading, setLoading] = useState(true);
  const { links: contextLinks, profile: contextProfile, user } = useLinkContext();

  useEffect(() => {
     const linksToUse = links || contextLinks;
    const profileToUse = profile || contextProfile;

    if (Array.isArray(linksToUse) || Object.keys(profileToUse).length > 0) {
      setLoading(false);
    }
  }, [links, profile, contextLinks, contextProfile]);

  const linksToRender = links || contextLinks;
  const profileToRender = profile || contextProfile;

  const showBackButton = !isSharedView && user;

  return (
    <div className={styles.container}>
      <nav style={{ backgroundColor: "#6c63ff" }} className="navbar w-100 ">
        <div
          className="bg-white w-100 d-flex justify-content-between mx-5 p-3"
          style={{ borderRadius: "12px" }}
        >
          {showBackButton && (
            <button className="btn btn-outline-primary">
              <Link
                href={"/dashboard"}
                style={{
                  textDecoration: "none",
                }}
              >
                Back to editor
              </Link>
            </button>
          )}
          {!isSharedView && <ShareButton />}
        </div>
      </nav>
      {loading ? (
        <div className="text-center fs-3">
          <p>Fetching data... <Spinner /> </p>
        </div>
      ) : (
        <>
          <div className={styles.topHalf}></div>
          <div className={styles.bottomHalf}></div>
          <div className={`${styles.content} mt-0 mt-md-5`}>
            <div className={`${styles.phoneOutline} d-flex flex-column mt-5 `}>
              <div className={`${styles.imgPlaceholder} mx-auto mt-5`}>
                {profile?.profilePicture ? (
                  <Image
                    src={profile.profilePicture}
                    className="img-fluid rounded-circle mb-1"
                    alt="Profile"
                    objectFit="contain"
                    height={100}
                    width={100}
                  />
                ) : (
                  <div className={styles.imgPlaceholder}>Profile Image</div>
                )}
              </div>
              <section className="text-center px-5 mt-2">
                <p
                  className={
                    profile?.firstName ? "p-2  mt-2" : styles.textPlaceholder
                  }
                >
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p
                  className={
                    profile?.email ? "p-2 mt-1" : styles.textPlaceholder
                  }
                >
                  {profile?.email}
                </p>
              </section>
              <div className="p-2 d-flex flex-column">
        {(!linksToRender || linksToRender.length === 0) && <div className="bg-light p-3">No links added yet</div>}
        {linksToRender && linksToRender.map((link, index) => {
          const option = linkOptions.find(
            (option) => option.platform === link.platform
          );
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-block form-control p-3 mb-2 text-white d-flex align-items-center justify-content-between`}
              style={{ backgroundColor: option?.color }}
            >
              <div className="d-flex align-items-center">
                {option?.logo}
                <span className="ml-2">{link.platform}</span>
              </div>
              <ArrowRight color="white" size={16} />
            </a>
          );
        })}
      </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Preview;
