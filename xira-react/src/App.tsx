import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null); //barebones for now..

  return (
    <>
      <h1>PE Malware Analysis</h1>
      <div className = "upload_form">
        <input 
          type = "file" 
          className = "file_input" 
          id = "file_input" 
          accept = ".exe"
        />
        <label htmlFor = "file_input"> Upload File </label>
        <p className = "msg">*Only supports a portable exectuable file</p>
        <button className = "upload_btn">Analyze</button>
      </div>
    </>
  )
}

export default App
