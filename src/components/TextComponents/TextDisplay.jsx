import React, { useState } from 'react';
import { truncateText } from '../../utils/functions'; 

function TextDisplay({ content, maxLength = 100, onReadMoreClick, textStyle, readMeStyle }) {
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
       <p className={textStyle} style={{ padding:0, margin:0 }}>{displayedText}
        {isTruncated && (
          <span
            onClick={handleReadMoreToggle}
            className={readMeStyle}
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