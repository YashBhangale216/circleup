"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const emojis = ["🚀","💡","🎯","🌱","🎨","⚡","🤝","📊","🏆","💎","🔥","✨"];
const colors = [
  "linear-gradient(135deg,#1a0800,#ff6a00)",
  "linear-gradient(135deg,#0a0818,#7c3aed)",
  "linear-gradient(135deg,#001018,#0891b2)",
  "linear-gradient(135deg,#0a1200,#16a34a)",
  "linear-gradient(135deg,#180018,#ec4899)",
  "linear-gradient(135deg,#1a1000,#b45309)",
];
const categories = ["💼 Business","💻 Tech","🎨 Creative","🏋️ Health","📊 Finance","🎓 Education","🌱 Sustainability","🤖 AI & Tech"];
const privacyOptions = [
  { id: "public", icon: "🌐", name: "Public", desc: "Anyone can join" },
  { id: "private", icon: "🔒", name: "Private", desc: "Request to join" },
  { id: "invite", icon: "✉️", name: "Invite Only", desc: "By invitation" },
];

export default function CreateCirclePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🚀");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [selectedCategory, setSelectedCategory] = useState("💼 Business");
  const [rules, setRules] = useState(["Be respectful to all members", "No spam or self-promotion"]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const addRule = () => setRules([...rules, ""]);
  const removeRule = (i) => setRules(rules.filter((_, idx) => idx !== i));
  const updateRule = (i, val) => setRules(rules.map((r, idx) => idx === i ? val : r));

  const handleCreate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Circle name is required";
    if (!desc.trim()) errs.desc = "Description is required";
    setErrors(errs);
    if (!Object.keys(errs).length) setSuccess(true);
  };

  const privacyLabel = privacyOptions.find(p => p.id === selectedPrivacy);

  const inputClass = "w-full bg-[#1e1e1e] border rounded-xl px-3 py-2.5 text-sm text-white outline-none transition-colors font-sans";

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-xs text-white/40 hover:text-white mb-4 transition-colors">
          ← Back to Communities
        </button>
        <h1 className="text-2xl font-bold mb-1">Create a Circle</h1>
        <p className="text-sm text-white/40 mb-6">Build your own niche community on CircleUp</p>

        <div className="grid grid-cols-[1fr_270px] gap-4">

          {/* FORM */}
          <div>
            {/* Basic Info */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-5 mb-3">
              <p className="text-sm font-semibold mb-4">📝 Basic Information</p>
              <label className="text-xs text-white/45 mb-1.5 block">Circle name *</label>
              <input value={name} onChange={e => setName(e.target.value)} maxLength={50}
                placeholder="e.g. Indian Startup Founders"
                className={`${inputClass} mb-1 ${errors.name ? "border-red-500" : "border-[#2c2c2c] focus:border-orange-500"}`} />
              {errors.name && <p className="text-xs text-red-400 mb-3">{errors.name}</p>}
              {!errors.name && <div className="mb-3" />}

              <label className="text-xs text-white/45 mb-1.5 block">Description *</label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} maxLength={200}
                placeholder="What is this circle about? What will members discuss and learn?"
                className={`${inputClass} resize-none mb-1 ${errors.desc ? "border-red-500" : "border-[#2c2c2c] focus:border-orange-500"}`} />
              <div className="flex justify-between items-center mb-3">
                {errors.desc ? <p className="text-xs text-red-400">{errors.desc}</p> : <span />}
                <p className="text-xs text-white/25">{desc.length}/200</p>
              </div>

              <label className="text-xs text-white/45 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all font-sans ${selectedCategory === cat ? "border-orange-500 text-orange-400 bg-orange-500/08" : "border-[#2c2c2c] text-white/45 hover:border-orange-500 hover:text-orange-400"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon & Color */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-5 mb-3">
              <p className="text-sm font-semibold mb-4">🎨 Icon & Color</p>
              <label className="text-xs text-white/45 mb-2 block">Pick an icon</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {emojis.map((e) => (
                  <button key={e} onClick={() => setSelectedEmoji(e)}
                    className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition-all ${selectedEmoji === e ? "border-orange-500 bg-orange-500/15 shadow-[0_0_0_2px_rgba(255,106,0,0.3)]" : "border-[#2c2c2c] bg-[#1e1e1e] hover:border-orange-500"}`}>
                    {e}
                  </button>
                ))}
              </div>
              <label className="text-xs text-white/45 mb-2 block">Banner color</label>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full transition-all ${selectedColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#141414] scale-110" : "hover:scale-105"}`}
                    style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-5 mb-3">
              <p className="text-sm font-semibold mb-4">🔒 Privacy</p>
              <div className="grid grid-cols-3 gap-3">
                {privacyOptions.map((opt) => (
                  <div key={opt.id} onClick={() => setSelectedPrivacy(opt.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${selectedPrivacy === opt.id ? "border-orange-500 bg-orange-500/08" : "border-[#2c2c2c] bg-[#1e1e1e] hover:border-orange-500/50"}`}>
                    <div className="text-xl mb-1.5">{opt.icon}</div>
                    <p className="text-xs font-medium text-white mb-0.5">{opt.name}</p>
                    <p className="text-xs text-white/35">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-5 mb-4">
              <p className="text-sm font-semibold mb-4">📋 Community Rules <span className="text-xs text-white/30 font-normal">(optional)</span></p>
              <div className="flex flex-col gap-2 mb-3">
                {rules.map((rule, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={rule} onChange={e => updateRule(i, e.target.value)}
                      placeholder={`Rule ${i + 1}: `}
                      className="flex-1 bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-orange-500 transition-colors" />
                    <button onClick={() => removeRule(i)}
                      className="w-8 h-8 rounded-xl border border-[#2c2c2c] text-white/40 hover:border-red-500 hover:text-red-400 transition-all flex items-center justify-center text-sm">✕</button>
                  </div>
                ))}
              </div>
              <button onClick={addRule}
                className="w-full py-2 border border-dashed border-orange-500/40 rounded-xl text-xs text-orange-400 hover:bg-orange-500/05 transition-colors font-sans">
                + Add rule
              </button>
            </div>

            {/* Submit */}
            <button onClick={handleCreate}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0">
              🚀 Create Circle
            </button>
          </div>

          {/* PREVIEW */}
          <div>
            <p className="text-xs text-white/35 mb-2">👁 Live Preview</p>
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden sticky top-4">
              <div className="h-20 flex items-center justify-center text-4xl" style={{ background: selectedColor }}>{selectedEmoji}</div>
              <div className="p-4">
                <p className="text-sm font-bold text-white mb-1">{name || "Your Circle Name"}</p>
                <p className="text-xs text-white/45 leading-relaxed mb-3">{desc || "Your circle description will appear here..."}</p>
                <div className="flex gap-3 mb-3">
                  <span className="text-xs text-white/35">👥 1 member</span>
                  <span className="text-xs text-white/35">📝 0 posts/week</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 inline-block mb-3">
                  {privacyLabel?.icon} {privacyLabel?.name}
                </span>
                <button className="w-full py-2 bg-orange-500 text-white text-xs font-semibold rounded-xl">Join Circle</button>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mt-3">
              <p className="text-xs font-semibold mb-3">💡 Tips for a great circle</p>
              {["Use a clear, specific name","Write a compelling description","Set clear community rules","Start with 3-5 posts after creating","Invite friends to join first"].map((tip) => (
                <p key={tip} className="text-xs text-white/50 mb-1.5">✓ {tip}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-orange-500/30 rounded-2xl p-8 text-center max-w-sm w-full">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">Circle Created!</h2>
            <p className="text-sm text-white/50 mb-6">&ldquo;{name}&rdquo; is live and ready for members!</p>
            <button onClick={() => router.push('/communities')}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
              Go to my circle →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}