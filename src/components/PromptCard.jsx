import React from "react";

export default function PromptCard({ prompt, renderedText, isExpanded, onToggle, onCopy, isCopied, styles }) {
  return (
    <article
      style={styles.promptCard}
      aria-label={`Prompt: ${prompt.title}`}
      aria-expanded={isExpanded}
    >
      <button
        type="button"
        style={styles.promptCardHeader}
        onClick={() => onToggle(prompt.id)}
        aria-expanded={isExpanded}
        aria-controls={`prompt-body-${prompt.id}`}
        id={`prompt-header-${prompt.id}`}
      >
        <div style={styles.promptCardHeaderContent}>
          <span style={styles.category}>{prompt.category}</span>
          <h3 style={styles.promptTitle}>{prompt.title}</h3>
          <p style={styles.promptDesc}>{prompt.description}</p>
        </div>
        <span style={styles.chevron} aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      {isExpanded && (
        <div
          id={`prompt-body-${prompt.id}`}
          style={styles.promptCardBody}
          role="region"
          aria-labelledby={`prompt-header-${prompt.id}`}
        >
          <pre style={styles.pre} tabIndex={0} aria-label="Rendered prompt text">
            {renderedText}
          </pre>
          <button
            type="button"
            style={styles.primaryBtn}
            onClick={(e) => {
              e.stopPropagation();
              onCopy(renderedText, prompt.id);
            }}
            aria-label={`Copy prompt: ${prompt.title}`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </article>
  );
}
