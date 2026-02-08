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
  styles,
}) {
  function handleToggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <section style={styles.promptListSection} aria-labelledby="category-label">
      <div style={styles.libraryHeader}>
        <h2 id="category-label" style={styles.h2}>
          Category
        </h2>
        <label style={styles.categoryLabel}>
          Category
          <select
            style={{ ...styles.input, ...(styles.categorySelect || {}) }}
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
      <div style={styles.promptList}>
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
              styles={styles}
            />
          );
        })}
      </div>
    </section>
  );
}
