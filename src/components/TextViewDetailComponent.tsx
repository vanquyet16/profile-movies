import React, { useState } from 'react';

interface TextViewDetailComponentProps {
  text?: string;
  maxLength: number;
}

const TextViewDetailComponent: React.FC<TextViewDetailComponentProps> = ({ text = '', maxLength }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  let displayText = text;
  if (!isExpanded && text.length > maxLength) {
    displayText = text.substring(0, maxLength) + "...";
  }

  return (
    <span
      className="text-white text-xl flex-grow italic"
      onClick={toggleExpand}
      style={{ cursor: 'pointer' }}
    >
      {displayText}
      {text.length > maxLength && <span style={{fontWeight: 'bold'}}>{isExpanded ? " Ẩn" : " Xem thêm"}</span>}
    </span>
  );
}

export default TextViewDetailComponent;