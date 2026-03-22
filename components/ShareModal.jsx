"use client";
import { useState } from "react";

const circles = [
  { icon: "🛍️", bg: "#1a0800", name: "E-commerce" },
  { icon: "💻", bg: "#0a0818", name: "SaaS Builders" },
  { icon: "✏️", bg: "#0a1200", name: "Freelancers" },
  { icon: "📱", bg: "#001018", name: "App Devs" },
];

const people = [
  {
    initials: "RK",
    color: "#ff6a00",
    name: "Ravi Kumar",
    role: "E-commerce Seller",
  },
  {
    initials: "SA",
    color: "#7c3aed",
    name: "Sneha Arora",
    role: "SaaS Founder",
  },
  { initials: "MJ", color: "#0891b2", name: "Mohammed J.", role: "Freelancer" },
  {
    initials: "PK",
    color: "#16a34a",
    name: "Priya Kapoor",
    role: "App Developer",
  },
];

const apps = [
  {
    icon: "💬",
    name: "WhatsApp",
    url: (text) => `https://wa.me/?text=${encodeURIComponent(text)}`,
  },
  {
    icon: "🐦",
    name: "Twitter",
    url: (text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  },
  {
    icon: "💼",
    name: "LinkedIn",
    url: (text) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(text)}`,
  },
  { icon: "📸", name: "Instagram", url: () => null },
  {
    icon: "✈️",
    name: "Telegram",
    url: (text) => `https://t.me/share/url?url=${encodeURIComponent(text)}`,
  },
  {
    icon: "👥",
    name: "Facebook",
    url: (text) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`,
  },
  {
    icon: "📧",
    name: "Email",
    url: (text) =>
      `mailto:?subject=Check this out on CircleUp&body=${encodeURIComponent(text)}`,
  },
  { icon: "⋯", name: "More", url: () => null },
];

export default function ShareModal({ isOpen, onClose, postText, postId }) {
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const postUrl = `https://circleup-yash.vercel.app/post/${postId || "12345"}`;

  const toggleCircle = (name) => {
    setSelectedCircles((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const togglePerson = (name) => {
    setSelectedPeople((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToApp = (app) => {
    const text = `${postText}\n\nShared from CircleUp: ${postUrl}`;
    const url = app.url(text);
    if (url) window.open(url, "_blank");
    else alert(`Share to ${app.name} — coming soon!`);
  };

  const handleSend = () => {
    if (selectedCircles.length === 0 && selectedPeople.length === 0) {
      alert("Please select at least one person or circle!");
      return;
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSelectedCircles([]);
      setSelectedPeople([]);
      onClose();
    }, 1500);
  };

  const filteredPeople = people.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#141414] border border-[#2c2c2c] rounded-2xl p-5 w-full max-w-md animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold">🔁 Share Post</p>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1e1e1e] text-white/50 hover:text-white flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Share to circles */}
        <p className="text-xs text-white/35 uppercase tracking-widest mb-2">
          Share to your circles
        </p>
        <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
          {circles.map((c) => (
            <div
              key={c.name}
              onClick={() => toggleCircle(c.name)}
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all ${selectedCircles.includes(c.name) ? "border-orange-500 bg-orange-500/15 scale-105" : "border-transparent hover:border-orange-500/50"}`}
                style={{
                  background: selectedCircles.includes(c.name) ? "" : c.bg,
                }}
              >
                {c.icon}
              </div>
              <span className="text-xs text-white/45 text-center w-14 truncate">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Send to people */}
        <p className="text-xs text-white/35 uppercase tracking-widest mb-2">
          Send to people
        </p>
        <input
          type="text"
          placeholder="🔍 Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500 mb-2 transition-colors"
        />
        <div className="flex flex-col gap-1 mb-4 max-h-36 overflow-y-auto">
          {filteredPeople.map((p) => (
            <div
              key={p.name}
              onClick={() => togglePerson(p.name)}
              className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all ${selectedPeople.includes(p.name) ? "bg-orange-500/08 border border-orange-500/20" : "hover:bg-[#1e1e1e]"}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: p.color }}
              >
                {p.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-white/35">{p.role}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition-all ${selectedPeople.includes(p.name) ? "bg-orange-500 border-orange-500 text-white" : "border-[#2c2c2c]"}`}
              >
                {selectedPeople.includes(p.name) && "✓"}
              </div>
            </div>
          ))}
        </div>

        {/* External apps */}
        <p className="text-xs text-white/35 uppercase tracking-widest mb-2">
          Share on
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {apps.map((app) => (
            <button
              key={app.name}
              onClick={() => shareToApp(app)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-[#2c2c2c] bg-[#1e1e1e] hover:border-orange-500 hover:bg-orange-500/08 transition-all"
            >
              <span className="text-xl">{app.icon}</span>
              <span className="text-xs text-white/45">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <p className="text-xs text-white/35 uppercase tracking-widest mb-2">
          Copy link
        </p>
        <div className="flex gap-2 mb-4">
          <input
            value={postUrl}
            readOnly
            className="flex-1 bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-xs text-white/40 outline-none"
          />
          <button
            onClick={copyLink}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${copied ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${sent ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
        >
          {sent
            ? "✓ Shared successfully!"
            : `Send ${selectedPeople.length + selectedCircles.length > 0 ? `(${selectedPeople.length + selectedCircles.length} selected)` : ""} →`}
        </button>
      </div>
    </div>
  );
}
