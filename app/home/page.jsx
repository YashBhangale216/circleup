"use client";
import { useState } from "react";
import Link from "next/link";
import ShareModal from "@/components/ShareModal";
import CommentSection from "@/components/CommentSection";
import PostMenu from "@/components/PostMenu";

// ── Sample posts data ──
const initialPosts = [
  {
    id: 1,
    following: true,
    initials: "RK",
    color: "#ff6a00",
    name: "Ravi Kumar",
    time: "2 hours ago",
    community: "E-commerce Sellers",
    niche: "🛍️ E-commerce",
    likes: 24,
    comments: 8,
    text: `Just crossed ₹1L revenue this month on my Shopify store! 🎉\n\nKey things that worked:\n→ Better product photos\n→ WhatsApp follow-ups\n→ Instagram Reels ads\n\nHappy to do an AMA!`,
    tags: ["#ecommerce", "#shopify", "#win"],
    liked: false,
  },
  {
    id: 2,
    following: false,
    initials: "SA",
    color: "#7c3aed",
    name: "Sneha Arora",
    time: "5 hours ago",
    community: "SaaS Builders",
    niche: "💻 SaaS",
    likes: 41,
    comments: 13,
    text: `Looking for a co-founder with frontend skills! I have the backend + product idea ready. Targeting the HR tech space. DM me with your portfolio. 🤝`,
    tags: ["#cofounder", "#saas", "#startup"],
    liked: false,
  },
  {
    id: 3,
    following: true,
    initials: "MJ",
    color: "#0891b2",
    name: "Mohammed J.",
    time: "Yesterday",
    community: "Freelancers",
    niche: "✏️ Freelance",
    likes: 87,
    comments: 22,
    text: `Best free tools for freelancers in 2026:\n🔧 Notion — project management\n💸 Wave — free invoicing\n📅 Cal.com — scheduling\n🎨 Canva — design\n\nAll on free tier. No excuses!`,
    tags: ["#freelance", "#tools"],
    liked: true,
  },
];

const navItems = [
  { icon: "🏠", label: "Home", href: "/home" },
  { icon: "🌐", label: "Explore", href: "/explore" },
  { icon: "👥", label: "Communities", href: "/communities" },
  { icon: "💬", label: "Chats", href: "/messages" },
  { icon: "🔔", label: "Notifications", href: "/notifications", badge: 3 },
  { icon: "📅", label: "Events", href: "/events" },
];

const myCircles = [
  { icon: "🛍️", label: "E-commerce", href: "/communities/ecommerce" },
  { icon: "💻", label: "SaaS Builders", href: "/communities/saas" },
  { icon: "✏️", label: "Freelancers", href: "/communities/freelancers" },
];

const suggestedCircles = [
  { icon: "📱", label: "App Developers", members: "3,540", bg: "#1a0a00" },
  { icon: "🌱", label: "Sustainability Biz", members: "1,760", bg: "#0a1a0a" },
  { icon: "🎨", label: "Creators & Design", members: "5,300", bg: "#0a0a1a" },
];

const trending = [
  { tag: "#ShopifyTips", count: "234 posts today" },
  { tag: "#AItools2026", count: "189 posts today" },
  { tag: "#FreelanceWin", count: "142 posts today" },
  { tag: "#StartupIndia", count: "98 posts today" },
];

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [postText, setPostText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);
  const [joinedCircles, setJoinedCircles] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [sharePost, setSharePost] = useState(null);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      initials: "YO",
      color: "#ff6a00",
      name: "Your Name",
      time: "Just now",
      community: "E-commerce Sellers",
      niche: "🛍️ E-commerce",
      likes: 0,
      comments: 0,
      text: postText,
      tags: [],
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const toggleJoin = (name) => {
    setJoinedCircles((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-[220px_1fr_260px] gap-4">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="flex flex-col gap-1 sticky top-21 h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
          {/* Logo */}
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="5"
                  stroke="white"
                  strokeWidth="1.8"
                  fill="none"
                />
                <circle cx="8" cy="8" r="2" fill="white" />
              </svg>
            </div>
            <span className="text-base font-bold">
              Circle<span className="text-orange-500">Up</span>
            </span>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${item.label === "Home" ? "bg-orange-500/10 text-orange-400 font-medium" : "text-white/50 hover:bg-[#1e1e1e] hover:text-white"}`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="h-px bg-[#1e1e1e] my-2" />
          <p className="text-xs text-white/25 uppercase tracking-widest px-3 mb-1">
            Your Circles
          </p>

          {myCircles.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:bg-[#1e1e1e] hover:text-white transition-all"
            >
              <span className="text-base w-5 text-center">{c.icon}</span>
              {c.label}
            </Link>
          ))}

          <div className="h-px bg-[#1e1e1e] my-2" />
          <Link
            href="/profile"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:bg-[#1e1e1e] hover:text-white transition-all"
          >
            <span className="text-base w-5 text-center">👤</span> Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:bg-[#1e1e1e] hover:text-white transition-all"
          >
            <span className="text-base w-5 text-center">⚙️</span> Settings
          </Link>

          <button
            onClick={() => (window.location.href = "/create-circle")}
            className="mt-3 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            + Create Circle
          </button>
        </aside>

        {/* ── MAIN HOME ── */}
        <main className="flex flex-col gap-3">
          {/* Topbar */}
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold">For You</h1>
            <div className="flex gap-1.5">
              {["All", "Following", "Trending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeFilter === f ? "border-orange-500 text-orange-400 bg-orange-500/08" : "border-[#2c2c2c] text-white/40 hover:border-orange-500 hover:text-orange-400"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
            <div className="flex gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                YO
              </div>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share something with your circles..."
                rows={2}
                className="flex-1 bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none resize-none focus:border-orange-500 transition-colors font-sans"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {["🖼️", "🔗", "📊", "📅"].map((icon) => (
                  <button
                    key={icon}
                    className="text-base px-2 py-1 rounded-lg text-white/35 hover:bg-[#1e1e1e] hover:text-white transition-all"
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePost}
                className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.filter((post) => {
            if (activeFilter === "Following") return post.following === true;
            if (activeFilter === "Trending") return post.likes >= 40;
            return true;
          }).length === 0 ? (
            <div className="flex flex-col items-center text-center py-16 text-white/25">
              <div className="text-4xl mb-3">👥</div>
              <p className="text-sm text-white/40">
                No posts from people you follow
              </p>
              <p className="text-xs mt-1 text-white/25">
                Go to Explore to find people to follow
              </p>
            </div>
          ) : (
            posts
              .filter((post) => {
                if (activeFilter === "Following")
                  return post.following === true;
                if (activeFilter === "Trending") return post.likes >= 40;
                return true;
              })
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-[#141414] border border-[#1e1e1e] hover:border-[#2c2c2c] rounded-2xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      onClick={() =>
                        (window.location.href = `/profile/${post.name.replace(/ /g, "-").toLowerCase()}`)
                      }
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ background: post.color }}
                    >
                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {post.name}
                      </p>
                      <p className="text-xs text-white/30">
                        {post.time} · {post.community}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 whitespace-nowrap">
                      {post.niche}
                    </span>
                    <PostMenu postId={post.id} authorName={post.name} />
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-3 whitespace-pre-line">
                    {post.text}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-orange-400 mr-2 cursor-pointer hover:underline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${post.liked ? "text-red-500" : "text-white/40 hover:text-red-400 hover:bg-[#1e1e1e]"}`}
                    >
                      <span
                        className={`transition-all duration-300 ${post.liked ? "scale-125" : "scale-100"}`}
                        style={{
                          display: "inline-block",
                          transform: post.liked ? "scale(1.3)" : "scale(1)",
                          transition:
                            "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        }}
                      >
                        {post.liked ? "❤️" : "🤍"}
                      </span>
                      {post.likes}
                    </button>
                    <button
                      onClick={() => {
                        setCommentPost(post);
                        setCommentOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all"
                    >
                      💬 {post.comments}
                    </button>
                    <button
                      onClick={() => {
                        setSharePost(post);
                        setShareOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] transition-all"
                    >
                      🔁 Share
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:bg-[#1e1e1e] hover:text-white transition-all">
                      🔖
                    </button>

                    <CommentSection
                      isOpen={commentOpen}
                      onClose={() => setCommentOpen(false)}
                      post={commentPost}
                    />
                  </div>
                </div>
              ))
          )}
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="flex flex-col gap-3">
          {/* Profile mini */}
          <div
            onClick={() => (window.location.href = "/profile")}
            className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 cursor-pointer hover:border-none transition-none"
          >
            <div className="flex flex-col items-center text-center mb-3">
              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-lg font-bold mb-2 border-4 border-orange-500/20">
                YO
              </div>
              <p
                onClick={() => (window.location.href = "/profile")}
                className="text-sm font-semibold cursor-pointer hover:none transition-none"
              >
                Your Name
              </p>
              <p className="text-xs text-white/40 mb-3">
                E-commerce Builder · Chennai
              </p>
              <div className="flex w-full border border-[#1e1e1e] rounded-xl overflow-hidden">
                {[
                  ["3", "Circles"],
                  ["48", "Connects"],
                  ["12", "Posts"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="flex-1 py-2 text-center border-r border-[#1e1e1e] last:border-r-0"
                  >
                    <p className="text-sm font-semibold">{num}</p>
                    <p className="text-xs text-white/30">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested circles */}
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
            <p className="text-sm font-semibold mb-3">🔥 Suggested Circles</p>
            {suggestedCircles.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 py-2 border-b border-[#1e1e1e] last:border-b-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: c.bg }}
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white">{c.label}</p>
                  <p className="text-xs text-white/30">{c.members} members</p>
                </div>
                <button
                  onClick={() => toggleJoin(c.label)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${joinedCircles.includes(c.label) ? "border-orange-500 bg-orange-500/15 text-orange-400" : "border-orange-500 text-orange-400 hover:bg-orange-500/10"}`}
                >
                  {joinedCircles.includes(c.label) ? "✓ Joined" : "Join"}
                </button>
              </div>
            ))}
          </div>

          {/* Trending */}
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
            <p className="text-sm font-semibold mb-3">📈 Trending Today</p>
            {trending.map((t) => (
              <div
                key={t.tag}
                className="py-2 border-b border-[#1e1e1e] last:border-b-0 cursor-pointer"
              >
                <p className="text-xs font-medium text-orange-400 hover:underline">
                  {t.tag}
                </p>
                <p className="text-xs text-white/30 mt-0.5">{t.count}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        postText={sharePost?.text}
        postId={sharePost?.id}
      />
    </div>
  );
}
