import React, { useState } from 'react';

function MiniTextEditor() {
  const [fontSize, setFontSize] = useState('18px');
  const [fontColor, setFontColor] = useState('#000000');

  const sizes = ['14px', '18px', '24px', '30px'];

  // Function to apply style to selected text
  const wrapSelectedTextWithSpan = (styleCallback) => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    styleCallback(span);

    span.appendChild(range.extractContents());
    range.deleteContents();
    range.insertNode(span);
  };

  // Font Size
  const applyFontSize = (size) => {
    wrapSelectedTextWithSpan((span) => {
      span.style.fontSize = size;
    });
    setFontSize(size);
  };

  // Font Color
  const applyColor = (color) => {
    wrapSelectedTextWithSpan((span) => {
      span.style.color = color;
    });
    setFontColor(color);
  };

  // Bold
  const makeBold = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.fontWeight = 'bold';
    });
  };

  // Italic
  const makeItalic = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.fontStyle = 'italic';
    });
  };

  // Underline
  const makeUnderline = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.textDecoration = 'underline';
    });
  };

  // Uppercase
  const toUpperCase = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.textTransform = 'uppercase';
    });
  };

  // Lowercase
  const toLowerCase = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.textTransform = 'lowercase';
    });
  };

  // Capitalize
  const capitalize = () => {
    wrapSelectedTextWithSpan((span) => {
      span.style.textTransform = 'capitalize';
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {/* Toolbar */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {/* Font Size Dropdown */}
        <select value={fontSize} onChange={(e) => applyFontSize(e.target.value)}>
          {sizes.map((size) => (
            <option key={size} value={size} style={{ fontSize: size }}>
              {size}
            </option>
          ))}
        </select>

        {/* Font Color Picker */}
        <input type="color" value={fontColor} onChange={(e) => applyColor(e.target.value)} />

        {/* Style Buttons */}
        <button onClick={makeBold}>Bold</button>
        <button onClick={makeItalic}>Italic</button>
        <button onClick={makeUnderline}>Underline</button>
        <button onClick={toUpperCase}>Uppercase</button>
        <button onClick={toLowerCase}>Lowercase</button>
        <button onClick={capitalize}>Capitalize</button>
      </div>

      {/* Content Editable Text Area */}
     
    </div>
  );
}

export default MiniTextEditor;
