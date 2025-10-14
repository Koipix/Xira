import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null); //barebones for now..
  const OnChange = (files) => {
    const uploadedFile = files.target.files[0];
    setFile(uploadedFile);  
}
  return (
    <>
    <h1>PE Malware Analysis</h1>
      <div className = "upload_form">
        <input 
          type = "file" 
          className = "file_input" 
          id = "file_input" 
          accept = ".exe"
          onChange = {OnChange}
        />
        <label  
          htmlFor = "file_input"
          className = "file_hover"> Upload File </label>
        <p className = "msg">*Only supports a portable exectuable file</p>
        {file && (
          <>
          <div className = "uploaded_files">
            <p className = "file_name"> {file.name} </p>
            <p className = "file_size"> {(file.size / 1048576).toFixed(2)}mb </p>
           </div>
           </>
        )}
        <button className = "upload_btn">Analyze</button>
      </div>
    </>
  )
}

export default App
