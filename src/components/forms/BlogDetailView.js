"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Edit, Trash2, ExternalLink, Calendar, Tag, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogById } from "@/lib/blogs/api";

// ==========================================
// ✅ HTML DECODE HELPER
// ==========================================
const decodeHtml = (html) => {
  if (!html) return "";
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function BlogDetailView({ blogId, onClose, onEdit, onDeleted }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================
  // ✅ SCROLL FIX: Lock body scroll while modal is open
  // ============================================
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(blogId);
        setBlog(res.data || res);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (blogId) fetchBlog();
  }, [blogId]);

  return (
    <>
      {/* ✅ Custom scrollbar styles (new teal theme) */}
      <style>{`
        .blog-detail-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(52, 122, 133, 0.5) transparent;
        }
        .blog-detail-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .blog-detail-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .blog-detail-scroll::-webkit-scrollbar-thumb {
          background: rgba(52, 122, 133, 0.5);
          border-radius: 999px;
        }
        .blog-detail-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 122, 133, 0.8);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 bg-[#0A1628]/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-[#143336] rounded-2xl border border-[#FFFFFF]/10 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative glow at top */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-24 bg-[#347A85]/20 rounded-full blur-3xl pointer-events-none" />

          {loading ? (
            <div className="flex-1 flex items-center justify-center p-10">
              <Loader2 size={24} className="animate-spin text-[#347A85]" />
            </div>
          ) : blog ? (
            <>
              {/* ===== HEADER ===== */}
              <div className="shrink-0 relative flex items-center justify-between p-5 border-b border-[#FFFFFF]/10 gap-4">
                <h2 className="text-lg font-bold text-[#FFFFFF] truncate flex-1">{blog.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#FFFFFF]/5 text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ===== SCROLLABLE CONTENT ===== */}
              <div
                className="blog-detail-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 space-y-6 relative"
                data-lenis-prevent
              >
                {/* Featured Image */}
                {(blog.featuredImage?.url || blog.image) && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#FFFFFF]/10">
                    <img
                      src={blog.featuredImage?.url || blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient overlay for visual depth */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A1628]/40 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-xs text-[#FFFFFF]/55">
                  <span className="flex items-center gap-1.5">
                    <Tag size={12} className="text-[#347A85]" />
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#347A85]" />
                    {blog.readTime || "1"} min read
                  </span>
                  {blog.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#347A85]" />
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      blog.status === "published"
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                        : blog.status === "draft"
                        ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/25"
                        : "bg-red-500/15 text-red-300 border-red-500/25"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#347A85] rounded-full" />
                    Content
                  </h3>
                  <div
                    className="text-sm text-[#FFFFFF]/75 leading-relaxed bg-[#0A1628]/60 p-4 rounded-xl border border-[#FFFFFF]/5 overflow-hidden wrap-break-word
                               [&_p]:my-2 [&_div]:my-2
                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2
                               [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2
                               [&_li]:ml-2 [&_li]:my-1
                               [&_h1]:text-base [&_h1]:font-bold [&_h1]:my-2 [&_h1]:text-[#FFFFFF]
                               [&_h2]:text-sm [&_h2]:font-bold [&_h2]:my-2 [&_h2]:text-[#FFFFFF]
                               [&_a]:text-[#347A85] [&_a]:underline [&_a]:hover:text-[#347A85]/80
                               [&_blockquote]:border-l-4 [&_blockquote]:border-[#347A85] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#FFFFFF]/60"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content) || "No content available." }}
                  />
                </div>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#347A85]/10 text-[#FFFFFF]/70 rounded-md text-xs border border-[#347A85]/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="h-2" />
              </div>

              {/* ===== FOOTER ACTIONS ===== */}
              <div className="shrink-0 flex items-center justify-end gap-2 p-4 border-t border-[#FFFFFF]/10 bg-[#0A1628]/40 rounded-b-2xl">
                <button
                  onClick={() => onEdit(blog)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#347A85]/10 text-[#347A85] border border-[#347A85]/30 rounded-lg text-sm font-medium hover:bg-[#347A85]/20 hover:border-[#347A85]/50 transition-all"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => onDeleted(blog._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/25 rounded-lg text-sm font-medium hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-10 text-[#FFFFFF]/50">
              Blog not found.
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}