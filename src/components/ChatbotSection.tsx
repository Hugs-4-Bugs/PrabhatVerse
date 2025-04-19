import type React from "react";
import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function parseProfile(profile: string) {
  const sections = { about: "", services: "", education: "", skills: "", projects: "", technologies: "", blogs: "", contact: "", work: "", internship: "", program: "" };
  let cur = "";
  for (const line of profile.split(/\r?\n/)) {
    const sec = line.trim().toLowerCase();
    if (sec.startsWith("## about")) cur = "about";
    else if (sec.startsWith("## services")) cur = "services";
    else if (sec.startsWith("## education")) cur = "education";
    else if (sec.startsWith("## skills")) cur = "skills";
    else if (sec.startsWith("## projects")) cur = "projects";
    else if (sec.startsWith("## technology")) cur = "technologies";
    else if (sec.startsWith("## blogs")) cur = "blogs";
    else if (sec.startsWith("## contact")) cur = "contact";
    else if (sec.startsWith("## work experience")) cur = "work";
    else if (sec.startsWith("## internship")) cur = "internship";
    else if (sec.startsWith("## program participation")) cur = "program";
    else if (cur && sec.startsWith("##") === false) sections[cur] += line + "\n";
  }
  return sections;
}

// Only extract real bullets or numbered lines, tight clean output
function extractSectionBlock(section: string, profile: string): string[] {
  const lines = profile.split(/\r?\n/);
  const start = lines.findIndex(l => l.trim().toLowerCase().startsWith(`## ${section}`.toLowerCase()));
  if (start === -1) return [];
  const block = [];
  for (let i = start + 1; i < lines.length && !lines[i].trim().startsWith('## '); ++i) {
    const l = lines[i].trim();
    if ((/^(- |\d+\.)/.test(l) || (l.length > 2 && /^[A-Za-z0-9]/.test(l))) && !l.toLowerCase().includes("edit this file as your single source")) {
      block.push(l.replace(/^- |^\d+\./, '').trim());
    }
  }
  return block.filter(Boolean);
}

function MoreExpandableMarkdown({ content, maxItems = 7 }: { content: string[], maxItems?: number }) {
  const [showAll, setShowAll] = useState(false);
  const items = content.map(s => s.trim()).filter(l => !!l && l !== "-" && l !== ".");
  const displayItems = showAll ? items : items.slice(0, maxItems);
  return (
    <>
      <ReactMarkdown>{displayItems.map(s => `- ${s}`).join('\n')}</ReactMarkdown>
      {items.length > maxItems && (
        <span className="text-blue-400 cursor-pointer hover:underline ml-2 select-none" onClick={() => setShowAll(v => !v)}>
          {showAll ? 'See less' : '...see more'}
        </span>
      )}
    </>
  );
}

function extractSkillsGrouped(skillsBlock: string) {
  const grouped: Record<string, string[]> = {};
  let currentCat = "";
  for (const line of skillsBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([A-Za-z\s&+\/]+):\s*(.*)$/);
    if (match) {
      currentCat = match[1].trim();
      grouped[currentCat] = match[2].split(/,|·|•/).map(v => v.trim()).filter(Boolean);
    } else if (trimmed.startsWith("### ")) {
      currentCat = trimmed.replace(/^#+/, "").trim(); grouped[currentCat] = [];
    } else if (trimmed.startsWith("- ") && currentCat) {
      if (!grouped[currentCat]) grouped[currentCat] = [];
      grouped[currentCat].push(trimmed.slice(2).trim());
    }
  }
  const fallback = [];
  for (const [cat, arr] of Object.entries(grouped)) {
    if (!cat || arr.length < 2) fallback.push(...arr);
  }
  return { grouped, fallback };
}

function gptLocalSmartAnswer(query: string, profile: string): React.ReactNode {
  const s = parseProfile(profile);
  const q = query.toLowerCase();
  // --- Work experience and internship (group/result)
  if (/work ?experience|professional (history)?|company|employment|job|jobs|intern(ship)?/.test(q)) {
    const work = extractSectionBlock('work experience', profile);
    const intern = extractSectionBlock('internship', profile);
    const program = extractSectionBlock('program participation', profile);
    const blocks: any[] = [];
    if (work.length) blocks.push(<><b>Work Experience</b>{<MoreExpandableMarkdown content={work} maxItems={5} />}</>);
    if (intern.length) blocks.push(<><b>Internship</b>{<MoreExpandableMarkdown content={intern} maxItems={5} />}</>);
    if (program.length) blocks.push(<><b>Program Participation</b>{<MoreExpandableMarkdown content={program} maxItems={5} />}</>);
    return blocks.length ? blocks : <em>*Admin warning:* Please add ## Work Experience / Internship to your profile.*</em>;
  }
  // --- Coding Profiles ---
  if (/coding profiles?|competitive|leetcode|hackerrank|gfg|geeksforgeeks|github|stackoverflow/.test(q)) {
    const lines = extractSectionBlock('contact', profile).filter(l =>
      /(github|leetcode|hackerrank|codeforces|geeksforgeeks|stackoverflow)/i.test(l)
    );
    return lines.length
      ? <><div className="mb-1 font-semibold">Coding Profiles:</div>{lines.map(l => <ReactMarkdown key={l}>{l}</ReactMarkdown>)}</>
      : <em>*Admin warning:* Please add coding profile links as bullets under ## Contact.*</em>;
  }
  // --- Skills ---
  if (/skills?|technology|programming|languages?|stack|framework/.test(q)) {
    const { grouped, fallback } = extractSkillsGrouped(s.skills);
    const keys = Object.keys(grouped);
    if (keys.length > 0) {
      return (
        <>
          <div className="mb-1 font-semibold">Core skills:</div>
          {keys.map((cat) => (
            <div key={cat}><b>{cat}:</b> {grouped[cat].join(', ')}</div>
          ))}
        </>
      );
    }
    if (fallback.length > 0)
      return <MoreExpandableMarkdown content={fallback} />;
    return <em>*Admin warning:* Please add skills as bullets or grouped lines under ## Skills.*</em>;
  }
  // --- Projects ---
  if (/project|ai|works?|tools?|built|integration|assistant/.test(q)) {
    const projs = extractSectionBlock('projects', profile);
    return projs.length > 0
      ? <MoreExpandableMarkdown content={projs} />
      : <em>*Admin warning:* Please add projects as bullets in your profile.*</em>;
  }
  // --- Certifications ---
  if (/certificat|badge|achieve/.test(q)) {
    const lines = extractSectionBlock('certifications', profile);
    return lines.length > 0
      ? <MoreExpandableMarkdown content={lines} />
      : <em>*Admin warning:* Please add certifications as bullets in your profile.*</em>;
  }
  // --- Education ---
  if (/education|degree|college|university|school/.test(q)) {
    const edus = extractSectionBlock('education', profile);
    return edus.length > 0
      ? <MoreExpandableMarkdown content={edus} />
      : <em>*Admin warning:* Please add education as bullets in your profile.*</em>;
  }
  // --- Trading ---
  if (/trading|market|liquid|trend|algo|mirror|fvg|block|breakout/.test(q)) {
    const lines = extractSectionBlock('trading concepts', profile);
    return lines.length > 0
      ? <MoreExpandableMarkdown content={lines} />
      : <em>*Admin warning:* Please add trading concepts as bullets in your profile.*</em>;
  }
  // General fallback: fuzzy line
  const lines = profile.split(/\r?\n/).filter(l => l.length > 10 && !l.toLowerCase().includes("edit this file as your single source"));
  const piece = lines.find(l => q.split(" ").some(w => l.toLowerCase().includes(w)));
  if (piece) return piece;
  return "I'm Prabhat Kumar—engineer, founder, and creator. Ask me about my skills, experience, coding links, or projects!";
}

export default function ChatbotSection({ messages, setMessages }: {
  messages: { sender: "bot" | "user", text: string | React.ReactNode, voice?: boolean }[],
  setMessages: (m: { sender: "bot" | "user", text: string | React.ReactNode, voice?: boolean }[]) => void,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("_profile_admin_md");
    if (stored) setProfile(stored);
    else fetch("/src/data/master_profile.md").then(res => res.text()).then(setProfile);
  }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Patched chat mic: speech-to-text only
  function handleVoice() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (ev) => {
      setInput(ev.results[0][0].transcript);
    };
    recognition.onerror = () => alert("Could not get voice input.");
    recognition.start();
  }

  function handleSend(aiText?: string, voice?: boolean) {
    const text = (aiText ?? input).trim();
    if (!text) return;
    setMessages([...messages, { sender: "user", text, voice }]);
    setLoading(true);
    setInput("");
    setTimeout(() => {
      const answer = gptLocalSmartAnswer(text, profile);
      setMessages(msgs => [...msgs, { sender: "bot", text: answer }]);
      setLoading(false);
    }, 200);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.key === "Enter" && !e.shiftKey)) { e.preventDefault(); handleSend(); }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-3">
        <div className="flex flex-col gap-3 pt-7">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-xl px-4 py-2 max-w-[80%] font-normal ${m.sender === 'user' ? 'bg-green-700 text-white self-end' : 'bg-[#232325] text-gray-100 shadow-sm self-start'} text-base whitespace-pre-line`}>
                {typeof m.text === 'string' || typeof m.text === 'undefined'
                  ? <ReactMarkdown components={{a: props => <a {...props} target="_blank" rel="noopener noreferrer" />}}>{m.text || "(blank)"}</ReactMarkdown>
                  : m.text
                }
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start"><div className="rounded-xl px-4 py-2 max-w-[80%] bg-[#232325] text-gray-400">Thinking...</div></div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form className="border-t border-gray-700 bg-[#262626] flex items-center gap-2 px-3 py-2"
        onSubmit={e => { e.preventDefault(); handleSend(); }}>
        <textarea
          className="flex-1 resize-none rounded bg-[#18181b] border border-gray-700 p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700 min-h-[44px] max-h-[120px]"
          rows={1}
          placeholder="Type your message... Ask me anything about Prabhat Kumar."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
        <button type="button" className="p-2 rounded-full bg-gray-800 text-white hover:bg-green-700 disabled:bg-gray-700 transition" disabled={loading} title="Use Speech to Text" onClick={handleVoice}>
          <i className="fa fa-microphone" />
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white font-semibold text-base disabled:bg-gray-600" disabled={!input.trim() || loading}>
          Send
        </button>
      </form>
    </div>
  );
}

export { gptLocalSmartAnswer };
