// import React, { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// function getIndianGreeting() {
//   const hour = Number(
//     new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false })
//   );
//   if (hour < 12) return "Good morning! How can I help you?";
//   if (hour < 18) return "Good afternoon! How can I help you?";
//   return "Good evening! How can I help you?";
// }

// // Utility: flatten a ReactNode/Markdown block to plain text for speaking
// function reactNodeToPlainText(node) {
//   if (typeof node === 'string') return node;
//   if (Array.isArray(node)) return node.map(reactNodeToPlainText).join(' ');
//   if (node && typeof node === 'object' && node.props && node.props.children)
//     return reactNodeToPlainText(node.props.children);
//   return '';
// }

// export default function VoiceAssistantModal({ open, onClose, knowledge, localAi }: { open: boolean; onClose: () => void; knowledge: string, localAi: (q: string, md: string) => any }) {
//   const [state, setState] = useState<'greet'|'listening'|'thinking'|'speaking'|'idle'>('idle');
//   const [transcript, setTranscript] = useState("");
//   const [answer, setAnswer] = useState<any>("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (open) {
//       setTranscript(""); setAnswer(""); setError("");
//       setState('greet');
//       if ('speechSynthesis' in window) {
//         const greet = getIndianGreeting();
//         const utter = new window.SpeechSynthesisUtterance(greet);
//         utter.lang = "en-IN";
//         utter.rate = 0.93;
//         const voices = window.speechSynthesis.getVoices();
//         const female = voices.find(v => v.gender === "female" && v.lang.startsWith("en")) ?? voices.find(v => v.name.match(/female|woman|girl|zira|susan/i));
//         if (female) utter.voice = female;

//         // After speaking, wait 3.5 sec before allowing user to speak
//         utter.onend = () => setTimeout(() => setState('idle'), 3500);

//         window.speechSynthesis.speak(utter);
//       } else {
//         setTimeout(() => setState('idle'), 4500);
//       }
//     } else {
//       if ('speechSynthesis' in window) window.speechSynthesis.cancel();
//     }
//   }, [open]);

//   function listen() {
//     setError("");
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       setError("Speech recognition is not supported.");
//       return;
//     }
//     setState('listening');
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.onresult = (ev) => {
//       const t = ev.results[0][0].transcript;
//       setTranscript(t);
//       setState('thinking');
//       setTimeout(() => respond(t), 400);
//     };
//     recognition.onerror = e => setError(e.error||"Could not listen");
//     recognition.start();
//   }

//   function speakWithVoice(text: any) {
//     if ('speechSynthesis' in window) {
//       const plain = typeof text === 'string' ? text : reactNodeToPlainText(text);
//       const utter = new window.SpeechSynthesisUtterance(plain);
//       utter.lang = "en-IN";
//       utter.rate = 0.93;
//       const voices = window.speechSynthesis.getVoices();
//       const female = voices.find(v => v.gender === "female" && v.lang.startsWith("en")) ?? voices.find(v => v.name.match(/female|woman|girl|zira|susan/i));
//       if (female) utter.voice = female;
//       utter.onend = () => setTimeout(()=>setState('idle'),400);
//       window.speechSynthesis.speak(utter);
//     }
//   }

//   function respond(q: string) {
//     setError("");
//     if (!knowledge) {
//       setAnswer(<em>Profile(Admin) is empty or missing.</em>);
//       setState('idle');
//       return;
//     }
//     try {
//       const answer = localAi(q, knowledge);
//       setAnswer(answer);
//       setState('speaking');
//       speakWithVoice(answer);
//     } catch (e) {
//       setError(`Internal error: ${String(e)}`);
//       setAnswer(<em>Something went wrong. Try again.</em>);
//       setState('idle');
//     }
//   }

//   if (!open) return null;
//   return (
//     <div className="fixed z-[1001] inset-0 flex flex-col items-center justify-center bg-[#232325b0] backdrop-blur-lg">
//       <div className="min-w-[300px] sm:w-[400px] bg-[#16181c] p-8 rounded-xl border border-gray-800 shadow-md flex flex-col items-center relative">
//         <button className="absolute top-3 right-3 text-gray-400 hover:bg-zinc-800 rounded p-1" title="Close" onClick={onClose}>
//           <i className="fa fa-times text-2xl" />
//         </button>
//         <div className="mb-3 animate-pulse text-green-400 text-4xl">
//           <i className="fa fa-microphone" />
//         </div>
//         <div className="font-semibold tracking-tight text-lg mb-2 text-white">Prabhat’s AI Voice Assistant</div>
//         <div className="mb-1 p-2 py-4 w-full rounded bg-gray-900 text-gray-300 min-h-[44px]">
//           {state === 'greet' && <span>This model is still in training phase please continue with chat model. Thank You !...</span>}
//           {state === 'listening' && <span>Listening for your question...</span>}
//           {state === 'thinking' && <span>Analyzing your request...</span>}
//           {state === 'speaking' && <span><b>Q:</b> {transcript}<br /><b>A:</b> {typeof answer === 'string' ? answer : <>{answer}</>}</span>}
//           {state === 'idle' && <span>Start the AI assistant by clicking below.</span>}
//         </div>
//         {!!error && <div className="text-red-400">{error}</div>}
//         <button
//           className="mt-6 px-6 py-3 bg-green-700 hover:bg-green-600 rounded-full text-white text-lg font-bold disabled:bg-gray-600"
//           onClick={listen}
//           disabled={state === 'thinking' || state === 'speaking'}
//         >
//           {state === 'idle' ? 'Ask with Voice'
//            : state === 'listening' ? 'Click to speak...'
//            : state === 'speaking' ? 'Speaking...' : 'Working...'}
//         </button>
//       </div>
//     </div>
//   );
// }



















import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function getIndianGreeting() {
  const hour = Number(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false })
  );
  if (hour < 12) return "Good morning! How can I help you?";
  if (hour < 18) return "Good afternoon! How can I help you?";
  return "Good evening! How can I help you?";
}

// // Utility: flatten a ReactNode/Markdown block to plain text for speaking
// function reactNodeToPlainText(node) {
//   if (typeof node === 'string') return node;
//   if (Array.isArray(node)) return node.map(reactNodeToPlainText).join(' ');
//   if (node && typeof node === 'object' && node.props && node.props.children)
//     return reactNodeToPlainText(node.props.children);
//   return '';
// }

function reactNodeToPlainText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(reactNodeToPlainText).join(' ');
  if (node && typeof node === 'object' && 'props' in node && node.props?.children)
    return reactNodeToPlainText(node.props.children);
  return '';
}

export default function VoiceAssistantModal({ open, onClose, knowledge, localAi }: { open: boolean; onClose: () => void; knowledge: string, localAi: (q: string, md: string) => any }) {
  const [state, setState] = useState<'greet'|'listening'|'thinking'|'speaking'|'idle'>('idle');
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState<any>("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTranscript(""); setAnswer(""); setError("");
      setState('greet');
      if ('speechSynthesis' in window) {
        const greet = getIndianGreeting();
        const utter = new window.SpeechSynthesisUtterance(greet);
        utter.lang = "en-IN";
        utter.rate = 0.93;
        const voices = window.speechSynthesis.getVoices();
        // const female = voices.find(v => v.gender === "female" && v.lang.startsWith("en")) ?? voices.find(v => v.name.match(/female|woman|girl|zira|susan/i));
        const female = voices.find(v => v.lang.startsWith("en") && v.name.match(/female|woman|girl|zira|susan/i));
        if (female) utter.voice = female;

        // After speaking, wait 3.5 sec before allowing user to speak
        utter.onend = () => setTimeout(() => setState('idle'), 3500);

        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => setState('idle'), 4500);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }, [open]);

  function listen() {
    setError("");
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError("Speech recognition is not supported.");
      return;
    }
    
    setState('listening');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // const recognition = new SpeechRecognition();
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (ev: any) => {
      const t = ev.results[0][0].transcript;
      setTranscript(t);
      setState('thinking');
      setTimeout(() => respond(t), 400);
    };
    // recognition.onerror = e => setError(e.error||"Could not listen");
    recognition.onerror = (e: any) => setError(e.error || "Could not listen");
    recognition.start();
  }

  // function speakWithVoice(text: any) {
  //   if ('speechSynthesis' in window) {
  //     const plain = typeof text === 'string' ? text : reactNodeToPlainText(text);
  //     const utter = new window.SpeechSynthesisUtterance(plain);
  //     utter.lang = "en-IN";
  //     utter.rate = 0.93;
  //     const voices = window.speechSynthesis.getVoices();
  //     // const female = voices.find(v => v.gender === "female" && v.lang.startsWith("en")) ?? voices.find(v => v.name.match(/female|woman|girl|zira|susan/i));
  //     const female = voices.find(v => v.name.match(/zira|susan|female|woman|girl/i)) ?? voices.find(v => v.lang.startsWith("en"));
  //     if (female) utter.voice = female;
  //     utter.onend = () => setTimeout(()=>setState('idle'),400);
  //     window.speechSynthesis.speak(utter);
  //   }
  // }

  function speakWithVoice(text: any) {
    console.log("Speaking text:", text);  // Debugging line
    if ('speechSynthesis' in window) {
      const plain = typeof text === 'string' ? text : reactNodeToPlainText(text);
      const utter = new window.SpeechSynthesisUtterance(plain);
      utter.lang = "en-IN";
      utter.rate = 0.93;
      const voices = window.speechSynthesis.getVoices();
      const female = voices.find(v => v.name.match(/zira|susan|female|woman|girl/i)) ?? voices.find(v => v.lang.startsWith("en"));
      if (female) utter.voice = female;
      utter.onend = () => setTimeout(()=>setState('idle'),400);
      window.speechSynthesis.speak(utter);
    }
  }
  
  // function respond(q: string) {
  //   setError("");
  //   if (!knowledge) {
  //     setAnswer(<em>Profile(Admin) is empty or missing.</em>);
  //     setState('idle');
  //     return;
  //   }
  //   try {
  //     const answer = localAi(q, knowledge);
  //     setAnswer(answer);
  //     setState('speaking');
  //     speakWithVoice(answer);
  //   } catch (e) {
  //     setError(`Internal error: ${String(e)}`);
  //     setAnswer(<em>Something went wrong. Try again.</em>);
  //     setState('idle');
  //   }
  // }


  function respond(q: string) {
    console.log("Respond function triggered with query:", q);  // Debugging line
    setError("");
    if (!knowledge) {
      setAnswer(<em>Profile(Admin) is empty or missing.</em>);
      setState('idle');
      return;
    }
    try {
      const answer = localAi(q, knowledge);  // Make sure this is returning a valid answer
      if (!answer) {
        setAnswer(<em>No response found for your question.</em>);
      } else {
        setAnswer(answer);
      }
      setState('speaking');
      speakWithVoice(answer);
    } catch (e) {
      setError(`Internal error: ${String(e)}`);
      setAnswer(<em>Something went wrong. Try again.</em>);
      setState('idle');
    }
  }
  
  if (!open) return null;
  return (
    <div className="fixed z-[1001] inset-0 flex flex-col items-center justify-center bg-[#232325b0] backdrop-blur-lg">
      <div className="min-w-[300px] sm:w-[400px] bg-[#16181c] p-8 rounded-xl border border-gray-800 shadow-md flex flex-col items-center relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:bg-zinc-800 rounded p-1" title="Close" onClick={onClose}>
          <i className="fa fa-times text-2xl" />
        </button>
        <div className="mb-3 animate-pulse text-green-400 text-4xl">
          <i className="fa fa-microphone" />
        </div>
        <div className="font-semibold tracking-tight text-lg mb-2 text-white">Prabhat’s AI Voice Assistant</div>
        <div className="mb-1 p-2 py-4 w-full rounded bg-gray-900 text-gray-300 min-h-[44px]">
          {state === 'greet' && <span>This model is still in training phase please continue with chat model. Thank You !...</span>}
          {state === 'listening' && <span>Listening for your question...</span>}
          {state === 'thinking' && <span>Analyzing your request...</span>}
          {state === 'speaking' && <span><b>Q:</b> {transcript}<br /><b>A:</b> {typeof answer === 'string' ? answer : <>{answer}</>}</span>}
          {state === 'idle' && <span>Start the AI assistant by clicking below.</span>}
        </div>
        {!!error && <div className="text-red-400">{error}</div>}
        <button
          className="mt-6 px-6 py-3 bg-green-700 hover:bg-green-600 rounded-full text-white text-lg font-bold disabled:bg-gray-600"
          onClick={listen}
          disabled={state === 'thinking' || state === 'speaking'}
        >
          {state === 'idle' ? 'Ask with Voice'
           : state === 'listening' ? 'Click to speak...'
           : state === 'speaking' ? 'Speaking...' : 'Working...'}
        </button>
      </div>
    </div>
  );
}
