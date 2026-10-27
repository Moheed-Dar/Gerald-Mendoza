"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Loader2,
  ImagePlus,
  AlertCircle,
  FileText,
  Tag,
  Hash,
  Plus,
  ListChecks,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
  Eraser,
} from "lucide-react";
import { motion } from "framer-motion";
import { createBlog } from "@/lib/blogs/api";

const CATEGORIES = [
  "Buying Tips", "Selling Tips", "Market Updates", "First-Time Buyers",
  "Mortgage Advice", "Home Maintenance", "Neighborhood Guides",
  "Investment Properties", "Luxury Homes"
];

const STATUSES = ["draft", "published", "archived"];

// ==========================================
// ✅ CUSTOM RICH TEXT EDITOR COMPONENT
// ==========================================
function CustomRichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const savedRange = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
      try {
        document.execCommand('defaultParagraphSeparator', false, 'div');
      } catch (e) {}
    }
  }, []);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (savedRange.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange.current);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyFormat = (command, val = null) => {
    restoreSelection();
    document.execCommand(command, false, val);
    handleInput();
    saveSelection();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && selection.isCollapsed) {
        const currentBlock = selection.anchorNode;
        if (currentBlock && currentBlock.textContent.trim() === '') {
          setTimeout(() => {
            document.execCommand('removeFormat', false);
            handleInput();
          }, 0);
        }
      }
    }
  };

  const ToolButton = ({ icon: Icon, command, title }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => applyFormat(command)}
      className="w-8 h-8 rounded-md flex items-center justify-center text-[#FFFFFF]/70 hover:bg-[#347A85]/15 hover:text-[#347A85] transition-colors"
      title={title}
    >
      <Icon size={15} />
    </button>
  );

  return (
    <div className="bg-[#0A1628]/60 border border-[#FFFFFF]/8 rounded-xl overflow-hidden focus-within:border-[#347A85]/50 focus-within:ring-2 focus-within:ring-[#347A85]/10 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#FFFFFF]/8 bg-[#0A1628]/80">
        
        <select
          onMouseDown={saveSelection}
          onChange={(e) => {
            applyFormat('fontSize', e.target.value);
            e.target.value = "";
          }}
          className="bg-[#143336] border border-[#FFFFFF]/8 rounded-md px-2 py-1 text-xs text-[#FFFFFF]/70 outline-none mr-1 cursor-pointer hover:border-[#347A85]/40"
          defaultValue=""
          title="Font Size"
        >
          <option value="" disabled style={{ backgroundColor: "#143336" }}>Font Size</option>
          <option value="1" style={{ backgroundColor: "#143336" }}>Small</option>
          <option value="3" style={{ backgroundColor: "#143336" }}>Normal</option>
          <option value="5" style={{ backgroundColor: "#143336" }}>Large</option>
          <option value="6" style={{ backgroundColor: "#143336" }}>Huge</option>
        </select>

        <ToolButton icon={Bold} command="bold" title="Bold" />
        <ToolButton icon={Italic} command="italic" title="Italic" />
        <ToolButton icon={Underline} command="underline" title="Underline" />
        <ToolButton icon={Strikethrough} command="strikeThrough" title="Strikethrough" />
        
        <ToolButton icon={Eraser} command="removeFormat" title="Clear Formatting" />

        <div className="w-px h-6 bg-[#FFFFFF]/10 mx-1"></div>

        <ToolButton icon={List} command="insertUnorderedList" title="Bullet List" />
        <ToolButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />

        <div className="w-px h-6 bg-[#FFFFFF]/10 mx-1"></div>

        <ToolButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
        <ToolButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
        <ToolButton icon={AlignRight} command="justifyRight" title="Align Right" />

        <div className="w-px h-6 bg-[#FFFFFF]/10 mx-1"></div>

        <label 
          className="w-8 h-8 rounded-md flex items-center justify-center text-[#FFFFFF]/70 hover:bg-[#347A85]/15 hover:text-[#347A85] transition-colors cursor-pointer relative" 
          title="Text Color"
          onMouseDown={(e) => e.preventDefault()}
        >
          <Palette size={15} />
          <input
            type="color"
            onChange={(e) => applyFormat('foreColor', e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>

        <label 
          className="w-8 h-8 rounded-md flex items-center justify-center text-[#FFFFFF]/70 hover:bg-[#347A85]/15 hover:text-[#347A85] transition-colors cursor-pointer relative" 
          title="Highlight Color"
          onMouseDown={(e) => e.preventDefault()}
        >
          <Highlighter size={15} />
          <input
            type="color"
            onChange={(e) => applyFormat('hiliteColor', e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        suppressContentEditableWarning={true}
        className="p-4 text-sm text-[#FFFFFF] outline-none min-h-50 
                   [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 
                   [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 
                   [&_li]:ml-2 [&_li]:my-1
                   [&_p]:my-2 
                   [&_div]:my-2
                   [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3 [&_h1]:text-white
                   [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3 [&_h2]:text-white
                   [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2 [&_h3]:text-white
                   [&_blockquote]:border-l-4 [&_blockquote]:border-[#347A85] [&_blockquote]:pl-4 [&_blockquote]:text-[#FFFFFF]/60 [&_blockquote]:italic"
      ></div>
    </div>
  );
}

function Section({ icon: Icon, title, children, optional }) {
  return (
    <div className="bg-[#FFFFFF]/2 rounded-2xl border border-[#FFFFFF]/6 p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#347A85]/10 flex items-center justify-center shrink-0">
          <Icon size={15} className="text-[#347A85]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#FFFFFF]">{title}</h3>
          {optional && <span className="text-[10px] text-[#FFFFFF]/30">Optional</span>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#FFFFFF]/50 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400 normal-case"> *</span>}
      </label>
      {children}
      {hint && <p className="text-[#FFFFFF]/30 text-[10px] mt-1">{hint}</p>}
    </div>
  );
}

export default function BlogsCreateForm({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  
  const [pointInput, setPointInput] = useState({ title: "", description: "" });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    status: "draft",
    tags: [],
    points: [], 
  });

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

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tagToRemove) }));
  };

  const handlePointChange = (field, value) => {
    setPointInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPoint = () => {
    if (!pointInput.title.trim()) {
      setError("Point title is required to add a point.");
      return;
    }
    setForm((prev) => ({
      ...prev,
      points: [...prev.points, { title: pointInput.title.trim(), description: pointInput.description.trim() }],
    }));
    setPointInput({ title: "", description: "" }); 
    setError("");
  };

  const handleRemovePoint = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      points: prev.points.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ==========================================
  // ✅ SUBMIT HANDLER WITH VALIDATIONS
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const plainTextContent = form.content.replace(/<[^>]*>/g, ' ').trim();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (plainTextContent.length < 100) {
      setError(`Content must be at least 100 characters. Currently: ${plainTextContent.length}`);
      return;
    }
    if (!form.category) {
      setError("Category is required.");
      return;
    }
    if (!featuredImage) {
      setError("Featured image is required.");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("content", form.content.trim());
      fd.append("excerpt", form.excerpt.trim());
      fd.append("category", form.category);
      fd.append("status", form.status);
      fd.append("tags", JSON.stringify(form.tags));
      fd.append("points", JSON.stringify(form.points));
      fd.append("featuredImage", featuredImage);

      const res = await createBlog(fd);
      
      if (res.success) {
        onSuccess();
      } else {
        const errorMsg = res.errors?.join(", ") || res.message || "Failed to create blog";
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err?.errors?.join(", ") || err?.message || "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#0A1628]/60 border border-[#FFFFFF]/[0.08] rounded-xl px-4 py-2.5 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/25 outline-none focus:border-[#347A85]/50 focus:ring-2 focus:ring-[#347A85]/10 transition-all";
  const selectClass = `${inputClass} appearance-none`;
  const optionStyle = { backgroundColor: "#143336" };

  const contentTextLength = form.content ? form.content.replace(/<[^>]*>/g, ' ').trim().length : 0;

  return (
    <>
      {/* ✅ Custom scrollbar styles (new teal theme) */}
      <style>{`
        .blog-form-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(52, 122, 133, 0.5) transparent;
        }
        .blog-form-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .blog-form-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .blog-form-scroll::-webkit-scrollbar-thumb {
          background: rgba(52, 122, 133, 0.5);
          border-radius: 999px;
        }
        .blog-form-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 122, 133, 0.8);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 bg-[#0A1628]/95 backdrop-blur-sm overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="relative z-10 flex flex-col h-full overflow-hidden bg-[#143336]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative top glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-xl h-32 bg-[#347A85]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="shrink-0 relative border-b border-[#FFFFFF]/8 bg-[#143336]">
            <div className="flex items-center justify-between px-6 lg:px-8 h-16">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#347A85]/15 flex items-center justify-center border border-[#347A85]/25">
                  <FileText size={18} className="text-[#347A85]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#FFFFFF]">Add New Blog Post</h2>
                  <p className="text-[#FFFFFF]/40 text-[11px] -mt-0.5">Fill in the blog details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-[#FFFFFF]/10 flex items-center justify-center hover:bg-[#FFFFFF]/5 text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {error && (
              <div className="px-6 lg:px-8 pb-3">
                <div className="px-4 py-2.5 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3">
                  <AlertCircle size={15} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-xs flex-1 wrap-break-word">{error}</p>
                  <button onClick={() => setError("")} className="p-0.5 hover:bg-red-500/20 rounded-lg">
                    <X size={13} className="text-red-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== SCROLLABLE CONTENT ===== */}
          <div
            className="blog-form-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain relative"
            data-lenis-prevent
          >
            <form
              id="blogCreateForm"
              onSubmit={handleSubmit}
              className="px-6 lg:px-8 py-6 space-y-5 max-w-4xl mx-auto"
            >
              <Section icon={FileText} title="Blog Information">
                <Field label="Title" required>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter blog title"
                    className={inputClass}
                  />
                </Field>

                <Field label="Content" required hint="Use the toolbar to format text (Minimum 100 characters)">
                  <CustomRichTextEditor
                    value={form.content}
                    onChange={(val) => handleChange("content", val)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[#FFFFFF]/30 text-[10px]"></span>
                    <span className={`text-[10px] ${contentTextLength < 100 ? 'text-red-400/80' : 'text-emerald-400/80'}`}>
                      {contentTextLength} / 100 characters
                    </span>
                  </div>
                </Field>

                <Field label="Excerpt" hint="Short summary of the blog">
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder="Enter short excerpt"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </Section>

              <Section icon={Hash} title="Categorization">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Category" required>
                    <select
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className={selectClass}
                    >
                      <option value="" style={optionStyle}>Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} style={optionStyle}>{c}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Status">
                    <select
                      value={form.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className={selectClass}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} style={optionStyle} className="capitalize">{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Tags">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="Add a tag and press Enter"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2.5 bg-[#347A85]/15 text-[#347A85] border border-[#347A85]/25 rounded-xl text-sm font-medium hover:bg-[#347A85]/25 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#347A85]/10 text-[#FFFFFF]/80 rounded-lg text-xs border border-[#347A85]/20"
                      >
                        <Tag size={10} />
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                          <X size={12} className="hover:text-red-400" />
                        </button>
                      </span>
                    ))}
                  </div>
                </Field>
              </Section>

              {/* KEY POINTS SECTION */}
              <Section icon={ListChecks} title="Key Points" optional>
                <div className="space-y-3 p-4 bg-[#0A1628]/40 rounded-xl border border-[#FFFFFF]/5">
                  <Field label="Point Title" required>
                    <input
                      type="text"
                      value={pointInput.title}
                      onChange={(e) => handlePointChange("title", e.target.value)}
                      placeholder="E.g. Great Location"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Point Description" hint="Max 500 characters">
                    <textarea
                      value={pointInput.description}
                      onChange={(e) => handlePointChange("description", e.target.value)}
                      placeholder="Brief description of the point"
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#347A85]/10 text-[#347A85] border border-[#347A85]/25 rounded-xl text-sm font-medium hover:bg-[#347A85]/20 transition-colors"
                  >
                    <Plus size={14} /> Add Point
                  </button>
                </div>

                {form.points.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs font-semibold text-[#FFFFFF]/50 uppercase tracking-wider mb-2">
                      Added Points ({form.points.length})
                    </p>
                    {form.points.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-[#0A1628]/60 rounded-lg border border-[#FFFFFF]/8"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#347A85]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#347A85] text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#FFFFFF]">{point.title}</p>
                          {point.description && (
                            <p className="text-xs text-[#FFFFFF]/50 mt-0.5">{point.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePoint(index)}
                          className="p-1 rounded-md hover:bg-red-500/10 transition-colors group"
                        >
                          <X size={14} className="text-[#FFFFFF]/40 group-hover:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              {/* FEATURED IMAGE SECTION */}
              <Section icon={ImagePlus} title="Featured Image">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-[#FFFFFF]/8 group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0A1628]/30 to-transparent pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => { setFeaturedImage(null); setImagePreview(null); }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="aspect-video rounded-xl border-2 border-dashed border-[#FFFFFF]/10 hover:border-[#347A85]/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#347A85]/5 sm:col-span-1">
                      <ImagePlus size={22} className="text-[#FFFFFF]/25 mb-1" />
                      <span className="text-[10px] text-[#FFFFFF]/35 font-medium">Upload Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </Section>

              {/* Bottom spacing for sticky footer */}
              <div className="h-24" />
            </form>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-[#FFFFFF]/8 bg-[#143336] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between px-6 lg:px-8 h-16 max-w-4xl mx-auto">
              <p className="text-[#FFFFFF]/35 text-xs hidden sm:block">
                <span className="text-red-400/70">*</span> Required fields
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-[#FFFFFF]/10 text-[#FFFFFF]/60 text-sm font-semibold rounded-xl hover:bg-[#FFFFFF]/5 hover:text-[#FFFFFF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="blogCreateForm"
                  disabled={loading}
                  className="flex items-center gap-2 px-7 py-2.5 bg-[#347A85] hover:bg-[#2a616a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#347A85]/30"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Creating...</>
                  ) : (
                    <><FileText size={15} /> Create Blog</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}