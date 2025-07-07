import React, { useState } from 'react';
import { truncateText } from '../../utils/functions'; 

function TextDisplay({ content, maxLength = 100, onReadMoreClick, textStyle }) {
  const [showFullText, setShowFullText] = useState(false);
  const { truncatedText, isTruncated } = truncateText(content, maxLength);

  const displayedText = showFullText ? content : truncatedText;

  const handleReadMoreToggle = () => {
    if (onReadMoreClick && !showFullText) {
      onReadMoreClick();
    } else {
      setShowFullText(!showFullText);
    }
  };

  return (
    <div className="text-container">
      <p className="p-0 m-0">
        {displayedText}
        {isTruncated && (
          <span
            onClick={handleReadMoreToggle}
            className={textStyle}
            style={{ cursor: 'pointer' }}
          >
            {showFullText ? ' Read Less' : ' Read More'}
          </span>
        )}
      </p>
    </div>
  );
}

export default TextDisplay;