import React from 'react';
import { useRef } from 'react';
import Toolbar from './Toolbar';

function Textarea() {
    
    const editorRef = useRef(null);
  return (
    <div>
        <Toolbar />
        <div ref={editorRef} contentEditable spellCheck="true" className='p-5 m-5 d-flex justify-content-center align-items-center shadow-sm  bg-body rounded'>
            Editable content
        </div>
    </div>
  )
}

export default Textarea
