"use client";
import { useState, useRef, useEffect } from "react";

const initialComments = [
  {
    id: 1,
    initials: "SA",
    color: "#7c3aed",
    name: "Sneha Arora",
    text: "Amazing achievement! What was your best selling product this month?",
    time: "1h ago",
    likes: 5,
    liked: false,
    replies: [
      {
        id: 11,
        initials: "RK",
        color: "#ff6a00",
        name: "Ravi Kumar",
        text: "Phone cases! Simple product but huge demand 📱",
        time: "45m ago",
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    initials: "MJ",
    color: "#0891b2",
    name: "Mohammed J.",
    text: "This is so inspiring! Which logistics partner are you using?",
    time: "30m ago",
    likes: 2,
    liked: false,
    replies: [],
  },
  {
    id: 3,
    initials: "PK",
    color: "#16a34a",
    name: "Priya Kapoor",
    text: "Would love to learn more about your Instagram Reels strategy! 🔥",
    time: "15m ago",
    likes: 4,
    liked: false,
    replies: [],
  },
];

export default function CommentSection({ isOpen, onClose, post }) {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    if (replyTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: Date.now(),
                    initials: "YO",
                    color: "#ff6a00",
                    name: "Your Name",
                    text: commentText,
                    time: "Just now",
                    likes: 0,
                    liked: false,
                  },
                ],
              }
            : c,
        ),
      );
    } else {
      setComments((prev) => [
        {
          id: Date.now(),
          initials: "YO",
          color: "#ff6a00",
          name: "Your Name",
          text: commentText,
          time: "Just now",
          likes: 0,
          liked: false,
          replies: [],
        },
        ...prev,
      ]);
    }
    setCommentText("");
    setReplyTo(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const toggleLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : {
              ...c,
              replies: c.replies.map((r) =>
                r.id === id
                  ? {
                      ...r,
                      liked: !r.liked,
                      likes: r.liked ? r.likes - 1 : r.likes + 1,
                    }
                  : r,
              ),
            },
      ),
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(1.5px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className="bg-[#141414] border border-[#2c2c2c] rounded-2xl w-full max-w-lg flex flex-col overflow-hidden"
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e1e] flex-shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white/50 hover:text-white transition-all text-sm"
          >
            ✕
          </button>
          <p className="text-sm font-semibold text-white">Comments</p>
          <div className="w-8" />
        </div>

        {/* Original post — Twitter style with line */}
        <div className="flex gap-3 px-4 pt-4 pb-2 flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: post?.color || "#ff6a00" }}
            >
              {post?.initials || "RK"}
            </div>
            <div className="w-0.5 bg-[#2c2c2c] flex-1 mt-2 min-h-[20px]" />
          </div>
          <div className="flex-1 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-bold text-white">
                {post?.name || "Ravi Kumar"}
              </p>
              <p className="text-xs text-white/35">{post?.time || "2h ago"}</p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {post?.text || "Just crossed ₹1L revenue!"}
            </p>
            <p className="text-xs text-white/30 mt-2">
              Replying to{" "}
              <span className="text-orange-400">
                @{(post?.name || "Ravi Kumar").toLowerCase().replace(/ /g, "")}
              </span>
            </p>
          </div>
        </div>

        {/* Composer — right below post with connected line */}
        <div className="flex gap-3 px-4 pb-3 border-b border-[#1e1e1e] flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              YO
            </div>
          </div>
          <div className="flex-1">
            {replyTo && (
              <div className="flex items-center gap-2 mb-1 text-xs text-white/40">
                <span>
                  Replying to{" "}
                  <span className="text-orange-400">
                    {comments.find((c) => c.id === replyTo)?.name}
                  </span>
                </span>
                <button
                  onClick={() => setReplyTo(null)}
                  className="text-white/30 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                autoResize(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addComment();
                }
              }}
              placeholder="Post your reply"
              rows={2}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none resize-none font-sans leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-3">
                {["🖼️", "😊", "📊", "📍"].map((tool) => (
                  <button
                    key={tool}
                    className="text-base text-white/30 hover:text-orange-400 transition-colors"
                  >
                    {tool}
                  </button>
                ))}
              </div>
              <button
                onClick={addComment}
                disabled={!commentText.trim()}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-bold rounded-full transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto">
          {comments.length === 0 && (
            <div className="text-center py-10 text-white/25">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-sm">No comments yet. Be the first!</p>
            </div>
          )}
          {comments.map((comment, idx) => (
            <div
              key={comment.id}
              className={`px-4 py-3 ${idx < comments.length - 1 ? "border-b border-[#1e1e1e]" : ""}`}
            >
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: comment.color }}
                  >
                    {comment.initials}
                  </div>
                  {comment.replies.length > 0 && (
                    <div className="w-0.5 bg-[#1e1e1e] flex-1 mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">
                      {comment.name}
                    </p>
                    <p className="text-xs text-white/30">{comment.time}</p>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-2">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${comment.liked ? "text-orange-400" : "text-white/30 hover:text-orange-400"}`}
                    >
                      👍 {comment.likes}
                    </button>
                    <button
                      onClick={() => {
                        setReplyTo(comment.id);
                        textareaRef.current?.focus();
                      }}
                      className="text-xs text-white/30 hover:text-orange-400 transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex gap-3 mt-3 ml-4 pl-3 border-l-2 border-[#1e1e1e]"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: reply.color }}
                  >
                    {reply.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-bold text-white">
                        {reply.name}
                      </p>
                      <p className="text-xs text-white/30">{reply.time}</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed mb-1.5">
                      {reply.text}
                    </p>
                    <button
                      onClick={() => toggleLike(reply.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${reply.liked ? "text-orange-400" : "text-white/30 hover:text-orange-400"}`}
                    >
                      👍 {reply.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
