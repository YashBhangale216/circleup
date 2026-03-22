"use client";
import { useState, useRef, useEffect } from "react";

const menuItems = [
  { icon: "🚫", label: "Not interested in this post" },
  { icon: "👤", label: "Unfollow", dynamic: true },
  { icon: "📋", label: "Add to Bookmarks" },
  { icon: "🔇", label: "Mute", dynamic: true },
  { icon: "⛔", label: "Block", dynamic: true },
  { icon: "📊", label: "View post activity" },
  { icon: "🔗", label: "Copy link to post" },
  { icon: "🚩", label: "Report post", red: true },
];

export default function PostMenu({ postId, authorName }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleAction = (label) => {
    if (label === "Copy link to post") {
      navigator.clipboard.writeText(`https://circleup-yash.vercel.app/post/${postId}`);
      setDone(prev => ({ ...prev, [label]: true }));
      setTimeout(() => setDone(prev => ({ ...prev, [label]: false })), 2000);
    } else {
      setDone(prev => ({ ...prev, [label]: true }));
      setTimeout(() => {
        setDone(prev => ({ ...prev, [label]: false }));
        setOpen(false);
      }, 1000);
    }
  };

  const getLabel = (item) => {
    if (!item.dynamic) return item.label;
    if (item.label === "Unfollow") return `Unfollow @${authorName?.toLowerCase().replace(/ /g, "") || "user"}`;
    if (item.label === "Mute") return `Mute @${authorName?.toLowerCase().replace(/ /g, "") || "user"}`;
    if (item.label === "Block") return `Block @${authorName?.toLowerCase().replace(/ /g, "") || "user"}`;
    return item.label;
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Three dots button */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-[#1e1e1e] transition-all text-sm">
        ···
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 top-9 bg-[#1a1a1a] border border-[#2c2c2c] rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[240px]"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          {menuItems.map((item) => (
            <button key={item.label}
              onClick={() => handleAction(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left hover:bg-[#2c2c2c] ${item.red ? "text-red-400 hover:text-red-300" : "text-white"}`}>
              <span className="text-base w-5 text-center">{done[item.label] ? "✓" : item.icon}</span>
              <span>{done[item.label] ? (item.label === "Copy link to post" ? "Copied!" : "Done!") : getLabel(item)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}