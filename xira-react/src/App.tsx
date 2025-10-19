import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons' 
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null); //barebones for now..
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null); // clear old result when uploading new file
  };
  
  async function AnalyzeFile() {
    setLoading(true);
    setResult(null);
    const res = await SendFile();
    await ReceiveResults(res);
    setLoading(false);
  }

  async function SendFile() {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    })
    return res;
  }

  async function ReceiveResults(res) {
    const data = await res.json();
    setResult(data.result);
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
        
        {result && (
        <div>
          <div className={`result ${result === "malicious" ? "malicious" : "benign"}`}>
            {result === "malicious" ? (
                <>
                  <FontAwesomeIcon className = "icon" icon={faXmark}/>
                  <p>Possibly Malicious!</p>
                </>
                ) : (
                <>
                  <FontAwesomeIcon className = "icon" icon={faCheck}/>
                  <p>File looks good!</p>
                </>
              )}
          </div>
        </div>
        )}

        <button 
          className = {'upload_btn ${loading ? "loading" : ""}'}
          onClick = {AnalyzeFile}
          disabled = {loading || !file}>
              {loading ? "Analyzing..." : "Analyze"} 
        </button>
      </div>
    </>
  )
}

export default App
