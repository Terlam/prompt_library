import React, { useEffect } from "react";

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
  styles,
  DEFAULT_GENERAL_CONTEXT,
  DEFAULT_BUSINESS_CONTEXT,
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        role="presentation"
        style={styles.drawerOverlay}
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
      <aside
        style={styles.drawer}
        aria-modal="true"
        aria-label="Context panel"
      >
        <div style={styles.drawerHeader}>
          <h2 style={styles.drawerTitle}>
            {mode === "general" ? "Your context" : "Project Context Card"}
          </h2>
          <button
            type="button"
            style={styles.closeBtn}
            onClick={onClose}
            aria-label="Close context"
          >
            Close
          </button>
        </div>
        <div style={styles.drawerBody}>
          {mode === "general" ? (
            <>
              <div style={styles.formGrid}>
                <label style={styles.label}>
                  Topic / what this is about
                  <input
                    style={styles.input}
                    value={generalContext.topic}
                    onChange={updateGeneralField("topic")}
                    placeholder="e.g., my side project, weekly planning"
                  />
                </label>
                <label style={styles.label}>
                  Goal (one sentence)
                  <input
                    style={styles.input}
                    value={generalContext.goal}
                    onChange={updateGeneralField("goal")}
                    placeholder="What do you want to get out of this?"
                  />
                </label>
                <label style={styles.label}>
                  Audience (optional)
                  <input
                    style={styles.input}
                    value={generalContext.audience}
                    onChange={updateGeneralField("audience")}
                    placeholder="Who it's for, if relevant"
                  />
                </label>
                <label style={styles.label}>
                  Tone
                  <input
                    style={styles.input}
                    value={generalContext.tone}
                    onChange={updateGeneralField("tone")}
                    placeholder="e.g., warm, casual, professional"
                  />
                </label>
                <label style={styles.label}>
                  Constraints
                  <input
                    style={styles.input}
                    value={generalContext.constraints}
                    onChange={updateGeneralField("constraints")}
                    placeholder="Time, format, limits"
                  />
                </label>
                <label style={styles.label}>
                  Extra details
                  <textarea
                    style={styles.textarea}
                    value={generalContext.details}
                    onChange={updateGeneralField("details")}
                    placeholder="Any other context"
                    rows={3}
                  />
                </label>
              </div>
              <div style={styles.previewBox}>
                <h3 style={styles.h3}>Quick preview</h3>
                <p style={styles.previewLine}>
                  <strong>Topic:</strong> {generalContext.topic || <em>[topic]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>Goal:</strong> {generalContext.goal || <em>[goal]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>Tone:</strong> {generalContext.tone || <em>[tone]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>Constraints:</strong>{" "}
                  {generalConstraintsBullets.length ? generalConstraintsBullets.join(" • ") : <em>[constraints]</em>}
                </p>
              </div>
              <button type="button" style={styles.secondaryBtn} onClick={onResetGeneral}>
                Reset context
              </button>
            </>
          ) : (
            <>
              <div style={styles.formGrid}>
                <label style={styles.label}>
                  Project / Business Name
                  <input
                    style={styles.input}
                    value={businessContext.projectName}
                    onChange={updateBusinessField("projectName")}
                    placeholder="e.g., CoreKind Studio"
                  />
                </label>
                <label style={styles.label}>
                  One-sentence description
                  <textarea
                    style={styles.textarea}
                    value={businessContext.shortDescription}
                    onChange={updateBusinessField("shortDescription")}
                    placeholder="What is it?"
                    rows={2}
                  />
                </label>
                <label style={styles.label}>
                  Audience
                  <textarea
                    style={styles.textarea}
                    value={businessContext.audience}
                    onChange={updateBusinessField("audience")}
                    placeholder="Who is this for?"
                    rows={2}
                  />
                </label>
                <label style={styles.label}>
                  Problem
                  <textarea
                    style={styles.textarea}
                    value={businessContext.problem}
                    onChange={updateBusinessField("problem")}
                    placeholder="What problem?"
                    rows={2}
                  />
                </label>
                <label style={styles.label}>
                  Solution
                  <textarea
                    style={styles.textarea}
                    value={businessContext.solution}
                    onChange={updateBusinessField("solution")}
                    placeholder="How do you solve it?"
                    rows={2}
                  />
                </label>
                <label style={styles.label}>
                  Stage
                  <select style={styles.input} value={businessContext.stage} onChange={updateBusinessField("stage")}>
                    <option value="idea">Idea</option>
                    <option value="prototype">Prototype</option>
                    <option value="beta">Beta</option>
                    <option value="launched">Launched</option>
                  </select>
                </label>
                <label style={styles.label}>
                  Tone preference
                  <input
                    style={styles.input}
                    value={businessContext.tonePreference}
                    onChange={updateBusinessField("tonePreference")}
                    placeholder="e.g., bold, playful"
                  />
                </label>
                <label style={styles.label}>
                  Values (comma-separated)
                  <input
                    style={styles.input}
                    value={businessContext.values}
                    onChange={updateBusinessField("values")}
                    placeholder="e.g., community, trust"
                  />
                </label>
                <label style={styles.label}>
                  Accessibility goals
                  <input
                    style={styles.input}
                    value={businessContext.accessibilityGoals}
                    onChange={updateBusinessField("accessibilityGoals")}
                    placeholder="e.g., plain language"
                  />
                </label>
                <label style={styles.label}>
                  Constraints (comma-separated)
                  <input
                    style={styles.input}
                    value={businessContext.constraints}
                    onChange={updateBusinessField("constraints")}
                    placeholder="e.g., low budget, 2 weeks"
                  />
                </label>
              </div>
              <div style={styles.previewBox}>
                <h3 style={styles.h3}>Quick preview</h3>
                <p style={styles.previewLine}>
                  <strong>Name:</strong> {businessContext.projectName || <em>[projectName]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>One-liner:</strong> {businessContext.shortDescription || <em>[shortDescription]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>Values:</strong>{" "}
                  {businessValuesBullets.length ? businessValuesBullets.join(" • ") : <em>[values]</em>}
                </p>
                <p style={styles.previewLine}>
                  <strong>Constraints:</strong>{" "}
                  {businessConstraintsBullets.length ? businessConstraintsBullets.join(" • ") : <em>[constraints]</em>}
                </p>
              </div>
              <button type="button" style={styles.secondaryBtn} onClick={onResetBusiness}>
                Reset context
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
