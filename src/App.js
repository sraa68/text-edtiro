import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';
import "./App.css"
let saved = "";

export default function App() {
  const [content, setContent] = useState("");


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      [{ 'color': [] }, { 'background': [] }],         
      ['bold', 'italic', 'underline', 'strike'],        
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],                                
      ['link',],                      
      ['clean']                                        
    ],
  };
  const handleSave = () => {
    // Sanitize and parse content
    const sanitizedContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
    saved = sanitizedContent;
    console.log("Saved Content:", saved);
  };

  const handleLoad = () => {
    setContent(saved);
  };

  console.log(content)
  return (
    <div className="App">
      <ReactQuill value={content} onChange={setContent} modules={modules} />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setContent("")}>Clear</button>
      <button onClick={handleLoad}>Load</button>
      <br />
      {/* Display saved content with HTML rendering */}
      {saved && (
        <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: `${saved}` }} />
      )}
    </div>
  );
}
