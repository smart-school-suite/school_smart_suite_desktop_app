import React, { useState } from 'react';
import { truncateText } from '../../utils/functions';
import { htmlToPlainText, isHtml } from '../../utils/richText/richText';
import RichTextContent from './RichTextContent';

function TextDisplay({ content, maxLength = 100, onReadMoreClick, textStyle, readMeStyle }) {
  const [showFullText, setShowFullText] = useState(false);
  const richContent = isHtml(content);
  // Rich-text descriptions are truncated on their visible text, never on markup.
  const plainContent = richContent ? htmlToPlainText(content) : content;
  const { truncatedText, isTruncated } = truncateText(plainContent, maxLength);

  const handleReadMoreToggle = () => {
    if (onReadMoreClick && !showFullText) {
      onReadMoreClick();
    } else {
      setShowFullText(!showFullText);
    }
  };

  const toggle = isTruncated && (
    <span
      onClick={handleReadMoreToggle}
      className={readMeStyle}
      style={{ cursor: 'pointer' }}
    >
      {showFullText ? ' Read Less' : ' Read More'}
    </span>
  );

  if (richContent && (showFullText || !isTruncated)) {
    return (
      <div className="text-container">
        <RichTextContent content={content} className={textStyle} />
        {toggle}
      </div>
    );
  }

  return (
    <div className="text-container">
       <p className={textStyle} style={{ padding:0, margin:0 }}>
        {showFullText ? plainContent : truncatedText}
        {toggle}
        </p>
    </div>
  );
}

export default TextDisplay;
