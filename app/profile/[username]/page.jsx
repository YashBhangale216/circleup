"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const users = {
  "ravi-kumar": {
    initials: "RK", color: "#ff6a00", name: "Ravi Kumar",
    role: "E-commerce Seller", location: "Mumbai, India", joined: "January 2026",
    bio: "Building my e-commerce empire one Shopify store at a time. Crossed ₹5L/month revenue. Love sharing what works! 🛍️",
    tags: ["🛍️ E-commerce", "💡 Shopify", "📱 Instagram Ads"],
    links: ["🌐 ravistore.in", "🐦 @ravikumar"],
    stats: { circles: 4, connections: 124, likes: 892, posts: 47 },
    circles: [
      { icon: "🛍️", bg: "#1a0800", name: "E-commerce Sellers" },
      { icon: "💻", bg: "#0a0818", name: "SaaS Builders" },
    ],
    achievements: [
      { icon: "🚀", name: "Early Adopter", desc: "Joined in the first month" },
      { icon: "🏆", name: "Top Contributor", desc: "500+ likes received" },
    ],
    posts: [
      { id: 1, niche: "🛍️ E-commerce", time: "2 hours ago", text: "Just crossed ₹1L revenue this month on my Shopify store! 🎉\n\nKey things that worked:\n→ Better product photos\n→ WhatsApp follow-ups\n→ Instagram Reels ads", likes: 24, comments: 8, liked: false, tags: ["#ecommerce", "#shopify"] },
      { id: 2, niche: "💡 Tips", time: "Yesterday", text: "3 things I learned after 2 years of e-commerce:\n→ Product photos matter more than the product\n→ WhatsApp follow-ups convert better than email\n→ Start with one niche, not everything", likes: 67, comments: 15, liked: false, tags: ["#tips"] },
    ],
  },
  "sneha-arora": {
    initials: "SA", color: "#7c3aed", name: "Sneha Arora",
    role: "SaaS Founder", location: "Bangalore, India", joined: "February 2026",
    bio: "Building HR tech SaaS for Indian SMEs. Looking for co-founders and early customers. Let's build something amazing! 💻",
    tags: ["💻 SaaS", "🎯 Product", "👥 HR Tech"],
    links: ["🌐 snehaarora.com", "💼 linkedin.com/in/snehaarora"],
    stats: { circles: 3, connections: 89, likes: 412, posts: 23 },
    circles: [
      { icon: "💻", bg: "#0a0818", name: "SaaS Builders" },
      { icon: "🎨", bg: "#180018", name: "Creators & Design" },
    ],
    achievements: [
      { icon: "🚀", name: "Early Adopter", desc: "Joined in the first month" },
      { icon: "💬", name: "Conversation Starter", desc: "Started 10+ discussions" },
    ],
    posts: [
      { id: 1, niche: "💻 SaaS", time: "5 hours ago", text: "Looking for a co-founder with frontend skills! I have the backend + product idea ready. DM me with your portfolio. 🤝", likes: 41, comments: 13, liked: false, tags: ["#cofounder", "#saas"] },
    ],
  },
  "mohammed-j": {
    initials: "MJ", color: "#0891b2", name: "Mohammed J.",
    role: "Freelance Designer", location: "Chennai, India", joined: "March 2026",
    bio: "Freelance designer helping startups build beautiful products. 5+ years experience. Open for new projects! 🎨",
    tags: ["🎨 Design", "✏️ Freelance", "💡 UI/UX"],
    links: ["🌐 mohammeddesigns.com", "🐦 @mohammedj_"],
    stats: { circles: 5, connections: 203, likes: 1240, posts: 78 },
    circles: [
      { icon: "✏️", bg: "#0a1200", name: "Freelancers" },
      { icon: "🎨", bg: "#180018", name: "Creators & Design" },
    ],
    achievements: [
      { icon: "🚀", name: "Early Adopter", desc: "Joined in the first month" },
      { icon: "⭐", name: "Top Contributor", desc: "1000+ likes received" },
    ],
    posts: [
      { id: 1, niche: "✏️ Freelance", time: "Yesterday", text: "Best free tools for freelancers in 2026:\n🔧 Notion\n💸 Wave\n📅 Cal.com\n🎨 Canva\n\nAll on free tier. No excuses!", likes: 87, comments: 22, liked: false, tags: ["#freelance", "#tools"] },
    ],
  },
};

export default function UserProfilePage() {
  const { username } = useParams();
  const user = users[username] || null;
  const [connected, setConnected] = useState(false);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState(user?.posts || []);

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">👤</div>
        <h2 className="text-xl font-bold">User not found</h2>
        <p className="text-white/40 text-sm">This profile does not exist</p>
        <Link href="/feed" className="px-5 py-2.5 bg-orange-500 rounded-xl text-sm font-semibold text-white">
          Go back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Cover */}
        <div className="h-36 rounded-2xl relative mb-14"
          style={{ background: `linear-gradient(135deg, #1a0800, ${user.color})` }}>
          <div className="absolute -bottom-11 left-6">
            <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-2xl font-bold border-4 border-[#0d0d0d]"
              style={{ background: user.color }}>
              {user.initials}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold mb-1">{user.name}</h1>
            <p className="text-sm text-white/50 mb-1">{user.role}</p>
            <p className="text-xs text-white/35">📍 {user.location} · Joined {user.joined}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setConnected(!connected)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${connected ? "border border-green-500 text-green-400 bg-green-500/10" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
              {connected ? "✓ Connected" : "+ Connect"}
            </button>
            <button onClick={() => setFollowing(!following)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${following ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-orange-500 text-orange-400 hover:bg-orange-500/10"}`}>
              {following ? "✓ Following" : "Follow"}
            </button>
            <Link href="/messages"
              className="w-9 h-9 border border-[#2c2c2c] rounded-xl text-white/50 hover:border-orange-500 hover:text-white transition-all flex items-center justify-center text-sm">
              💬
            </Link>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-white/60 leading-relaxed mb-3">{user.bio}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3">
          {user.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-5 flex-wrap">
          {user.links.map((link) => (
            <span key={link} className="text-xs text-white/40 hover:text-orange-400 cursor-pointer transition-colors">{link}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[["Circles", user.stats.circles],["Connections", user.stats.connections],["Likes", user.stats.likes],["Posts", user.stats.posts]].map(([label, num]) => (
            <div key={label} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{num}</p>
              <p className="text-xs text-white/35 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-[1fr_220px] gap-4">
          <div>
            {/* Tabs */}
            <div className="flex border-b border-[#1e1e1e] mb-4 gap-1">
              {[["posts","Posts"],["about","About"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`text-sm px-4 py-2.5 border-b-2 transition-all mb-[-1px] ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Posts */}
            {activeTab === "posts" && posts.map((post) => (
              <div key={post.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: user.color }}>{user.initials}</div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{user.name}</p>
                    <p className="text-xs text-white/30">{post.time}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">{post.niche}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-2 whitespace-pre-line">{post.text}</p>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-orange-400 mr-2">{tag}</span>
                ))}
                <div className="flex gap-1 mt-2">
                  <button onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${post.liked ? "text-orange-400 bg-orange-500/10" : "text-white/40 hover:bg-[#1e1e1e]"}`}>
                    👍 {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all">
                    💬 {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all">
                    🔁 Share
                  </button>
                </div>
              </div>
            ))}

            {/* About */}
            {activeTab === "about" && (
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                <p className="text-sm font-semibold mb-3">About</p>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 text-sm text-white/60"><span>💼</span><span>{user.role}</span></div>
                  <div className="flex gap-3 text-sm text-white/60"><span>📍</span><span>{user.location}</span></div>
                  <div className="flex gap-3 text-sm text-white/60"><span>📅</span><span>Joined {user.joined}</span></div>
                  {user.links.map((link) => (
                    <div key={link} className="flex gap-3 text-sm text-white/60"><span>🔗</span><span>{link}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
              <p className="text-sm font-semibold mb-3">🔵 Circles</p>
              {user.circles.map((c) => (
                <div key={c.name} className="flex items-center gap-2 py-2 border-b border-[#1e1e1e] last:border-b-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: c.bg }}>{c.icon}</div>
                  <p className="text-xs text-white">{c.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <p className="text-sm font-semibold mb-3">🏆 Achievements</p>
              {user.achievements.map((a) => (
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