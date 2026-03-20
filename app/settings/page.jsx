"use client";
import { useState } from "react";

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${on ? "bg-orange-500" : "bg-[#2c2c2c]"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [toast, setToast] = useState("");

  // Profile state
  const [fname, setFname] = useState("Your");
  const [lname, setLname] = useState("Name");
  const [username, setUsername] = useState("@yourname");
  const [bio, setBio] = useState("Building CircleUp — a niche community platform for entrepreneurs and creators.");
  const [location, setLocation] = useState("Chennai, India");
  const [website, setWebsite] = useState("circleup.app");

  // Notification toggles
  const [notifs, setNotifs] = useState({ messages: true, likes: true, connections: true, circles: false, events: true, digest: true, updates: false, marketing: false });

  // Privacy
  const [privacy, setPrivacy] = useState({ online: true, receipts: true, indexing: false });
  const [profileVis, setProfileVis] = useState("Everyone (Public)");
  const [msgVis, setMsgVis] = useState("Everyone");

  // Account
  const [twoFA, setTwoFA] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const navItems = [
    { section: "account", items: [
      { id: "profile", icon: "👤", label: "Profile" },
      { id: "account", icon: "🔐", label: "Account" },
      { id: "subscription", icon: "💳", label: "Subscription", badge: "Free" },
    ]},
    { section: "preferences", items: [
      { id: "notifications", icon: "🔔", label: "Notifications" },
      { id: "privacy", icon: "🔒", label: "Privacy" },
      { id: "appearance", icon: "🎨", label: "Appearance" },
    ]},
    { section: "support", items: [
      { id: "help", icon: "❓", label: "Help & Support" },
      { id: "danger", icon: "⚠️", label: "Danger Zone", red: true },
    ]},
  ];

  const inputClass = "w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500 transition-colors";
  const cardClass = "bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3";

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-5">

        {/* SIDEBAR NAV */}
        <div className="w-56 flex-shrink-0">
          <h1 className="text-base font-bold mb-4">⚙️ Settings</h1>
          {navItems.map((group) => (
            <div key={group.section}>
              <p className="text-xs text-white/25 uppercase tracking-widest px-2 mb-1 mt-3">{group.section}</p>
              {group.items.map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all mb-0.5 ${activeSection === item.id ? "bg-orange-500/10 text-orange-400 font-medium" : item.red ? "text-red-400 hover:bg-red-500/10" : "text-white/50 hover:bg-[#141414] hover:text-white"}`}>
                  <span className="w-5 text-center text-base">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* Profile */}
          {activeSection === "profile" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Profile Settings</h2>
              <p className="text-xs text-white/35 mb-5">Update your public profile information</p>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-4">👤 Basic Info</p>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1"><label className="text-xs text-white/45 mb-1.5 block">First name</label><input className={inputClass} value={fname} onChange={e => setFname(e.target.value)} /></div>
                  <div className="flex-1"><label className="text-xs text-white/45 mb-1.5 block">Last name</label><input className={inputClass} value={lname} onChange={e => setLname(e.target.value)} /></div>
                </div>
                <label className="text-xs text-white/45 mb-1.5 block">Username</label>
                <input className={`${inputClass} mb-3`} value={username} onChange={e => setUsername(e.target.value)} />
                <label className="text-xs text-white/45 mb-1.5 block">Bio</label>
                <textarea className={`${inputClass} mb-3 resize-none font-sans`} rows={3} value={bio} onChange={e => setBio(e.target.value)} />
                <div className="flex gap-3 mb-4">
                  <div className="flex-1"><label className="text-xs text-white/45 mb-1.5 block">Location</label><input className={inputClass} value={location} onChange={e => setLocation(e.target.value)} /></div>
                  <div className="flex-1"><label className="text-xs text-white/45 mb-1.5 block">Website</label><input className={inputClass} value={website} onChange={e => setWebsite(e.target.value)} /></div>
                </div>
                <button onClick={() => showToast("Profile saved!")} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Save changes</button>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🖼️ Profile Photo</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-lg font-bold">{fname[0]}{lname[0]}</div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-[#2c2c2c] rounded-xl text-sm text-white hover:border-orange-500 transition-colors">Upload photo</button>
                    <button className="px-4 py-2 border border-red-500/50 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account */}
          {activeSection === "account" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Account Settings</h2>
              <p className="text-xs text-white/35 mb-5">Manage your login credentials and security</p>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">📧 Email Address</p>
                <label className="text-xs text-white/45 mb-1.5 block">Current email</label>
                <input className={`${inputClass} mb-4`} defaultValue="you@example.com" />
                <button onClick={() => showToast("Email updated!")} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Update email</button>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🔑 Change Password</p>
                {["Current password","New password","Confirm new password"].map((label) => (
                  <div key={label} className="mb-3">
                    <label className="text-xs text-white/45 mb-1.5 block">{label}</label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                ))}
                <button onClick={() => showToast("Password changed!")} className="mt-1 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Change password</button>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🔐 Two-Factor Authentication</p>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Enable 2FA</p><p className="text-xs text-white/35">Add extra security to your account</p></div>
                  <Toggle on={twoFA} onChange={setTwoFA} />
                </div>
              </div>
            </div>
          )}

          {/* Subscription */}
          {activeSection === "subscription" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Subscription</h2>
              <p className="text-xs text-white/35 mb-5">Manage your CircleUp plan</p>
              <div className={`${cardClass} border-orange-500/20 bg-orange-500/04`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">Current Plan</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">Free</span>
                </div>
                <p className="text-sm text-white/50 mb-4">Upgrade to unlock unlimited circles, direct messaging, AI assistant, and more.</p>
                <button onClick={() => showToast("Redirecting to payment...")} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Upgrade to Pro — ₹199/mo</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Free", price: "₹0", features: ["2 circles","10 posts/mo"], current: true },
                  { name: "Pro ⭐", price: "₹199", features: ["Unlimited circles","DMs + AI assistant"], highlight: true },
                  { name: "Business", price: "₹499", features: ["Everything in Pro","Analytics + API"] },
                ].map((plan) => (
                  <div key={plan.name} className={`${cardClass} text-center mb-0 ${plan.highlight ? "border-orange-500/40" : ""}`}>
                    <p className="text-sm font-bold mb-1">{plan.name}</p>
                    <p className="text-2xl font-bold text-orange-500 mb-2">{plan.price}</p>
                    {plan.features.map(f => <p key={f} className="text-xs text-white/40 mb-1">✓ {f}</p>)}
                    <button onClick={() => !plan.current && showToast("Redirecting to payment...")}
                      className={`w-full mt-3 py-2 rounded-xl text-xs font-semibold transition-colors ${plan.current ? "bg-white/5 text-white/40 cursor-default" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                      {plan.current ? "Current plan" : "Upgrade"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Notification Settings</h2>
              <p className="text-xs text-white/35 mb-5">Choose what notifications you receive</p>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">📱 Push Notifications</p>
                {[
                  { key: "messages", label: "New messages", desc: "When someone sends you a message" },
                  { key: "likes", label: "Likes & comments", desc: "When someone engages with your posts" },
                  { key: "connections", label: "Connection requests", desc: "When someone wants to connect" },
                  { key: "circles", label: "Circle activity", desc: "New posts in your circles" },
                  { key: "events", label: "Event reminders", desc: "Reminders for upcoming events" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2.5 border-b border-[#1e1e1e] last:border-b-0">
                    <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-white/35">{item.desc}</p></div>
                    <Toggle on={notifs[item.key]} onChange={(v) => setNotifs(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">📧 Email Notifications</p>
                {[
                  { key: "digest", label: "Weekly digest", desc: "Best posts from your circles every Monday" },
                  { key: "updates", label: "Product updates", desc: "New features and announcements" },
                  { key: "marketing", label: "Marketing emails", desc: "Tips, guides, and promotions" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2.5 border-b border-[#1e1e1e] last:border-b-0">
                    <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-white/35">{item.desc}</p></div>
                    <Toggle on={notifs[item.key]} onChange={(v) => setNotifs(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeSection === "privacy" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Privacy Settings</h2>
              <p className="text-xs text-white/35 mb-5">Control who can see your profile and activity</p>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">👁️ Profile Visibility</p>
                <label className="text-xs text-white/45 mb-1.5 block">Who can see your profile?</label>
                <select value={profileVis} onChange={e => setProfileVis(e.target.value)} className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500 mb-3">
                  <option>Everyone (Public)</option><option>Only connections</option><option>Only me</option>
                </select>
                <label className="text-xs text-white/45 mb-1.5 block">Who can send you messages?</label>
                <select value={msgVis} onChange={e => setMsgVis(e.target.value)} className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500 mb-4">
                  <option>Everyone</option><option>Only connections</option><option>Nobody</option>
                </select>
                <button onClick={() => showToast("Privacy settings saved!")} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">Save</button>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🔒 Activity Privacy</p>
                {[
                  { key: "online", label: "Show online status", desc: "Let others see when you're active" },
                  { key: "receipts", label: "Show read receipts", desc: "Let others know when you've read their messages" },
                  { key: "indexing", label: "Allow profile indexing", desc: "Let search engines find your profile" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2.5 border-b border-[#1e1e1e] last:border-b-0">
                    <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-white/35">{item.desc}</p></div>
                    <Toggle on={privacy[item.key]} onChange={(v) => setPrivacy(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Appearance</h2>
              <p className="text-xs text-white/35 mb-5">Customize how CircleUp looks</p>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🌙 Theme</p>
                <div className="flex gap-3">
                  {[["🌙 Dark", true],["☀️ Light", false],["💻 System", false]].map(([label, active]) => (
                    <div key={label} className={`flex-1 py-3 rounded-xl border text-center text-sm cursor-pointer transition-all ${active ? "border-orange-500 bg-orange-500/08 text-orange-400" : "border-[#2c2c2c] text-white/40 hover:border-orange-500/50"}`}>{label}</div>
                  ))}
                </div>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">🎨 Accent Color</p>
                <div className="flex gap-3">
                  {["#ff6a00","#3b82f6","#22c55e","#7c3aed","#ec4899"].map((color, i) => (
                    <div key={color} className={`w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-110 ${i === 0 ? "ring-2 ring-white ring-offset-2 ring-offset-[#141414]" : ""}`} style={{ background: color }} />
                  ))}
                </div>
              </div>
              <div className={cardClass}>
                <p className="text-sm font-semibold mb-3">📝 Font Size</p>
                <select className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500">
                  <option>Small</option><option selected>Medium</option><option>Large</option>
                </select>
              </div>
            </div>
          )}

          {/* Help */}
          {activeSection === "help" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Help & Support</h2>
              <p className="text-xs text-white/35 mb-5">Get help with CircleUp</p>
              <div className={cardClass}>
                {[
                  { icon: "📖", title: "Documentation", desc: "Read guides and tutorials" },
                  { icon: "💬", title: "Live Chat Support", desc: "Chat with our team" },
                  { icon: "📧", title: "Email Support", desc: "support@circleup.app" },
                  { icon: "🐛", title: "Report a Bug", desc: "Help us improve CircleUp" },
                ].map((item) => (
                  <div key={item.title} onClick={() => showToast(`Opening ${item.title}...`)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#1e1e1e] mb-2 last:mb-0 cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1"><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-white/35">{item.desc}</p></div>
                    <span className="text-white/30">→</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === "danger" && (
            <div>
              <h2 className="text-lg font-bold mb-1">Danger Zone</h2>
              <p className="text-xs text-white/35 mb-5">Irreversible actions — proceed with caution</p>
              {[
                { title: "Export Data", desc: "Download all your data including posts, messages, and profile info.", btn: "Export", action: "Data export started!", red: false },
                { title: "Deactivate Account", desc: "Temporarily disable your account. You can reactivate anytime.", btn: "Deactivate", action: "Deactivation email sent!", red: true },
                { title: "Delete Account", desc: "Permanently delete your account and all data. This cannot be undone.", btn: "Delete", action: "Account deletion requested!", red: true },
              ].map((item) => (
                <div key={item.title} className={`${cardClass} border-red-500/20`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <button onClick={() => showToast(item.action)}
                      className={`px-4 py-2 rounded-xl text-sm transition-colors ${item.red ? "border border-red-500/50 text-red-400 hover:bg-red-500/10" : "border border-[#2c2c2c] text-white hover:border-orange-500"}`}>
                      {item.btn}
                    </button>
                  </div>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-xl z-50">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}