import React from "react";

export default function PromptCard({ prompt, renderedText, isExpanded, onToggle, onCopy, isCopied }) {
  return (
    <article
      className="prompt-card"
      aria-label={`Prompt: ${prompt.title}`}
      aria-expanded={isExpanded}
    >
      <button
        type="button"
        className="prompt-card-header"
        onClick={() => onToggle(prompt.id)}
        aria-expanded={isExpanded}
        aria-controls={`prompt-body-${prompt.id}`}
        id={`prompt-header-${prompt.id}`}
      >
        <div className="prompt-card-header-content">
          <span className="prompt-category-pill">{prompt.category}</span>
          <h3 className="prompt-title">{prompt.title}</h3>
          <p className="prompt-desc">{prompt.description}</p>
        </div>
        <span className="prompt-chevron" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      {isExpanded && (
        <div
          id={`prompt-body-${prompt.id}`}
          className="prompt-card-body"
          role="region"
          aria-labelledby={`prompt-header-${prompt.id}`}
        >
          <pre className="prompt-pre" tabIndex={0} aria-label="Rendered prompt text">
            {renderedText}
          </pre>
          <button
            type="button"
            className="btn-primary prompt-copy-btn"
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
