"use client";
import { useState } from "react";
import Link from "next/link";

const communities = [
  { id: 1, icon: "🛍️", bg: "#1a0800", name: "E-commerce Sellers", members: "4,210", desc: "Buy, sell, and scale your online store. Tips, tools, and wins shared daily.", activity: "320 posts/week", joined: true },
  { id: 2, icon: "💻", bg: "#0a0818", name: "SaaS Builders", members: "2,890", desc: "Build and grow software products. From idea to first 100 customers.", activity: "210 posts/week", joined: false },
  { id: 3, icon: "✏️", bg: "#0a1200", name: "Freelancers", members: "6,120", desc: "Find clients, set rates, and build a sustainable freelance career.", activity: "480 posts/week", joined: true },
  { id: 4, icon: "📱", bg: "#001018", name: "App Developers", members: "3,540", desc: "Mobile and web app builders sharing code, tips, and launch stories.", activity: "290 posts/week", joined: false },
  { id: 5, icon: "🌱", bg: "#001a08", name: "Sustainability Biz", members: "1,760", desc: "Build businesses that are good for people and the planet.", activity: "140 posts/week", joined: false },
  { id: 6, icon: "🎨", bg: "#180018", name: "Creators & Design", members: "5,300", desc: "Designers, artists, and content creators sharing work and feedback.", activity: "410 posts/week", joined: false },
];

const people = [
  { initials: "RK", color: "#ff6a00", name: "Ravi Kumar", role: "E-commerce Seller", mutual: 3 },
  { initials: "SA", color: "#7c3aed", name: "Sneha Arora", role: "SaaS Founder", mutual: 2 },
  { initials: "MJ", color: "#0891b2", name: "Mohammed J.", role: "Freelance Designer", mutual: 5 },
  { initials: "PK", color: "#16a34a", name: "Priya Kapoor", role: "App Developer", mutual: 1 },
];

const events = [
  { day: "18", month: "Mar", title: "Live Q&A — Scaling your Shopify store to ₹5L/month", meta: "🕐 7:00 PM IST · 👥 234 attending · 🛍️ E-commerce Sellers" },
  { day: "22", month: "Mar", title: "Workshop — Building your first SaaS in 30 days", meta: "🕐 6:00 PM IST · 👥 189 attending · 💻 SaaS Builders" },
  { day: "28", month: "Mar", title: "Freelancer Meetup — Chennai", meta: "🕐 5:00 PM IST · 👥 78 attending · ✏️ Freelancers" },
  { day: "02", month: "Apr", title: "AMA — How I got my first 1000 app users", meta: "🕐 8:00 PM IST · 👥 312 attending · 📱 App Developers" },
];

const trending = [
  { icon: "📈", bg: "#1a0800", tag: "#ShopifyTips", count: "234 posts today", desc: "The hottest Shopify growth hacks being shared this week." },
  { icon: "🤖", bg: "#0a0818", tag: "#AItools2026", count: "189 posts today", desc: "Best AI tools for entrepreneurs and creators in 2026." },
  { icon: "🏆", bg: "#0a1200", tag: "#FreelanceWin", count: "142 posts today", desc: "Freelancers sharing their biggest wins and milestones." },
];

const categories = ["✨ All","💼 Business","💻 Tech","🎨 Creative","🏋️ Health","📊 Finance","🎓 Education","🌱 Sustainability"];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("communities");
  const [activeCategory, setActiveCategory] = useState("✨ All");
  const [search, setSearch] = useState("");
  const [joinedComms, setJoinedComms] = useState(communities.filter(c => c.joined).map(c => c.id));
  const [connected, setConnected] = useState([]);
  const [rsvped, setRsvped] = useState([]);

  const toggleJoin = (id) => setJoinedComms(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleConnect = (name) => setConnected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  const toggleRSVP = (title) => setRsvped(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);

  const filteredComms = communities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Search Hero */}
        <div className="text-center py-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Explore <span className="text-orange-500">CircleUp</span></h1>
          <p className="text-white/40 text-sm mb-6">Discover communities, people, and events that match your interests</p>
          <div className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
              <input type="text" placeholder="Search communities, people, topics..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#141414] border border-[#2c2c2c] rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500 transition-colors" />
            </div>
            <button className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Search</button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap justify-center mb-7">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all ${activeCategory === cat ? "border-orange-500 text-orange-400 bg-orange-500/08" : "border-[#2c2c2c] text-white/45 hover:border-orange-500 hover:text-orange-400"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#1e1e1e] mb-6 gap-1">
          {[["communities","👥 Communities"],["people","👤 People"],["events","📅 Events"],["trending","🔥 Trending"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`text-sm px-4 py-2.5 border-b-2 transition-all mb-[-1px] ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Communities */}
        {activeTab === "communities" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">🔥 Popular Communities</h2>
              <span className="text-xs text-orange-400 cursor-pointer">See all →</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {filteredComms.map((c) => (
                <div key={c.id} className="bg-[#141414] border border-[#1e1e1e] hover:border-orange-500 rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-white">{c.name}</p>
                      <p className="text-xs text-white/35">{c.members} members</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-3">{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">{c.activity}</span>
                    <button onClick={() => toggleJoin(c.id)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${joinedComms.includes(c.id) ? "border-orange-500 text-orange-400 bg-orange-500/15" : "border-orange-500 text-orange-400 hover:bg-orange-500/10"}`}>
                      {joinedComms.includes(c.id) ? "✓ Joined" : "Join"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* People */}
        {activeTab === "people" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">👤 People you may know</h2>
              <span className="text-xs text-orange-400 cursor-pointer">See all →</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {people.map((p) => (
                <div key={p.name} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 text-center">
                  <div className="w-11 h-11 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold" style={{ background: p.color }}>{p.initials}</div>
                  <p className="text-xs font-semibold text-white mb-1">{p.name}</p>
                  <p className="text-xs text-white/35 mb-1">{p.role}</p>
                  <p className="text-xs text-white/25 mb-3">{p.mutual} mutual circles</p>
                  <button onClick={() => toggleConnect(p.name)}
                    className={`w-full py-1.5 rounded-lg border text-xs transition-all ${connected.includes(p.name) ? "border-orange-500 text-orange-400 bg-orange-500/08" : "border-[#2c2c2c] text-white/50 hover:border-orange-500 hover:text-orange-400"}`}>
                    {connected.includes(p.name) ? "✓ Connected" : "+ Connect"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Events */}
        {activeTab === "events" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">📅 Upcoming Events</h2>
              <span className="text-xs text-orange-400 cursor-pointer">See all →</span>
            </div>
            <div className="flex flex-col gap-3">
              {events.map((e) => (
                <div key={e.title} className="bg-[#141414] border border-[#1e1e1e] hover:border-[#2c2c2c] rounded-2xl p-4 flex items-center gap-4 transition-colors">
                  <div className="text-center min-w-[40px]">
                    <p className="text-xl font-bold text-orange-500 leading-none">{e.day}</p>
                    <p className="text-xs text-white/35 uppercase">{e.month}</p>
                  </div>
                  <div className="w-px h-10 bg-[#1e1e1e]" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-1">{e.title}</p>
                    <p className="text-xs text-white/35">{e.meta}</p>
                  </div>
                  <button onClick={() => toggleRSVP(e.title)}
                    className={`text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap ${rsvped.includes(e.title) ? "border-orange-500 text-orange-400 bg-orange-500/15" : "border-orange-500 text-orange-400 hover:bg-orange-500/10"}`}>
                    {rsvped.includes(e.title) ? "✓ Going" : "RSVP"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Trending */}
        {activeTab === "trending" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">🔥 Trending This Week</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {trending.map((t) => (
                <div key={t.tag} className="bg-[#141414] border border-[#1e1e1e] hover:border-orange-500 rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: t.bg }}>{t.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-orange-400">{t.tag}</p>
                      <p className="text-xs text-white/35">{t.count}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-3">{t.desc}</p>
                  <div className="flex justify-end">
                    <button className="text-xs px-3 py-1 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500/10 transition-all">Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}