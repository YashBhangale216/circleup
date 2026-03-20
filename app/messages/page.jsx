"use client";
import { useState, useRef, useEffect } from "react";

const initialChats = [
  {
    id: 1,
    initials: "RK",
    color: "#ff6a00",
    name: "Ravi Kumar",
    role: "E-commerce Seller",
    online: true,
    preview: "Thanks! I'll check that out 👍",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    initials: "SA",
    color: "#7c3aed",
    name: "Sneha Arora",
    role: "SaaS Founder",
    online: false,
    preview: "Are you still looking for a co-founder?",
    time: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    initials: "MJ",
    color: "#0891b2",
    name: "Mohammed J.",
    role: "Freelancer",
    online: true,
    preview: "Great tips, saved this thread!",
    time: "3h ago",
    unread: 1,
  },
  {
    id: 4,
    initials: "PK",
    color: "#16a34a",
    name: "Priya Kapoor",
    role: "App Developer",
    online: false,
    preview: "Can we schedule a call this week?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 5,
    initials: "VR",
    color: "#b45309",
    name: "Vijay Rao",
    role: "E-commerce Seller",
    online: false,
    preview: "Sent you the Notion template",
    time: "Mon",
    unread: 0,
  },
];

const chatHistory = {
  1: [
    {
      from: "them",
      text: "Hey! I saw your post about e-commerce tips. Really helpful!",
      time: "10:24 AM",
    },
    {
      from: "me",
      text: "Thanks Ravi! Happy it helped. Have you tried Shiprocket for logistics?",
      time: "10:26 AM",
    },
    {
      from: "them",
      text: "Not yet! Is it better than Delhivery?",
      time: "10:28 AM",
    },
    {
      from: "me",
      text: "Much better for returns management. Check their dashboard.",
      time: "10:30 AM",
    },
    { from: "them", text: "Thanks! I'll check that out 👍", time: "10:31 AM" },
  ],
  2: [
    {
      from: "them",
      text: "Hi! I saw you're building a community app. Interesting!",
      time: "9:00 AM",
    },
    {
      from: "me",
      text: "Yes! CircleUp — connecting people in niches.",
      time: "9:05 AM",
    },
    {
      from: "them",
      text: "Are you still looking for a co-founder?",
      time: "9:10 AM",
    },
  ],
  3: [
    {
      from: "them",
      text: "Your post about free tools was 🔥",
      time: "Yesterday",
    },
    { from: "me", text: "Thanks! Glad it was useful.", time: "Yesterday" },
    { from: "them", text: "Great tips, saved this thread!", time: "Yesterday" },
  ],
  4: [
    {
      from: "them",
      text: "Hey! I saw you're also building an app.",
      time: "Monday",
    },
    { from: "me", text: "Yes! What stack are you using?", time: "Monday" },
    { from: "them", text: "Can we schedule a call this week?", time: "Monday" },
  ],
  5: [
    {
      from: "them",
      text: "Here's that Notion template I mentioned.",
      time: "Monday",
    },
    { from: "them", text: "Sent you the Notion template", time: "Monday" },
  ],
};

const autoReplies = [
  "That's great! 🙌",
  "Thanks for sharing!",
  "Interesting point!",
  "I'll look into that.",
  "Makes sense! 👍",
  "Awesome! Let's connect soon.",
];

export default function MessagesPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [messages, setMessages] = useState(chatHistory[1]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const openChat = (chat) => {
    setActiveChat(chat);
    setMessages(chatHistory[chat.id] || []);
    setChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)),
    );
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time =
      now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
    const newMsg = { from: "me", text: input, time };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "them",
          text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
          time,
        },
      ]);
    }, 2000);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-screen bg-[#0d0d0d] text-white flex">
      <div className="flex w-full h-full">
        {/* INBOX */}
        <div className="w-72 flex-shrink-0 border-r border-[#1e1e1e] flex flex-col bg-[#0d0d0d]">
          <div className="p-4 border-b border-[#1e1e1e]">
            <h2 className="text-base font-bold mb-3">💬 Messages</h2>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#141414] border border-[#1e1e1e] rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder:text-white/25 outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => openChat(chat)}
                className={`flex items-center gap-2.5 p-3 cursor-pointer border-b border-[#141414] transition-colors ${activeChat.id === chat.id ? "bg-orange-500/08 border-r-2 border-r-orange-500" : "hover:bg-[#141414]"}`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: chat.color }}
                  >
                    {chat.initials}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0d0d0d]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    onClick={() =>
                      (window.location.href = `/profile/${chat.name.toLowerCase().replace(/ /g, "-").replace(/\./g, "")}`)
                    }
                    className="text-sm font-medium text-white cursor-pointer hover:text-orange-400 transition-colors"
                  >
                    {chat.name}
                  </p>
                  <p className="text-xs text-white/35 truncate">
                    {chat.preview}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className="text-xs text-white/25">{chat.time}</p>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-xs text-white font-medium">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col bg-[#0d0d0d]">
          {/* Header */}
          <div className="p-3 border-b border-[#1e1e1e] flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: activeChat.color }}
            >
              {activeChat.initials}
            </div>
            <div className="flex-1">
              <p
                onClick={() =>
                  (window.location.href = `/profile/${activeChat.name.toLowerCase().replace(/ /g, "-").replace(/\./g, "")}`)
                }
                className="text-sm font-semibold cursor-pointer hover:text-orange-400 transition-colors"
              >
                {activeChat.name}
              </p>
              <p
                className={`text-xs ${activeChat.online ? "text-green-400" : "text-white/30"}`}
              >
                {activeChat.online ? "● Online" : "● Offline"}
              </p>
            </div>
            <div className="flex gap-1.5">
              {["📞", "📹", "👤", "···"].map((icon) => (
                <button
                  key={icon}
                  className="w-8 h-8 rounded-lg border border-[#1e1e1e] bg-transparent text-white/40 hover:border-orange-500 hover:text-white text-sm flex items-center justify-center transition-all"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
            <div className="text-center text-xs text-white/25 py-1">Today</div>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[72%] ${msg.from === "me" ? "self-end flex-row-reverse" : ""}`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-auto"
                  style={{
                    background:
                      msg.from === "me" ? "#ff6a00" : activeChat.color,
                  }}
                >
                  {msg.from === "me" ? "YO" : activeChat.initials}
                </div>
                <div>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.from === "me" ? "bg-orange-500 text-white rounded-br-sm" : "bg-[#1e1e1e] text-white/85 rounded-bl-sm"}`}
                  >
                    {msg.text}
                  </div>
                  <p className="text-xs text-white/25 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 max-w-[72%]">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-auto"
                  style={{ background: activeChat.color }}
                >
                  {activeChat.initials}
                </div>
                <div className="px-4 py-3 bg-[#1e1e1e] rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-[#1e1e1e] flex items-end gap-2">
            <div className="flex gap-1">
              {["📎", "🖼️", "😊"].map((icon) => (
                <button
                  key={icon}
                  className="w-8 h-8 text-sm text-white/35 hover:text-white transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-[#141414] border border-[#1e1e1e] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none resize-none focus:border-orange-500 transition-colors font-sans"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center flex-shrink-0 transition-colors text-base"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
