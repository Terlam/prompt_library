import React, { useEffect, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

export default function ContextPanel({
  open,
  onClose,
  mode,
  generalContext,
  businessContext,
  updateGeneralField,
  updateBusinessField,
  onResetGeneral,
  onResetBusiness,
  generalConstraintsBullets,
  businessValuesBullets,
  businessConstraintsBullets,
  DEFAULT_GENERAL_CONTEXT,
  DEFAULT_BUSINESS_CONTEXT,
}) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusables = getFocusables(drawer);
      if (focusables.length === 0) return;
      const current = document.activeElement;
      const idx = focusables.indexOf(current);
      if (idx === -1) return;
      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        }
      } else {
        if (idx === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        role="presentation"
        className="drawer-overlay"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className="drawer"
        aria-modal="true"
        aria-label="Context panel"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">
            {mode === "general" ? "Your context" : "Project Context Card"}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-secondary"
            onClick={onClose}
            aria-label="Close context"
          >
            Close
          </button>
        </div>
        <div className="drawer-body">
          <p className="drawer-intro">
            These fields replace placeholders in the prompts (e.g. [topic], [goal]). Fill what you can; empty fields stay as placeholders when you copy.
          </p>
          {mode === "general" ? (
            <>
              <div className="form-grid">
                <label className="form-label">
                  Topic / what this is about
                  <input
                    className="form-input"
                    value={generalContext.topic}
                    onChange={updateGeneralField("topic")}
                    placeholder="e.g., my side project, weekly planning"
                  />
                </label>
                <label className="form-label">
                  Goal (one sentence)
                  <input
                    className="form-input"
                    value={generalContext.goal}
                    onChange={updateGeneralField("goal")}
                    placeholder="What do you want to get out of this?"
                  />
                </label>
                <label className="form-label">
                  Audience (optional)
                  <input
                    className="form-input"
                    value={generalContext.audience}
                    onChange={updateGeneralField("audience")}
                    placeholder="Who it's for, if relevant"
                  />
                </label>
                <label className="form-label">
                  Tone
                  <input
                    className="form-input"
                    value={generalContext.tone}
                    onChange={updateGeneralField("tone")}
                    placeholder="e.g., warm, casual, professional"
                  />
                </label>
                <label className="form-label">
                  Constraints
                  <input
                    className="form-input"
                    value={generalContext.constraints}
                    onChange={updateGeneralField("constraints")}
                    placeholder="Time, format, limits"
                  />
                </label>
                <label className="form-label">
                  Extra details
                  <textarea
                    className="form-textarea"
                    value={generalContext.details}
                    onChange={updateGeneralField("details")}
                    placeholder="Any other context"
                    rows={3}
                  />
                </label>
              </div>
              <div className="preview-box">
                <h3 className="preview-title">Quick preview</h3>
                <p className="preview-line">
                  <strong>Topic:</strong> {generalContext.topic || <em>[topic]</em>}
                </p>
                <p className="preview-line">
                  <strong>Goal:</strong> {generalContext.goal || <em>[goal]</em>}
                </p>
                <p className="preview-line">
                  <strong>Tone:</strong> {generalContext.tone || <em>[tone]</em>}
                </p>
                <p className="preview-line">
                  <strong>Constraints:</strong>{" "}
                  {generalConstraintsBullets.length ? generalConstraintsBullets.join(" • ") : <em>[constraints]</em>}
                </p>
              </div>
              <button type="button" className="btn-secondary form-reset-btn" onClick={onResetGeneral}>
                Reset context
              </button>
            </>
          ) : (
            <>
              <div className="form-grid">
                <label className="form-label">
                  Project / Business Name
                  <input
                    className="form-input"
                    value={businessContext.projectName}
                    onChange={updateBusinessField("projectName")}
                    placeholder="e.g., CoreKind Studio"
                  />
                </label>
                <label className="form-label">
                  One-sentence description
                  <textarea
                    className="form-textarea"
                    value={businessContext.shortDescription}
                    onChange={updateBusinessField("shortDescription")}
                    placeholder="What is it?"
                    rows={2}
                  />
                </label>
                <label className="form-label">
                  Audience
                  <textarea
                    className="form-textarea"
                    value={businessContext.audience}
                    onChange={updateBusinessField("audience")}
                    placeholder="Who is this for?"
                    rows={2}
                  />
                </label>
                <label className="form-label">
                  Problem
                  <textarea
                    className="form-textarea"
                    value={businessContext.problem}
                    onChange={updateBusinessField("problem")}
                    placeholder="What problem?"
                    rows={2}
                  />
                </label>
                <label className="form-label">
                  Solution
                  <textarea
                    className="form-textarea"
                    value={businessContext.solution}
                    onChange={updateBusinessField("solution")}
                    placeholder="How do you solve it?"
                    rows={2}
                  />
                </label>
                <label className="form-label">
                  Stage
                  <select className="form-select" value={businessContext.stage} onChange={updateBusinessField("stage")}>
                    <option value="idea">Idea</option>
                    <option value="prototype">Prototype</option>
                    <option value="beta">Beta</option>
                    <option value="launched">Launched</option>
                  </select>
                </label>
                <label className="form-label">
                  Tone preference
                  <input
                    className="form-input"
                    value={businessContext.tonePreference}
                    onChange={updateBusinessField("tonePreference")}
                    placeholder="e.g., bold, playful"
                  />
                </label>
                <label className="form-label">
                  Values (comma-separated)
                  <input
                    className="form-input"
                    value={businessContext.values}
                    onChange={updateBusinessField("values")}
                    placeholder="e.g., community, trust"
                  />
                </label>
                <label className="form-label">
                  Accessibility goals
                  <input
                    className="form-input"
                    value={businessContext.accessibilityGoals}
                    onChange={updateBusinessField("accessibilityGoals")}
                    placeholder="e.g., plain language"
                  />
                </label>
                <label className="form-label">
                  Constraints (comma-separated)
                  <input
                    className="form-input"
                    value={businessContext.constraints}
                    onChange={updateBusinessField("constraints")}
                    placeholder="e.g., low budget, 2 weeks"
                  />
                </label>
              </div>
              <div className="preview-box">
                <h3 className="preview-title">Quick preview</h3>
                <p className="preview-line">
                  <strong>Name:</strong> {businessContext.projectName || <em>[projectName]</em>}
                </p>
                <p className="preview-line">
                  <strong>One-liner:</strong> {businessContext.shortDescription || <em>[shortDescription]</em>}
                </p>
                <p className="preview-line">
                  <strong>Values:</strong>{" "}
                  {businessValuesBullets.length ? businessValuesBullets.join(" • ") : <em>[values]</em>}
                </p>
                <p className="preview-line">
                  <strong>Constraints:</strong>{" "}
                  {businessConstraintsBullets.length ? businessConstraintsBullets.join(" • ") : <em>[constraints]</em>}
                </p>
              </div>
              <button type="button" className="btn-secondary form-reset-btn" onClick={onResetBusiness}>
                Reset context
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
