import type React from "react";
import { useState } from "react";

export default function ContactSection() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }
  if (done) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-[#232325] rounded text-green-400 text-xl shadow border border-gray-700 text-center">
      Thank you for contacting!<br/> I'll get back to you soon.
    </div>
  );
  return (
    <form className="max-w-md mx-auto mt-20 bg-[#232325] rounded shadow border border-gray-700 p-6 space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-white text-center mb-6 font-bold">Contact</h2>
      <input className="w-full p-2 rounded bg-[#18181b] border border-gray-600 text-gray-200" placeholder="Name" name="name" required value={form.name} onChange={handleChange} />
      <input className="w-full p-2 rounded bg-[#18181b] border border-gray-600 text-gray-200" placeholder="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
      <input className="w-full p-2 rounded bg-[#18181b] border border-gray-600 text-gray-200" placeholder="Subject" name="subject" required value={form.subject} onChange={handleChange} />
      <textarea className="w-full p-2 rounded bg-[#18181b] border border-gray-600 text-gray-200 min-h-[100px]" placeholder="Message" name="message" required value={form.message} onChange={handleChange} />
      <button className="w-full p-2 rounded bg-green-700 hover:bg-green-600 text-white font-bold mt-4" type="submit">Send</button>
    </form>
  );
}
