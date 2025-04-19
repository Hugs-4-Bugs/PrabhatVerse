import type React from "react";
import { useEffect, useRef, useState } from "react";

const LOCAL_KEY_B64 = "_admin_resume_pdf_b64";
const LOCAL_KEY_NAME = "_admin_resume_filename";
const DEFAULT_SAMPLE = "/sample_resume.pdf";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ResumeSection() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fileURL, setFileURL] = useState<string>(DEFAULT_SAMPLE);
  const [fileName, setFileName] = useState<string>("sample_resume.pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On load, try localStorage first
  useEffect(() => {
    const b64 = localStorage.getItem(LOCAL_KEY_B64);
    const fname = localStorage.getItem(LOCAL_KEY_NAME);
    if (b64 && b64.startsWith("data:application/pdf;base64,")) {
      setFileURL(b64);
      setFileName(fname || "resume.pdf");
    }
  }, []);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin12@") {
      setAuth(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      if (file.size > 4.8 * 1024 * 1024) {
        setError("File too large: must be under 5MB (browser limitation). Compress your PDF and try again.");
        return;
      }
      const b64 = await fileToBase64(file);
      try {
        localStorage.setItem(LOCAL_KEY_B64, b64);
        localStorage.setItem(LOCAL_KEY_NAME, file.name);
        setFileURL(b64);
        setFileName(file.name);
        setShowAdmin(false);
        setAuth(false);
        setEmail("");
        setPassword("");
        setError("");
      } catch {
        setError("Failed to save file to browser storage (quota exceeded?)");
      }
    } else {
      setError("Please select a valid PDF file.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-white">Resume</h2>
      <div className="w-full flex justify-center mb-6">
        <iframe title="Resume PDF Preview" src={fileURL} className="w-full md:w-[500px] h-[600px] bg-white rounded shadow border border-gray-700" />
      </div>
      <a
        href={fileURL}
        download={fileName}
        className="px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white font-bold text-lg transition shadow mb-2"
      >
        Download Resume
      </a>
      <button
        onClick={() => setShowAdmin(true)}
        className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 text-white font-bold text-lg transition shadow ml-3"
        style={{marginTop:4}}
      >
        Replace/Upload Resume (admin)
      </button>
      <p className="text-gray-400 text-sm mt-4">Replace <code>public/sample_resume.pdf</code> by uploading here (admin-only, never lost).</p>
      {showAdmin && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/50">
          <div className="bg-[#181823] p-7 rounded-xl border border-gray-700 shadow-xl min-w-[340px] flex flex-col items-center relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:bg-zinc-800 rounded p-1" onClick={() => { setShowAdmin(false); setAuth(false); setError(""); }}><i className="fa fa-times text-2xl" /></button>
            {!auth ? (
              <form onSubmit={handleAuth} className="w-full flex flex-col gap-3 items-center">
                <h3 className="font-bold text-lg text-white mb-1">Admin Login</h3>
                <input className="w-full p-2 rounded bg-[#16181a] border border-gray-700 text-gray-200" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="w-full p-2 rounded bg-[#16181a] border border-gray-700 text-gray-200" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <button className="w-full bg-green-700 hover:bg-green-600 p-2 rounded text-white font-bold">Log In</button>
              </form>
            ) : (
              <>
                <h3 className="font-bold text-lg text-white mb-3">Replace Resume PDF</h3>
                <input type="file" ref={fileInputRef} accept="application/pdf" className="block w-full text-sm border rounded p-2 text-gray-300 bg-[#16181a] mb-2" onChange={handleUpload} />
                <div className="text-xs text-gray-400 mt-2">Choose a PDF only. File is saved to your browser; never lost unless admin replaces.</div>
                {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
