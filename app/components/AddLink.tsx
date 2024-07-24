import React from "react";
import { linkOptions } from "../../linkOptions";

interface AddLinkProps {
  index: number;
  link: { platform: string; url: string };
  setPendingLinks: React.Dispatch<React.SetStateAction<{ platform: string; url: string; }[]>>;
}

const AddLink: React.FC<AddLinkProps> = ({ index, link, setPendingLinks }) => {
  const handleRemoveLink = () => {
    setPendingLinks((prevLinks) =>
      prevLinks.filter((_, idx) => idx !== index)
    );
  };

  return (
    <div className="bg-light mb-2 p-3">
      <div className="d-flex justify-content-between">
        <p>{`link #${index + 1}`}</p>
        <p onClick={handleRemoveLink}>remove</p>
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
        onChange={(e) =>
          setPendingLinks((prevLinks) =>
            prevLinks.map((prevLink, idx) =>
              idx === index ? { ...prevLink, url: e.target.value } : prevLink
            )
          )
        }
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
      {(!link.platform || !link.url) && (
        <p className="text-danger">Platform and URL cannot be empty</p>
      )}
    </div>
  );
};

export default AddLink;
