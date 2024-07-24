import React, { useState } from "react";
import { linkOptions } from "../../linkOptions";

interface CustomDropdownProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        {linkOptions.find(option => option.platform === selectedValue)?.platform || "Select a platform"}
      </button>
      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {linkOptions.map(option => (
          <li key={option.platform} onClick={() => handleSelect(option.platform)} className="dropdown-item">
            {option.logo} {option.platform}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;
