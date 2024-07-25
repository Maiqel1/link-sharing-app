import React, { useState } from "react";
import { linkOptions } from "../../linkOptions";

interface AddLinkProps {
  index: number;
  link: { platform: string; url: string };
  setPendingLinks: React.Dispatch<React.SetStateAction<{ platform: string; url: string; }[]>>;
}

const AddLink: React.FC<AddLinkProps> = ({ index, link, setPendingLinks }) => {
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleRemoveLink = () => {
    setPendingLinks((prevLinks) =>
      prevLinks.filter((_, idx) => idx !== index)
    );
  };

  const isValidUrlFormat = (url: string): boolean => {
    // Regex pattern to match the format https://www.github.com/johnappleseed
    const pattern = /^https:\/\/(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9]+)*$/;
    return pattern.test(url);
  };
  

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setIsValidUrl(isValidUrlFormat(newUrl));
    setPendingLinks((prevLinks) =>
      prevLinks.map((prevLink, idx) =>
        idx === index ? { ...prevLink, url: newUrl } : prevLink
      )
    );
  };

  return (
    <div className="bg-light mb-2 p-3">
      <div className="d-flex justify-content-between">
        <p>{`link #${index + 1}`}</p>
        <p onClick={handleRemoveLink} style={{ cursor: "pointer" }}>remove</p>
      </div>
      <label htmlFor="">Platform</label>
      <select
        className="form-control"
        value={link.platform}
        onChange={(e) =>
          setPendingLinks((prevLinks) =>
            prevLinks.map((prevLink, idx) =>
              idx === index ? { ...prevLink, platform: e.target.value } : prevLink
            )
          )
        }
      >
        {linkOptions.map((option) => (
          <option key={option.platform} value={option.platform}>
            {option.logo} {option.platform}
          </option>
        ))}
      </select>
      <label htmlFor="">Link</label>
      <input
        type="url"
        className="form-control"
        value={link.url}
        onChange={handleUrlChange}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
      {!isValidUrl && (
        <p className="text-danger">Please enter a valid URL: https://www.....</p>
      )}
      {(!link.platform ) && (
        <p className="text-danger">Please choose a platform</p>
      )}
      {(!link.url) && (
        <p className="text-danger"> URL cannot be empty</p>
      )}
    </div>
  );
};

export default AddLink;
