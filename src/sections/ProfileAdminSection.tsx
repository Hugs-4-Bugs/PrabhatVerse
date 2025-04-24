// ADMIN CREDENTIALS: username: admin@gmail.com | password: admin12@
import type React from "react";
import { useEffect, useState } from "react";

const LOCAL_KEY = "_profile_admin_md";
const DEFAULT_PROFILE = `# Prabhat Kumar - Master Profile\n\n**Full Name:** Prabhat Kumar\n\n## About\nShort bio/about you\n\n## Education\n- Your education...\n\n## Projects\n1. Project A\n2. Project B\n\n## Skills\n- Skill A\n- Skill B\n\n## Certifications\n- ...\n\n## Contact\n- Email: mailtoprabhat72@gmail.com`;
const SECURITY_QUESTION = "What is your favorite color?";  // Define your security question here
// Ans: My favorite color is navy blue

export default function ProfileAdminSection({onProfileUpdate}:{onProfileUpdate?:(profile:string)=>void}) {
  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin12@");
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [msg, setMsg] = useState("");
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [security, setSecurity] = useState("");

  useEffect(() => {
    // On mount, load from localStorage if exists
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setProfile(stored);
  }, []);

  function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    if (inputUser === username && inputPass === password) {
      setAuthed(true);
      setMsg("");
    } else {
      setMsg("Incorrect username or password");
    }
  }

  function handleChangeEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!inputPass || inputPass !== password) {
      setMsg("Password is required to change email");
      return;
    }
    setUsername(inputUser);
    setMsg("Email changed! Use new email next time.");
    setShowChangeEmail(false);
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    // if (security.trim().toLowerCase() === SECURITY_ANSWER) {
    if (security.trim().toLowerCase() === security) {
      setMsg(`Your password is: ${password}`);
      setShowForgot(false);
    } else {
      setMsg("Security answer incorrect.");
    }
  }

  function handleProfileSave() {
    if (!authed) {
      setMsg("You must be logged in to save the profile.");
      return;
    }
    setMsg("Profile updated.");
    localStorage.setItem(LOCAL_KEY, profile);
    onProfileUpdate?.(profile);
  }

  if (!authed)
    return (
      <div className="max-w-lg mx-auto mt-24 bg-[#232325] rounded-lg shadow p-8 border border-gray-700 text-center">
        <h2 className="mb-4 text-2xl text-white font-bold">Admin Login</h2>
        <form onSubmit={tryLogin} className="space-y-3">
          <input value={inputUser} onChange={e=>setInputUser(e.target.value)} className="w-full bg-[#16161a] text-gray-200 border border-gray-700 rounded p-2" placeholder="Email" type="email" />
          <input value={inputPass} onChange={e=>setInputPass(e.target.value)} className="w-full bg-[#16161a] text-gray-200 border border-gray-700 rounded p-2" placeholder="Password" type="password" />
          {msg && <div className="text-red-400 text-sm">{msg}</div>}
          <button className="w-full mt-1 p-2 rounded bg-green-700 hover:bg-green-600 text-white font-bold">Login</button>
        </form>
        <div className="mt-3 text-xs text-gray-400 flex flex-col gap-2">
          {/* <button className="hover:underline" onClick={()=>{setShowChangeEmail(s=>!s);setMsg("");}}>Change Email</button> */}
          <button className="hover:underline" onClick={()=>{setShowForgot(s=>!s);setMsg("");}}>Forgot Password?</button>
        </div>
        {showChangeEmail && (
          <form onSubmit={handleChangeEmail} className="mt-4 space-y-2 text-left">
            <label className="text-sm text-gray-300">New Email</label>
            <input className="w-full bg-[#16161a] text-gray-200 border border-gray-700 rounded p-2" value={inputUser} onChange={e=>setInputUser(e.target.value)} type="email" />
            <label className="text-sm text-gray-300">Password</label>
            <input className="w-full bg-[#16161a] text-gray-200 border border-gray-700 rounded p-2" value={inputPass} onChange={e=>setInputPass(e.target.value)} type="password" />
            <button className="w-full mt-1 p-2 rounded bg-blue-700 hover:bg-blue-600 text-white font-bold">Change Email</button>
          </form>
        )}
        {showForgot && (
          <form onSubmit={handleForgot} className="mt-4 space-y-2 text-left">
            <div className="text-xs text-gray-400 mb-2">{SECURITY_QUESTION}</div>
            <input className="w-full bg-[#16161a] text-gray-200 border border-gray-700 rounded p-2" value={security} onChange={e=>setSecurity(e.target.value)} />
            <button className="w-full mt-1 p-2 rounded bg-yellow-700 hover:bg-yellow-600 text-white font-bold">Get Password</button>
          </form>
        )}
        <div className="text-xs text-gray-600 mt-5 text-left">Only authorized personnel may log in. Reach out internally if access is needed.</div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-7 mt-14 bg-[#232325] border border-gray-700 rounded-md shadow-md">
      <h2 className="font-bold text-xl text-white mb-2">Edit Master Profile (Used by AI, Chat, Terminal)</h2>
      <textarea
        className="w-full min-h-[260px] rounded bg-[#16161a] text-sm p-3 border border-gray-800 text-gray-200 font-mono mb-3"
        value={profile}
        onChange={e=>setProfile(e.target.value)}
        spellCheck={false}
      />
      <div className="flex gap-3">
        <button className="px-3 py-2 rounded bg-green-700 text-white font-semibold" onClick={handleProfileSave}>Save</button>
        <span className="text-green-400 text-base mt-2">{msg}</span>
      </div>
      <div className="mt-5 text-xs text-gray-400">This content feeds the chatbot, voice assistant, and terminal for all Prabhat Kumar-related queries.</div>
    </div>
  );
}
