"use client";
import { useState } from "react";

const myCircles = [
  { icon: "🛍️", bg: "#1a0800", name: "E-commerce Sellers", members: "4,210", activity: "320 posts/week", newPosts: 12, active: true },
  { icon: "✏️", bg: "#0a1200", name: "Freelancers", members: "6,120", activity: "480 posts/week", newPosts: 5, active: true },
  { icon: "💻", bg: "#0a0818", name: "SaaS Builders", members: "2,890", activity: "210 posts/week", newPosts: 3, active: false },
];

const discoverCircles = [
  { id: 1, icon: "📱", bg: "linear-gradient(135deg,#1a0800,#3d1500)", name: "App Developers", members: "3,540", activity: "290/week", desc: "Mobile and web app builders sharing code, tips, and launch stories." },
  { id: 2, icon: "🌱", bg: "linear-gradient(135deg,#001a08,#003d14)", name: "Sustainability Biz", members: "1,760", activity: "140/week", desc: "Build businesses that are good for people and the planet." },
  { id: 3, icon: "🎨", bg: "linear-gradient(135deg,#180018,#3d003d)", name: "Creators & Design", members: "5,300", activity: "410/week", desc: "Designers and content creators sharing work and getting feedback." },
  { id: 4, icon: "📊", bg: "linear-gradient(135deg,#001018,#002a3d)", name: "Finance & Investing", members: "2,100", activity: "180/week", desc: "Personal finance, investing, and wealth building for entrepreneurs." },
  { id: 5, icon: "🎓", bg: "linear-gradient(135deg,#1a1000,#3d2800)", name: "EdTech Builders", members: "890", activity: "95/week", desc: "Building the future of education with technology." },
  { id: 6, icon: "🏋️", bg: "linear-gradient(135deg,#1a0808,#3d1010)", name: "Health & Fitness Biz", members: "1,240", activity: "120/week", desc: "Entrepreneurs in the health, wellness, and fitness industry." },
];

const popularCircles = [
  { icon: "✏️", bg: "linear-gradient(135deg,#1a0800,#3d1500)", name: "Freelancers", members: "6,120", activity: "480/week", desc: "The biggest freelancer community on CircleUp.", rank: "#1", joined: true },
  { icon: "🎨", bg: "linear-gradient(135deg,#180018,#3d003d)", name: "Creators & Design", members: "5,300", activity: "410/week", desc: "Most active creative community on CircleUp.", rank: "#2", joined: false },
  { icon: "🛍️", bg: "linear-gradient(135deg,#1a0800,#3d1500)", name: "E-commerce Sellers", members: "4,210", activity: "320/week", desc: "Fastest growing e-commerce community in India.", rank: "#3", joined: true },
];

const emojis = ["🚀","💡","🎯","🌱","🎨","⚡","🤝","📊"];

export default function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState("my");
  const [joinedDiscover, setJoinedDiscover] = useState([]);
  const [joinedPopular, setJoinedPopular] = useState(popularCircles.filter(c => c.joined).map(c => c.name));
  const [modalOpen, setModalOpen] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [circleDesc, setCircleDesc] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🚀");
  const [privacy, setPrivacy] = useState("public");
  const [createdCircles, setCreatedCircles] = useState([]);

  const toggleDiscover = (id) => setJoinedDiscover(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const togglePopular = (name) => setJoinedPopular(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  const createCircle = () => {
    if (!circleName.trim()) return;
    setCreatedCircles([...createdCircles, { icon: selectedEmoji, bg: "#1a0800", name: circleName, members: "1", activity: "Just created", newPosts: 0, active: true, isAdmin: true }]);
    setCircleName(""); setCircleDesc(""); setModalOpen(false); setActiveTab("my");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">👥 Communities</h1>
            <p className="text-xs text-white/35 mt-1">Manage and discover your circles</p>
          </div>
          <button onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
            + Create Circle
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#1e1e1e] mb-6 gap-1">
          {[["my","My Circles"],["discover","Discover"],["popular","Popular"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`text-sm px-5 py-2.5 border-b-2 transition-all mb-[-1px] ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* My Circles */}
        {activeTab === "my" && (
          <div>
            <p className="text-xs text-white/35 mb-3">You are a member of {myCircles.length + createdCircles.length} circles</p>
            <div className="flex flex-col gap-2">
              {[...myCircles, ...createdCircles].map((c) => (
                <div key={c.name} className="bg-[#141414] border border-[#1e1e1e] hover:border-[#2c2c2c] rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-white/35">{c.members} members · {c.activity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.active && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                    {c.newPosts > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">{c.newPosts} new</span>}
                    {c.isAdmin && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">Admin</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discover */}
        {activeTab === "discover" && (
          <div className="grid grid-cols-3 gap-3">
            {discoverCircles.map((c) => (
              <div key={c.id} className="bg-[#141414] border border-[#1e1e1e] hover:border-orange-500 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5">
                <div className="h-16 flex items-center justify-center text-3xl" style={{ background: c.bg }}>{c.icon}</div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white mb-1">{c.name}</p>
                  <p className="text-xs text-white/45 leading-relaxed mb-3">{c.desc}</p>
                  <div className="flex gap-3 mb-3">
                    <span className="text-xs text-white/30">👥 {c.members}</span>
                    <span className="text-xs text-white/30">📝 {c.activity}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleDiscover(c.id)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${joinedDiscover.includes(c.id) ? "bg-transparent border border-orange-500 text-orange-400" : "bg-orange-500 hover:bg-orange-600 text-white border-none"}`}>
                      {joinedDiscover.includes(c.id) ? "✓ Joined" : "Join Circle"}
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs text-white/40 border border-[#2c2c2c] hover:text-white transition-colors">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular */}
        {activeTab === "popular" && (
          <div className="grid grid-cols-3 gap-3">
            {popularCircles.map((c) => (
              <div key={c.name} className="bg-[#141414] border border-[#1e1e1e] hover:border-orange-500 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5">
                <div className="h-16 flex items-center justify-center text-3xl relative" style={{ background: c.bg }}>
                  {c.icon}
                  <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400">🔥 {c.rank}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white mb-1">{c.name}</p>
                  <p className="text-xs text-white/45 leading-relaxed mb-3">{c.desc}</p>
                  <div className="flex gap-3 mb-3">
                    <span className="text-xs text-white/30">👥 {c.members}</span>
                    <span className="text-xs text-white/30">📝 {c.activity}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => togglePopular(c.name)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${joinedPopular.includes(c.name) ? "bg-transparent border border-orange-500 text-orange-400" : "bg-orange-500 hover:bg-orange-600 text-white border-none"}`}>
                      {joinedPopular.includes(c.name) ? "✓ Joined" : "Join Circle"}
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs text-white/40 border border-[#2c2c2c] hover:text-white transition-colors">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Create Circle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#2c2c2c] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-base font-bold mb-1">Create a Circle</h2>
            <p className="text-xs text-white/40 mb-5">Build your own community on CircleUp</p>

            <label className="text-xs text-white/50 font-medium mb-1.5 block">Circle name</label>
            <input type="text" placeholder="e.g. Indian Startup Founders" value={circleName}
              onChange={(e) => setCircleName(e.target.value)} maxLength={40}
              className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-orange-500 transition-colors mb-4" />

            <label className="text-xs text-white/50 font-medium mb-1.5 block">Description</label>
            <input type="text" placeholder="What is this community about?" value={circleDesc}
              onChange={(e) => setCircleDesc(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-orange-500 transition-colors mb-4" />

            <label className="text-xs text-white/50 font-medium mb-2 block">Pick an icon</label>
            <div className="flex gap-2 flex-wrap mb-4">
              {emojis.map((e) => (
                <button key={e} onClick={() => setSelectedEmoji(e)}
                  className={`w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all ${selectedEmoji === e ? "border-orange-500 bg-orange-500/10" : "border-[#2c2c2c] bg-[#1e1e1e] hover:border-orange-500"}`}>
                  {e}
                </button>
              ))}
            </div>

            <label className="text-xs text-white/50 font-medium mb-2 block">Privacy</label>
            <div className="flex gap-2 mb-5">
              {[["public","🌐 Public"],["private","🔒 Private"],["invite","✉️ Invite only"]].map(([key, label]) => (
                <button key={key} onClick={() => setPrivacy(key)}
                  className={`flex-1 py-2 rounded-xl text-xs transition-all border ${privacy === key ? "border-orange-500 text-orange-400 bg-orange-500/08" : "border-[#2c2c2c] text-white/40 hover:border-orange-500"}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 border border-[#2c2c2c] rounded-xl text-sm text-white/50">Cancel</button>
              <button onClick={createCircle}
                className="flex-[2] py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-colors">
                Create Circle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}