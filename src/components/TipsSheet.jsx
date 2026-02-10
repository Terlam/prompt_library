import React, { useEffect, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

export default function TipsSheet({ open, onClose }) {
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
        className="drawer drawer--tips"
        aria-modal="true"
        aria-label="Tips for better prompts"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">Tips for better prompts</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-secondary"
            onClick={onClose}
            aria-label="Close tips"
          >
            Close
          </button>
        </div>
        <div className="drawer-body">
          <div className="tips-section">
            <h3 className="tips-section-title">Give it a role</h3>
            <p className="tips-section-body">
              Start with &ldquo;Act as…&rdquo; so the AI knows the lens (e.g. coach, editor, strategist). The prompts in this library already do that—you add the context and goal.
            </p>
          </div>
          <div className="tips-section">
            <h3 className="tips-section-title">Add context</h3>
            <p className="tips-section-body">
              Topic, goal, audience, and constraints help the AI tailor the answer. Fill the Context drawer; the more specific you are, the better the result.
            </p>
          </div>
          <div className="tips-section">
            <h3 className="tips-section-title">One clear task</h3>
            <p className="tips-section-body">
              Ask for one main outcome per prompt. If you need several things, split into steps or use separate prompts.
            </p>
          </div>
          <div className="tips-section">
            <h3 className="tips-section-title">Why placeholders</h3>
            <p className="tips-section-body">
              In this app, fields like Topic and Goal fill in <code>[topic]</code> and <code>[goal]</code> in the prompt so you don&apos;t retype. Empty fields stay as placeholders when you copy.
            </p>
          </div>
          <div className="tips-section">
            <h3 className="tips-section-title">Do&apos;s and don&apos;ts</h3>
            <ul className="tips-list">
              <li><strong>Do:</strong> Be specific. Name your audience. State constraints (time, format, tone).</li>
              <li><strong>Don&apos;t:</strong> Ask for everything at once. Leave the goal vague.</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
