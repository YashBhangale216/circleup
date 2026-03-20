"use client";
import { useState } from "react";

const myPosts = [
  { id: 1, time: "2 hours ago", niche: "🛍️ E-commerce", text: "Just launched CircleUp beta! 🎉 It's a niche community platform where entrepreneurs connect and help each other grow. Would love your feedback!", likes: 24, comments: 8, liked: false },
  { id: 2, time: "Yesterday", niche: "💡 Tips", text: "3 things I learned after 1 year of e-commerce:\n→ Product photos matter more than the product\n→ WhatsApp follow-ups convert better than email\n→ Start with one niche, not everything", likes: 67, comments: 15, liked: true },
  { id: 3, time: "3 days ago", niche: "🛍️ E-commerce", text: "Best Shopify apps in 2026 that actually moved the needle: Loox for reviews, Klaviyo for email, and Tidio for live chat. All worth every rupee!", likes: 41, comments: 9, liked: false },
];

const connections = [
  { initials: "RK", color: "#ff6a00", name: "Ravi Kumar", role: "E-commerce Seller" },
  { initials: "SA", color: "#7c3aed", name: "Sneha Arora", role: "SaaS Founder" },
  { initials: "MJ", color: "#0891b2", name: "Mohammed J.", role: "Freelancer" },
  { initials: "PK", color: "#16a34a", name: "Priya Kapoor", role: "App Developer" },
];

const achievements = [
  { icon: "🚀", name: "Early Adopter", desc: "Joined in the first month" },
  { icon: "💬", name: "Conversation Starter", desc: "Started 10+ discussions" },
  { icon: "🤝", name: "Connector", desc: "Made 25+ connections" },
  { icon: "⭐", name: "Top Contributor", desc: "100+ likes received" },
];

const myCircles = [
  { icon: "🛍️", bg: "#1a0800", name: "E-commerce", count: "4.2k" },
  { icon: "💻", bg: "#0a0818", name: "SaaS Builders", count: "2.9k" },
  { icon: "✏️", bg: "#0a1200", name: "Freelancers", count: "6.1k" },
];

const skills = ["E-commerce","Next.js","React","Digital Marketing","Shopify","Product Design"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState(myPosts);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Your Name");
  const [bio, setBio] = useState("Building CircleUp — a niche community platform for entrepreneurs and creators. E-commerce seller since 2023. Love helping others grow their online businesses. 🚀");

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Cover */}
        <div className="h-40 rounded-2xl bg-gradient-to-br from-[#1a0800] via-orange-600 to-orange-300 relative mb-14">
          <button className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full bg-black/50 border border-white/20 text-white">✏️ Edit cover</button>
          <div className="absolute -bottom-11 left-6">
            <div className="w-[88px] h-[88px] rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold border-4 border-[#0d0d0d] relative">
              {name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
              <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0d0d0d]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold">{name}</h1>
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-xs">✓</div>
            </div>
            <p className="text-sm text-white/50 mb-1">E-commerce Builder & Entrepreneur</p>
            <p className="text-xs text-white/35">📍 Chennai, India · Joined March 2026</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(!editing)}
              className="px-4 py-2 border border-orange-500 text-orange-400 text-sm rounded-xl hover:bg-orange-500/10 transition-colors">
              ✏️ Edit Profile
            </button>
            <button className="w-9 h-9 border border-[#2c2c2c] rounded-xl text-white/50 hover:border-orange-500 hover:text-white transition-all flex items-center justify-center">🔗</button>
            <button className="w-9 h-9 border border-[#2c2c2c] rounded-xl text-white/50 hover:border-orange-500 hover:text-white transition-all flex items-center justify-center">···</button>
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <div className="bg-[#141414] border border-orange-500/30 rounded-2xl p-4 mb-4">
            <p className="text-sm font-semibold mb-3">Edit Profile</p>
            <label className="text-xs text-white/50 mb-1 block">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-orange-500 mb-3" />
            <label className="text-xs text-white/50 mb-1 block">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
              className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-orange-500 resize-none font-sans mb-3" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditing(false)} className="px-4 py-2 border border-[#2c2c2c] rounded-xl text-sm text-white/50">Cancel</button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-orange-500 rounded-xl text-sm text-white font-semibold">Save</button>
            </div>
          </div>
        )}

        {/* Bio */}
        <p className="text-sm text-white/60 leading-relaxed mb-3 max-w-lg">{bio}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3">
          {["🛍️ E-commerce","💡 Entrepreneur","📱 App Builder","🎯 Growth Hacker"].map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-5 flex-wrap">
          {["🌐 circleup.app","🐦 @circleup","💼 linkedin.com/in/yourname"].map((link) => (
            <span key={link} className="text-xs text-white/40 hover:text-orange-400 cursor-pointer transition-colors">{link}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[["3","Circles"],["48","Connections"],["156","Likes"],["12","Posts"]].map(([num, label]) => (
            <div key={label} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{num}</p>
              <p className="text-xs text-white/35 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-[1fr_230px] gap-4">

          {/* LEFT */}
          <div>
            {/* Tabs */}
            <div className="flex border-b border-[#1e1e1e] mb-4 gap-1">
              {[["posts","Posts"],["about","About"],["connections","Connections"],["media","Media"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`text-sm px-4 py-2.5 border-b-2 transition-all mb-[-1px] ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Posts */}
            {activeTab === "posts" && posts.map((post) => (
              <div key={post.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold flex-shrink-0">YO</div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{name}</p>
                    <p className="text-xs text-white/30">{post.time}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">{post.niche}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-3 whitespace-pre-line">{post.text}</p>
                <div className="flex gap-1">
                  <button onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${post.liked ? "text-orange-400 bg-orange-500/10" : "text-white/40 hover:bg-[#1e1e1e]"}`}>
                    👍 {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all">💬 {post.comments}</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all">🔁 Share</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all">🔖</button>
                </div>
              </div>
            ))}

            {/* About */}
            {activeTab === "about" && (
              <div className="flex flex-col gap-3">
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                  <p className="text-sm font-semibold mb-3">About me</p>
                  {[["🎯","Building CircleUp — a niche community platform"],["🛍️","E-commerce seller since 2023 — Shopify + Instagram"],["📍","Chennai, Tamil Nadu, India"],["🎓","B.Tech Computer Science"],["🌐","circleup.app"]].map(([icon, text]) => (
                    <div key={text} className="flex gap-3 mb-2 text-sm text-white/60"><span>{icon}</span><span>{text}</span></div>
                  ))}
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                  <p className="text-sm font-semibold mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => <span key={s} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400">{s}</span>)}
                  </div>
                </div>
              </div>
            )}

            {/* Connections */}
            {activeTab === "connections" && (
              <div className="grid grid-cols-2 gap-3">
                {connections.map((c) => (
                  <div key={c.name} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: c.color }}>{c.initials}</div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-white/35">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Media */}
            {activeTab === "media" && (
              <div className="grid grid-cols-3 gap-2">
                {[["🛍️","#1a0800","#ff6a00"],["💻","#0a0818","#7c3aed"],["📊","#001018","#0891b2"],["🚀","#0a1200","#16a34a"],["🎯","#1a1000","#b45309"],["🎨","#180018","#7c3aed"]].map(([icon, from, to], i) => (
                  <div key={i} className="h-24 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>{icon}</div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
              <p className="text-sm font-semibold mb-3">🔵 My Circles</p>
              {myCircles.map((c) => (
                <div key={c.name} className="flex items-center gap-2 py-2 border-b border-[#1e1e1e] last:border-b-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                  <p className="text-xs text-white flex-1">{c.name}</p>
                  <p className="text-xs text-white/30">{c.count}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <p className="text-sm font-semibold mb-3">🏆 Achievements</p>
              {achievements.map((a) => (
                <div key={a.name} className="flex items-center gap-2.5 py-2 border-b border-[#1e1e1e] last:border-b-0">
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{a.name}</p>
                    <p className="text-xs text-white/35">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}