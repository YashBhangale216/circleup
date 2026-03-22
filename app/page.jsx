"use client";
import { useEffect, useRef, useState } from "react";

// ── Particle Canvas (left side) ─────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let particles = [];

    function resize() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles();
    }

    class Dot {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.4 + 0.15;
        this.alpha = this.baseAlpha;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          const f = (130 - d) / 130;
          const a = Math.atan2(dy, dx);
          this.x += Math.cos(a) * f * 3.5;
          this.y += Math.sin(a) * f * 3.5;
          this.alpha = Math.min(1, this.baseAlpha + f * 0.5);
        } else {
          this.alpha = Math.max(this.baseAlpha, this.alpha - 0.02);
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,106,0,${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const n = Math.min(
        Math.floor((canvas.width * canvas.height) / 5000),
        100,
      );
      for (let i = 0; i < n; i++) particles.push(new Dot());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            const mdx = particles[i].x - mouseRef.current.x;
            const mdy = particles[i].y - mouseRef.current.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            const alpha = md < 160 ? (1 - d / 90) * 0.5 : (1 - d / 90) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,106,0,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    function drawMouseGlow() {
      const x = mouseRef.current.x;
      const y = mouseRef.current.y;
      if (x < 0) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 160);
      g.addColorStop(0, "rgba(255,106,0,0.15)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 160, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      ctx.fillStyle = "rgba(13,13,13,0.92)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawMouseGlow();
      drawLines();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animRef.current = requestAnimationFrame(animate);
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ── Main Login Page ─────────────────────────────────────────
export default function LoginPage() {
  const [tab, setTab] = useState("signup");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [sFName, setSFName] = useState("");
  const [sLName, setSLName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass] = useState("");

  const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleLogin = () => {
    const errs = {};
    if (!isEmail(lEmail)) errs.lEmail = "Enter a valid email";
    if (lPass.length < 6) errs.lPass = "Min. 6 characters";
    setErrors(errs);
    if (!Object.keys(errs).length) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/home"; // ← redirects to home page
      }, 1400);
    }
  };

  const handleSignup = () => {
    const errs = {};
    if (!sFName.trim()) errs.sFName = "Required";
    if (!isEmail(sEmail)) errs.sEmail = "Enter a valid email";
    if (sPass.length < 8) errs.sPass = "Min. 8 characters";
    setErrors(errs);
    if (!Object.keys(errs).length) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/home"; // ← redirects to home page
      }, 1400);
    }
  };

  const inputClass = (errKey) =>
    `w-full bg-[#1e1e1e] border rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors ${
      errors[errKey]
        ? "border-red-500"
        : "border-[#2c2c2c] focus:border-orange-500"
    }`;

  return (
    <div className="flex min-h-screen">
      {/* LEFT: Particle background */}
      <div className="hidden md:flex flex-col justify-between w-1/3 flex-shrink-0 relative overflow-hidden bg-[#0d0d0d] p-9">
        <ParticleCanvas />
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="text-white text-lg font-semibold">CircleUp</span>
          </div>

          {/* Text & Pills */}
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Find your people.
              <br />
              Grow together.
            </h1>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Join niche communities of entrepreneurs, creators, and builders
              helping each other level up.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "🛍️ E-commerce",
                "💻 SaaS Builders",
                "✏️ Freelancers",
                "📱 App Developers",
                "🌱 Sustainability",
                "🎨 Creators",
              ].map((n) => (
                <span
                  key={n}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/75 bg-white/5 hover:border-orange-500 hover:text-white transition-colors cursor-pointer"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <p className="text-white/25 text-xs">
            © 2026 CircleUp. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="flex-1 bg-[#141414] flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {success ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                You&apos;re in!
              </h2>
              <p className="text-white/40 text-sm mb-6">Welcome to CircleUp!</p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setLEmail("");
                  setLPass("");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Go to my home →
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">
                {tab === "login" ? "Welcome back" : "Join CircleUp"}
              </h2>
              <p className="text-white/40 text-sm mb-7">
                {tab === "login"
                  ? "Sign in to your account"
                  : "Create your free account"}
              </p>

              {/* Tabs */}
              <div className="flex bg-[#1e1e1e] rounded-xl p-1 mb-7">
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setErrors({});
                    }}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === t ? "bg-orange-500 text-white" : "text-white/35"}`}
                  >
                    {t === "login" ? "Sign in" : "Create account"}
                  </button>
                ))}
              </div>

              {/* LOGIN */}
              {tab === "login" && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-white/45 font-medium mb-1.5 block">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={lEmail}
                        onChange={(e) => setLEmail(e.target.value)}
                        className={inputClass("lEmail")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 text-sm">
                        ✉
                      </span>
                    </div>
                    {errors.lEmail && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.lEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-white/45 font-medium mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={lPass}
                        onChange={(e) => setLPass(e.target.value)}
                        className={inputClass("lPass")}
                      />
                      <button
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 text-sm"
                      >
                        {showPass ? "🔓" : "🔒"}
                      </button>
                    </div>
                    {errors.lPass && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.lPass}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Sign in →"}
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/25">
                      Or continue with
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <button className="w-full bg-transparent border border-[#2c2c2c] hover:border-orange-500 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <p className="text-xs text-center text-white/30">
                    Don&apos;t have an account?{" "}
                    <span
                      onClick={() => setTab("signup")}
                      className="text-orange-400 cursor-pointer font-medium"
                    >
                      Create one free
                    </span>
                  </p>
                </div>
              )}

              {/* SIGNUP */}
              {tab === "signup" && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-white/45 font-medium mb-1.5 block">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={sFName}
                        onChange={(e) => setSFName(e.target.value)}
                        className={inputClass("sFName")}
                      />
                      {errors.sFName && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.sFName}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-white/45 font-medium mb-1.5 block">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Surname"
                        value={sLName}
                        onChange={(e) => setSLName(e.target.value)}
                        className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/45 font-medium mb-1.5 block">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={sEmail}
                        onChange={(e) => setSEmail(e.target.value)}
                        className={inputClass("sEmail")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 text-sm">
                        ✉
                      </span>
                    </div>
                    {errors.sEmail && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.sEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-white/45 font-medium mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={sPass}
                        onChange={(e) => setSPass(e.target.value)}
                        className={inputClass("sPass")}
                      />
                      <button
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 text-sm"
                      >
                        {showPass ? "🔓" : "🔒"}
                      </button>
                    </div>
                    {errors.sPass && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.sPass}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
                  >
                    {loading ? "Creating account..." : "Create my account"}
                  </button>
                  <p className="text-xs text-center text-white/30">
                    Already have an account?{" "}
                    <span
                      onClick={() => setTab("login")}
                      className="text-orange-400 cursor-pointer font-medium"
                    >
                      Sign in
                    </span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
