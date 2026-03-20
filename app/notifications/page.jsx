"use client";
import { useState } from "react";

const initialNotifs = [
  { id: 1, tab: ["all","mentions"], initials: "RK", color: "#ff6a00", name: "Ravi Kumar", text: "liked your post", typeIcon: "👍", typeColor: "#ef4444", preview: '"Just crossed ₹1L revenue this month on my Shopify store! 🎉"', time: "2 minutes ago", unread: true, actions: [] },
  { id: 2, tab: ["all","mentions"], initials: "SA", color: "#7c3aed", name: "Sneha Arora", text: "commented on your post", typeIcon: "💬", typeColor: "#3b82f6", preview: '"This is exactly what I needed! Which logistics partner do you recommend?"', time: "15 minutes ago", unread: true, actions: ["Reply","View post"] },
  { id: 3, tab: ["all","requests"], initials: "MJ", color: "#0891b2", name: "Mohammed J.", text: "sent you a connection request", typeIcon: "🤝", typeColor: "#ff6a00", preview: "Freelance Designer · 5 mutual circles", time: "1 hour ago", unread: true, actions: ["Accept","Decline"], isRequest: true },
  { id: 4, tab: ["all","circles"], initials: "🛍️", color: "#1e1e1e", name: "E-commerce Sellers", text: "New post in E-commerce Sellers", typeIcon: "📝", typeColor: "#22c55e", preview: '"Best payment gateways for Indian sellers in 2026 — my honest review"', time: "2 hours ago", unread: true, actions: [], isCircle: true },
  { id: 5, tab: ["all","circles"], initials: "PK", color: "#16a34a", name: "Priya Kapoor", text: "saved your post", typeIcon: "🔖", typeColor: "#8b5cf6", preview: "", time: "3 hours ago", unread: true, actions: [] },
  { id: 6, tab: ["all","circles"], initials: "📅", color: "#1e1e1e", name: "Event Reminder", text: 'Upcoming: Live Q&A — Scaling your Shopify store', typeIcon: "📅", typeColor: "#f59e0b", preview: "Starting in 2 hours · 7:00 PM IST", time: "Today", unread: true, actions: ["Join event","Remind me"] },
  { id: 7, tab: ["all"], initials: "VR", color: "#b45309", name: "Vijay Rao", text: "and 3 others liked your post", typeIcon: "👍", typeColor: "#ef4444", preview: "", time: "Yesterday", unread: false, actions: [] },
  { id: 8, tab: ["all","circles"], initials: "✏️", color: "#1e1e1e", name: "Freelancers", text: "Freelancers circle hit 6,000 members! 🎉", typeIcon: "🎉", typeColor: "#22c55e", preview: "", time: "2 days ago", unread: false, actions: [] },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [activeTab, setActiveTab] = useState("all");
  const [requestStatus, setRequestStatus] = useState({});

  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })));

  const unreadCount = notifs.filter(n => n.unread && n.tab.includes("all")).length;
  const filtered = notifs.filter(n => n.tab.includes(activeTab));

  const tabCounts = {
    all: notifs.filter(n => n.unread && n.tab.includes("all")).length,
    mentions: notifs.filter(n => n.unread && n.tab.includes("mentions")).length,
    circles: notifs.filter(n => n.unread && n.tab.includes("circles")).length,
    requests: notifs.filter(n => n.unread && n.tab.includes("requests")).length,
  };

  const handleAction = (notifId, action) => {
    if (action === "Accept" || action === "Decline") {
      setRequestStatus(prev => ({ ...prev, [notifId]: action === "Accept" ? "accepted" : "declined" }));
      markRead(notifId);
    }
  };

  const newNotifs = filtered.filter(n => n.unread);
  const oldNotifs = filtered.filter(n => !n.unread);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">🔔 Notifications</h1>
            <p className="text-xs text-white/35 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up! 🎉"}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={markAllRead}
              className="text-xs px-4 py-2 border border-[#2c2c2c] rounded-lg text-white/50 hover:border-orange-500 hover:text-orange-400 transition-all">
              Mark all read
            </button>
            <button className="text-xs px-4 py-2 border border-[#2c2c2c] rounded-lg text-white/50 hover:border-orange-500 hover:text-orange-400 transition-all">
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#1e1e1e] mb-6 gap-1">
          {[["all","All"],["mentions","Mentions"],["circles","Circles"],["requests","Requests"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`text-sm px-4 py-2.5 border-b-2 transition-all mb-[-1px] flex items-center gap-1.5 ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
              {label}
              {tabCounts[key] > 0 && <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">{tabCounts[key]}</span>}
            </button>
          ))}
        </div>

        {/* New notifications */}
        {newNotifs.length > 0 && (
          <>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">New</p>
            {newNotifs.map((n) => (
              <NotifCard key={n.id} notif={n} onRead={markRead} onAction={handleAction} reqStatus={requestStatus[n.id]} />
            ))}
          </>
        )}

        {/* Earlier notifications */}
        {oldNotifs.length > 0 && (
          <>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3 mt-5">Earlier</p>
            {oldNotifs.map((n) => (
              <NotifCard key={n.id} notif={n} onRead={markRead} onAction={handleAction} reqStatus={requestStatus[n.id]} />
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/25">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-sm">No notifications here</p>
          </div>
        )}

      </div>
    </div>
  );
}

function NotifCard({ notif, onRead, onAction, reqStatus }) {
  return (
    <div onClick={() => onRead(notif.id)}
      className={`flex gap-3 p-4 rounded-2xl mb-2 cursor-pointer transition-all border ${notif.unread ? "border-l-[3px] border-l-orange-500 border-t-[#1e1e1e] border-r-[#1e1e1e] border-b-[#1e1e1e] bg-orange-500/04" : "border-[#1e1e1e] hover:border-[#2c2c2c]"} bg-[#141414]`}>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: notif.color }}>
          {notif.initials}
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs border-2 border-[#0d0d0d]" style={{ background: notif.typeColor }}>
          {notif.typeIcon}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/75 leading-relaxed mb-1">
          <span className="font-semibold text-white">{notif.name}</span> {notif.text}
        </p>
        {notif.preview && (
          <p className="text-xs text-white/40 bg-[#1e1e1e] rounded-lg px-3 py-2 mb-2 leading-relaxed">{notif.preview}</p>
        )}
        <p className="text-xs text-white/30">{notif.time}</p>

        {/* Actions */}
        {notif.actions.length > 0 && !reqStatus && (
          <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
            {notif.actions.map((action) => (
              <button key={action} onClick={() => onAction(notif.id, action)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${action === "Accept" || action === "Reply" || action === "Join event" ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600" : "bg-transparent text-white/50 border-[#2c2c2c] hover:border-orange-500 hover:text-orange-400"}`}>
                {action}
              </button>
            ))}
          </div>
        )}

        {reqStatus && (
          <p className={`text-xs mt-2 ${reqStatus === "accepted" ? "text-green-400" : "text-white/30"}`}>
            {reqStatus === "accepted" ? "✓ Connected!" : "Declined"}
          </p>
        )}
      </div>

      {/* Unread dot */}
      {notif.unread && <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1" />}
    </div>
  );
}