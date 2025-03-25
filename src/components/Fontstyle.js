import React from 'react';
import { useState} from 'react';

function Fontstyle() {
    
    const [fontFamily, setFontFamily] = useState("Arial");
  
    const fonts = [
      "Arial",
      "Times New Roman",
      "Georgia",
      "Courier New",
      "Verdana",
      "Trebuchet MS",
      "Comic Sans MS",
    ];
  
    const applyFontToSelection = (font) => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
  
      const range = selection.getRangeAt(0);
  
     
      const span = document.createElement("span");
      span.style.fontFamily = font;
      span.appendChild(range.extractContents()); 
      range.deleteContents(); 
      range.insertNode(span); 
  
      setFontFamily(font); 
    };
  return (
    <div>
       <div  style={{ padding: "2rem" }}>
     

      {/* Font Style Dropdown */}
      <select 
        value={fontFamily}
        onChange={(e) => applyFontToSelection(e.target.value)}
        style={{ marginBottom: "1rem", fontFamily }}
      >
        {fonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>

    
    </div>
    </div>
  )
}

export default Fontstyle
