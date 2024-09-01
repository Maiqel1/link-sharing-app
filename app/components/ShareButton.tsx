
import React, {useState} from 'react';
import { useLinkContext } from '../context/LinkContext';

const ShareButton = () => {
  const { generateShareableLink, shareableLink } = useLinkContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const link = await generateShareableLink();
      // You can now display this link to the user or copy it to clipboard
      console.log("Shareable link:", link);
    } catch (error) {
      console.error("Error generating link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleShare} disabled={isLoading}  className="btn text-white"
    style={{
      backgroundColor: "#633cff",
      textDecoration: "none",
      color: "white",
    }}>
      {isLoading ? 'Generating...' : 'Share My Links'}
    </button>
  );
};

export default ShareButton