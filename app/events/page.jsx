"use client";
import { useState } from "react";

const events = {
  upcoming: [
    { id: 1, day: "15", month: "Mar", badge: "🔴 Live Now", badgeType: "live", title: "Live Q&A — Scaling your Shopify store to ₹5L/month", time: "7:00 PM IST", location: "Online (Zoom)", circle: "🛍️ E-commerce Sellers", host: "Ravi Kumar", attendees: 234, going: false, featured: true },
    { id: 2, day: "18", month: "Mar", badge: "💻 SaaS Builders", badgeType: "normal", title: "Workshop — Building your first SaaS in 30 days", time: "6:00 PM IST", location: "Online (Google Meet)", circle: "💻 SaaS Builders", host: "Sneha Arora", attendees: 189, going: false, featured: false },
    { id: 3, day: "22", month: "Mar", badge: "✏️ Freelancers", badgeType: "normal", title: "Freelancer Meetup — Chennai (In-person)", time: "5:00 PM IST", location: "Chennai, Tamil Nadu", circle: "✏️ Freelancers", host: "Mohammed J.", attendees: 78, going: true, featured: false },
    { id: 4, day: "02", month: "Apr", badge: "📱 App Developers", badgeType: "normal", title: "AMA — How I got my first 1000 app users", time: "8:00 PM IST", location: "Online (CircleUp Live)", circle: "📱 App Developers", host: "Priya Kapoor", attendees: 312, going: false, featured: false },
  ],
  past: [
    { id: 5, day: "10", month: "Mar", title: "Instagram Ads Workshop for E-commerce Sellers", attendees: 156, circle: "🛍️ E-commerce Sellers" },
    { id: 6, day: "05", month: "Mar", title: "SaaS Pricing Strategies — Live Panel", attendees: 203, circle: "💻 SaaS Builders" },
  ],
};

const calDays = [
  { day: 23, other: true }, { day: 24, other: true }, { day: 25, other: true },
  { day: 26, other: true }, { day: 27, other: true }, { day: 28, other: true },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 },
  { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15, today: true },
  { day: 16 }, { day: 17 }, { day: 18, event: true }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22, event: true },
  { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [rsvpd, setRsvpd] = useState(events.upcoming.filter(e => e.going).map(e => e.id));

  const toggleRSVP = (id) => setRsvpd(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const goingEvents = events.upcoming.filter(e => rsvpd.includes(e.id));

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">📅 Events</h1>
            <p className="text-xs text-white/35 mt-1">Upcoming events in your circles</p>
          </div>
          <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
            + Create Event
          </button>
        </div>

        <div className="grid grid-cols-[1fr_270px] gap-4">

          {/* LEFT */}
          <div>
            {/* Tabs */}
            <div className="flex border-b border-[#1e1e1e] mb-4 gap-1">
              {[["upcoming","Upcoming"],["going","Going"],["past","Past"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`text-sm px-5 py-2.5 border-b-2 transition-all mb-[-1px] ${activeTab === key ? "text-orange-400 border-orange-500" : "text-white/40 border-transparent hover:text-white"}`}>
                  {label}
                  {key === "going" && rsvpd.length > 0 && <span className="ml-1.5 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">{rsvpd.length}</span>}
                </button>
              ))}
            </div>

            {/* Upcoming */}
            {activeTab === "upcoming" && events.upcoming.map((e) => (
              <div key={e.id} className={`rounded-2xl p-4 mb-3 border cursor-pointer transition-all ${e.featured ? "border-orange-500/30 bg-orange-500/04" : "border-[#1e1e1e] hover:border-[#2c2c2c] bg-[#141414]"}`}>
                <div className="flex gap-4">
                  <div className="text-center min-w-[52px] bg-[#1e1e1e] rounded-xl p-2 flex-shrink-0">
                    <p className="text-2xl font-bold text-orange-500 leading-none">{e.day}</p>
                    <p className="text-xs text-white/40 uppercase mt-1">{e.month}</p>
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mb-2 ${e.badgeType === "live" ? "bg-green-500/15 text-green-400 border-green-500/20" : "bg-orange-500/15 text-orange-400 border-orange-500/20"}`}>
                      {e.badge}
                    </span>
                    <p className="text-sm font-semibold text-white mb-2">{e.title}</p>
                    <div className="flex gap-4 flex-wrap">
                      <span className="text-xs text-white/40">🕐 {e.time}</span>
                      <span className="text-xs text-white/40">📍 {e.location}</span>
                      <span className="text-xs text-white/40">👤 By {e.host}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1e1e1e]">
                  <span className="text-xs text-white/35">{e.attendees} attending</span>
                  <button onClick={() => toggleRSVP(e.id)}
                    className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-all ${rsvpd.includes(e.id) ? "bg-transparent text-green-400 border border-green-500 hover:bg-green-500/10" : "bg-orange-500 text-white hover:bg-orange-600 border-none"}`}>
                    {rsvpd.includes(e.id) ? "✓ Going" : e.featured ? "Join Now →" : "RSVP"}
                  </button>
                </div>
              </div>
            ))}

            {/* Going */}
            {activeTab === "going" && (
              goingEvents.length > 0 ? goingEvents.map((e) => (
                <div key={e.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
                  <div className="flex gap-4">
                    <div className="text-center min-w-[52px] bg-[#1e1e1e] rounded-xl p-2 flex-shrink-0">
                      <p className="text-2xl font-bold text-orange-500 leading-none">{e.day}</p>
                      <p className="text-xs text-white/40 uppercase mt-1">{e.month}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white mb-2">{e.title}</p>
                      <div className="flex gap-4 flex-wrap">
                        <span className="text-xs text-white/40">🕐 {e.time}</span>
                        <span className="text-xs text-white/40">📍 {e.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button onClick={() => toggleRSVP(e.id)} className="text-xs px-4 py-1.5 rounded-lg border border-green-500 text-green-400 hover:bg-green-500/10 transition-all">✓ Going</button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 text-white/25">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-sm">You haven&apos;t RSVPed to any events yet</p>
                </div>
              )
            )}

            {/* Past */}
            {activeTab === "past" && events.past.map((e) => (
              <div key={e.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3 opacity-60">
                <div className="flex gap-4">
                  <div className="text-center min-w-[52px] bg-[#1e1e1e] rounded-xl p-2 flex-shrink-0">
                    <p className="text-2xl font-bold text-white/40 leading-none">{e.day}</p>
                    <p className="text-xs text-white/25 uppercase mt-1">{e.month}</p>
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40 bg-white/5 mb-2">Ended</span>
                    <p className="text-sm font-semibold text-white mb-2">{e.title}</p>
                    <div className="flex gap-4">
                      <span className="text-xs text-white/40">👥 {e.attendees} attended</span>
                      <span className="text-xs text-white/40">{e.circle}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#1e1e1e]">
                  <span className="text-xs text-white/30">Recording available</span>
                  <button className="text-xs px-4 py-1.5 rounded-lg border border-[#2c2c2c] text-white/40 hover:text-white transition-colors">Watch replay</button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            {/* Mini Calendar */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <button className="text-white/40 hover:text-white text-sm px-1">‹</button>
                <p className="text-sm font-semibold">March 2026</p>
                <button className="text-white/40 hover:text-white text-sm px-1">›</button>
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <div key={i} className="text-center text-xs text-white/25 py-1">{d}</div>
                ))}
                {calDays.map((d, i) => (
                  <div key={i} className={`text-center text-xs py-1.5 rounded-lg cursor-pointer relative ${d.today ? "bg-orange-500 text-white font-semibold" : d.other ? "text-white/15" : d.event ? "text-white" : "text-white/50 hover:bg-[#1e1e1e]"}`}>
                    {d.day}
                    {d.event && !d.today && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
              <p className="text-sm font-semibold mb-3">📊 Your Event Stats</p>
              {[["Events attended","12"],["Events going", String(rsvpd.length)],["Events created","0"],["Connections made","8"]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-[#1e1e1e] last:border-b-0">
                  <span className="text-xs text-white/50">{label}</span>
                  <span className="text-sm font-semibold text-orange-400">{val}</span>
                </div>
              ))}
            </div>

            {/* Recommended */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <p className="text-sm font-semibold mb-3">✨ Recommended for you</p>
              {[
                { title: "AI Tools Masterclass 2026", meta: "Apr 5 · Online · 🤖 AI & Automation" },
                { title: "Startup Pitch Night — Bangalore", meta: "Apr 10 · In-person · 🚀 Startups" },
              ].map((e) => (
                <div key={e.title} className="py-2.5 border-b border-[#1e1e1e] last:border-b-0 cursor-pointer">
                  <p className="text-xs font-medium text-white mb-1">{e.title}</p>
                  <p className="text-xs text-white/35">{e.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}