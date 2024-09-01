import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLinkContext } from '../context/LinkContext';

const ShareButton = () => {
  const { generateShareableLink } = useLinkContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const link = await generateShareableLink();
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
      router.push(link);
    } catch (error) {
      console.error("Error generating link:", error);
      alert('Error generating link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleShare} disabled={isLoading} className="btn text-white"
    style={{
      backgroundColor: "#633cff",
      textDecoration: "none",
      color: "white",
    }}>
      {isLoading ? 'Generating...' : 'Share My Links'}
    </button>
  );
};

export default ShareButton;