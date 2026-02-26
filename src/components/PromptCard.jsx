import React, { useState, useEffect } from "react";

export default function PromptCard({ prompt, renderedText, isExpanded, onToggle, onCopy, onCopyAndLaunch, isCopied }) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

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
          <div className="prompt-actions">
            <button
              type="button"
              className="btn-primary prompt-copy-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(renderedText, prompt.id);
              }}
              aria-label={`Copy prompt: ${prompt.title}`}
            >
              {isCopied ? "Copied \u2713" : "Copy prompt"}
            </button>
            <button
              type="button"
              className="btn-secondary prompt-launch-btn"
              onClick={(e) => {
                e.stopPropagation();
                setToast(true);
                onCopyAndLaunch(renderedText, prompt.id);
              }}
              title="Copies prompt and opens chatgpt.com"
              aria-label={`Copy prompt and open ChatGPT: ${prompt.title}`}
            >
              <span className="prompt-launch-dot" aria-hidden="true" />
              Copy &amp; open ChatGPT
            </button>
          </div>
          {toast && (
            <div className="prompt-toast" role="status" aria-live="polite">
              <span className="prompt-toast-check" aria-hidden="true">&#10003;</span>
              <div className="prompt-toast-text">
                <strong>Prompt copied!</strong>
                <span>Paste it when ChatGPT opens &rarr;</span>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
