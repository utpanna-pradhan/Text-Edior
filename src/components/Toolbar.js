import React from 'react';
import {useRef, useState} from 'react';
import Fontstyle from './Fontstyle';
import Fontsize from './Fontsize';

function Toolbar() {
  const editorRef = useRef(null);
    
   
  return (
    <div>
       <Fontstyle />
       <Fontsize />
      {/* Editable Div */}
      <div
        ref={editorRef}
        contentEditable
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        Select some text and change the font using the dropdown above!
      </div>
    </div>
  )
}

export default Toolbar
