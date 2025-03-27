import React, { useState, useRef, useEffect } from 'react';

function MiniTextEditor() {
  const editorRef = useRef(null);

  const [fontSize, setFontSize] = useState('18px');
  const [fontColor, setFontColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const sizes = ['14px', '18px', '24px', '30px'];

  // Save state to history
  const saveHistory = () => {
    const current = editorRef.current.innerHTML;
    setHistory((prev) => [...prev, current]);
    setRedoStack([]); // clear redo stack after new change
  };

  // On any input, save to history
  const handleInput = () => {
    saveHistory();
  };

  // UNDO
  const handleUndo = () => {
    if (history.length === 0) return;

    const current = editorRef.current.innerHTML;
    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setRedoStack((prev) => [current, ...prev]);
    editorRef.current.innerHTML = lastState;
  };

  // REDO
  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setHistory((prev) => [...prev, editorRef.current.innerHTML]);
    editorRef.current.innerHTML = nextState;
  };

  // Toggle style using execCommand
  const toggleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    saveHistory();
  };

  // UseEffect to initialize history on first render
  useEffect(() => {
    saveHistory(); // store initial state
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {/* Font Size */}
        <select value={fontSize} onChange={(e) => {
          setFontSize(e.target.value);
          toggleCommand('fontSize', '7'); // temp placeholder
          const fontElements = editorRef.current.querySelectorAll('font[size="7"]');
          fontElements.forEach(el => {
            el.removeAttribute('size');
            el.style.fontSize = e.target.value;
          });
        }}>
          {sizes.map(size => (
            <option key={size} value={size} style={{ fontSize: size }}>
              {size}
            </option>
          ))}
        </select>

        {/* Font Color */}
        <input
          type="color"
          value={fontColor}
          onChange={(e) => {
            setFontColor(e.target.value);
            toggleCommand('foreColor', e.target.value);
          }}
        />

        {/* Style Buttons */}
        <button onClick={() => toggleCommand('bold')}>Bold</button>
        <button onClick={() => toggleCommand('italic')}>Italic</button>
        <button onClick={() => toggleCommand('underline')}>Underline</button>
        <button onClick={() => toggleCommand('uppercase')}>Uppercase</button>
        <button onClick={() => toggleCommand('lowercase')}>Lowercase</button>
        <button onClick={() => toggleCommand('capitalize')}>Capitalize</button>

        {/* Undo Redo */}
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      {/* Content Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          minHeight: '200px',
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '6px',
          fontSize,
          color: fontColor
        }}
      />
    </div>
  );
}

export default MiniTextEditor;
