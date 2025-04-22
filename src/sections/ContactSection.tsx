// import type React from "react";
// import { useState } from "react";

// export default function ContactSection() {
//   const [done, setDone] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [error, setError] = useState<string | null>(null);

//   // Updated regex for email validation (handles multiple domains)
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|edu|gov|net)$/;

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//     setForm(f => ({ ...f, [e.target.name]: e.target.value }));
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     // Trim the email to remove any leading/trailing spaces
//     const trimmedEmail = form.email.trim();

//     // Validate email with the updated regex
//     if (!emailRegex.test(trimmedEmail)) {
//       setError("Please enter a valid email address (e.g., example@gmail.com)");
//       return;
//     }

//     // Validate all required fields
//     if (!form.name || !form.email || !form.subject || !form.message) {
//       setError("All fields are required!");
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     // Simulate sending message (replace this with actual email service integration)
//     setTimeout(() => {
//       setDone(true);
//       setLoading(false);
//     }, 2000);
//   }

//   if (done) return (
//     <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 rounded-xl text-white text-lg shadow-xl border border-gray-700 text-center transform transition-all duration-500 ease-in-out animate-popIn">
//       <p className="font-bold text-2xl">Thank you for contacting!</p>
//       <p>I'll get back to you soon.</p>
//     </div>
//   );

//   return (
//     <form className="max-w-md mx-auto mt-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl border border-gray-700 p-8 space-y-6 animate-popIn" onSubmit={handleSubmit}>
//       <h2 className="text-4xl text-white text-center font-semibold tracking-tight mb-8">Contact</h2>

//       {/* Error message */}
//       {error && <div className="text-red-500 text-center font-medium">{error}</div>}

//       <input
//         className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
//         placeholder="Name"
//         name="name"
//         required
//         value={form.name}
//         onChange={handleChange}
//       />
//       <input
//         className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
//         placeholder="Email"
//         name="email"
//         type="email"
//         required
//         value={form.email}
//         onChange={handleChange}
//       />
//       <input
//         className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
//         placeholder="Subject"
//         name="subject"
//         required
//         value={form.subject}
//         onChange={handleChange}
//       />
//       <textarea
//         className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105 min-h-[120px]"
//         placeholder="Message"
//         name="message"
//         required
//         value={form.message}
//         onChange={handleChange}
//       />
      
//       {/* Loading indicator */}
//       {loading ? (
//         <button
//           disabled
//           className="w-full p-4 rounded-lg bg-teal-600 text-white font-semibold mt-4 transition-all duration-300 transform hover:scale-110"
//         >
//           Sending...
//         </button>
//       ) : (
//         <button
//           className="w-full p-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold mt-4 transition-all duration-300 transform hover:scale-110"
//           type="submit"
//         >
//           Send Message
//         </button>
//       )}
//     </form>
//   );
// }






















import type React from "react";
import { useState } from "react";

export default function ContactSection() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|edu|gov|net)$/;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = form.email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g., example@gmail.com)");
      return;
    }

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("All fields are required!");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("message", form.message);
    formData.append("_captcha", "false");
    formData.append("_template", "table"); // Ensure email is formatted in a readable way

    try {
      const response = await fetch("https://formsubmit.co/mailtoprabhat72@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Failed to send message. Check your internet connection.");
    }

    setLoading(false);
  }

  if (done) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 rounded-xl text-white text-lg shadow-xl border border-gray-700 text-center transform transition-all duration-500 ease-in-out animate-popIn">
      <p className="font-bold text-2xl">Thank you for contacting!</p>
      <p>I'll get back to you soon.</p>
    </div>
  );

  return (
    <form className="max-w-md mx-auto mt-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl border border-gray-700 p-8 space-y-6 animate-popIn" onSubmit={handleSubmit}>
      <h2 className="text-4xl text-white text-center font-semibold tracking-tight mb-8">Contact</h2>

      {error && <div className="text-red-500 text-center font-medium">{error}</div>}

      <input
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
        placeholder="Name"
        name="name"
        required
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
        placeholder="Email"
        name="email"
        type="email"
        required
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105"
        placeholder="Subject"
        name="subject"
        required
        value={form.subject}
        onChange={handleChange}
      />
      <textarea
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all duration-300 transform hover:scale-105 min-h-[120px]"
        placeholder="Message"
        name="message"
        required
        value={form.message}
        onChange={handleChange}
      />

      {loading ? (
        <button
          disabled
          className="w-full p-4 rounded-lg bg-teal-600 text-white font-semibold mt-4 transition-all duration-300 transform hover:scale-110"
        >
          Sending...
        </button>
      ) : (
        <button
          className="w-full p-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold mt-4 transition-all duration-300 transform hover:scale-110"
          type="submit"
        >
          Send Message
        </button>
      )}
    </form>
  );
}
