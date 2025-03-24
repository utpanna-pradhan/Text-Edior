import React from 'react';
import { useRef } from 'react';

function Toolbar() {
    const editorRef = useRef(null);

    const applyStyle = (styleType) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
    
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
    
        if (!selectedText) return;
    
        // Create a new element with the desired style
        const span = document.createElement("span");
    
        switch (styleType) {
          case "bold":
            span.style.fontWeight = "bold";
            break;
          case "italic":
            span.style.fontStyle = "italic";
            break;
          case "underline":
            span.style.textDecoration = "underline";
            break;
          default:
            break;
        }
    
        span.textContent = selectedText;
    
        // Replace the selected text with styled span
        range.deleteContents();
        range.insertNode(span);
      };
    
      const applyAlign = (alignType) => {
        if (editorRef.current) {
          editorRef.current.style.textAlign = alignType;
        }
      };
  return (
    <div>
     <div className="toolbar">
        <button onClick={() => applyStyle('bold')}><b>B</b></button>
        <button onClick={() => applyStyle('italic')}><i>I</i></button>
        <button onClick={() => applyStyle('underline')}><u>U</u></button>

        <button onClick={() => applyAlign('left')}>Left</button>
        <button onClick={() => applyAlign('center')}>Center</button>
        <button onClick={() => applyAlign('right')}>Right</button>
        <button onClick={() => applyAlign('justify')}>Justify</button>
      </div>
    </div>
  )
}

export default Toolbar
