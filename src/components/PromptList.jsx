import React from "react";
import PromptCard from "./PromptCard.jsx";

export default function PromptList({
  prompts,
  categories,
  selectedCategory,
  setSelectedCategory,
  expandedId,
  setExpandedId,
  onCopy,
  copiedId,
  renderTemplate,
  generalContext,
  businessContext,
}) {
  function handleToggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="prompt-list-section" aria-labelledby="category-label">
      <p className="app-instructions" id="how-to-use">
        <strong>How to use:</strong> Open <strong>Context</strong> and add your details → expand a prompt and review the filled text → <strong>Copy</strong> and paste into your AI assistant (e.g. ChatGPT, Claude).
      </p>
      <div className="library-header">
        <h2 id="category-label" className="library-title">
          Filter by category
        </h2>
        <label className="category-label">
          Category
          <select
            className="form-select category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter prompts by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="prompt-list">
        {prompts.map((p) => {
          const ctx = p.contextType === "general" ? generalContext : businessContext;
          const rendered = renderTemplate(p.template, ctx);
          return (
            <PromptCard
              key={p.id}
              prompt={p}
              renderedText={rendered}
              isExpanded={expandedId === p.id}
              onToggle={handleToggle}
              onCopy={onCopy}
              isCopied={copiedId === p.id}
            />
          );
        })}
      </div>
    </section>
  );
}
