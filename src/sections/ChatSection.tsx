// import React from "react";
// import ChatbotSection from "../components/ChatbotSection";
// export default function ChatSection() {
//   return <ChatbotSection />;
// }








import React, { useState } from "react";
import ChatbotSection from "../components/ChatbotSection";

// Define the type for messages
type Message = {
  sender: "bot" | "user";
  text: string | React.ReactNode;
  voice?: boolean;
};

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);

  return <ChatbotSection messages={messages} setMessages={setMessages} />;
}