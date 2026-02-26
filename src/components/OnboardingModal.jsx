import React, { useState, useEffect, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

const DEMO_TEMPLATE = `Act as a friendly productivity coach.\n\nContext:\n- What I'm focusing on: [topic]\n- My goal this week: help me get organized\n\nTask:\nCreate a practical weekly plan that includes priority tasks, time blocks, and a daily check-in question.`;

function getDemoPreview(topic) {
  const val = topic.trim();
  return DEMO_TEMPLATE.replace("[topic]", val.length ? val : "[topic]");
}

export default function OnboardingModal({ open, onComplete, onSkip, onTopicChange }) {
  const [step, setStep] = useState(1);
  const [demoTopic, setDemoTopic] = useState("");
  const modalRef = useRef(null);
  const firstFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setDemoTopic("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    firstFocusRef.current?.focus();
  }, [open, step]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        handleSkip();
        return;
      }
      if (e.key !== "Tab") return;
      const modal = modalRef.current;
      if (!modal) return;
      const focusables = getFocusables(modal);
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
  }, [open, step]);

  if (!open) return null;

  function handleSkip() {
    if (demoTopic.trim()) onTopicChange(demoTopic.trim());
    onSkip();
  }

  function handleComplete(openContext) {
    if (demoTopic.trim()) onTopicChange(demoTopic.trim());
    onComplete(openContext);
  }

  return (
    <>
      <div className="onboarding-overlay" aria-hidden="true" />
      <div
        ref={modalRef}
        className="onboarding-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome to the Prompt Library"
      >
        <div className="onboarding-step-indicator" aria-live="polite">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`onboarding-dot${s === step ? " onboarding-dot-active" : ""}`}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">{`Step ${step} of 3`}</span>
        </div>

        {step === 1 && (
          <div className="onboarding-content">
            <h2 className="onboarding-headline">
              Pick a prompt. Add your context. Copy to your AI assistant.
            </h2>
            <div className="onboarding-icons" aria-hidden="true">
              <div className="onboarding-icon-step">
                <span className="onboarding-icon">&#9881;</span>
                <span className="onboarding-icon-label">Context</span>
              </div>
              <span className="onboarding-arrow">&#8594;</span>
              <div className="onboarding-icon-step">
                <span className="onboarding-icon">&#128196;</span>
                <span className="onboarding-icon-label">Prompt</span>
              </div>
              <span className="onboarding-arrow">&#8594;</span>
              <div className="onboarding-icon-step">
                <span className="onboarding-icon">&#10148;</span>
                <span className="onboarding-icon-label">AI assistant</span>
              </div>
            </div>
            <p className="onboarding-body">
              This library has prompts for everyday tasks and business projects.
              Fill in a few details about your situation, and the prompts update
              automatically — then copy and paste into ChatGPT, Claude, or any
              AI assistant.
            </p>
            <div className="onboarding-actions">
              <button
                ref={firstFocusRef}
                type="button"
                className="btn-primary onboarding-btn-next"
                onClick={() => setStep(2)}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-content">
            <h2 className="onboarding-headline">How context works</h2>
            <label className="onboarding-demo-label">
              What are you working on?
              <input
                ref={firstFocusRef}
                type="text"
                className="form-input onboarding-demo-input"
                placeholder="e.g. planning my week"
                value={demoTopic}
                onChange={(e) => setDemoTopic(e.target.value)}
              />
            </label>
            <p className="onboarding-demo-hint">
              See how your answer fills the prompt &#8595;
            </p>
            <pre className="prompt-pre onboarding-demo-preview" aria-label="Live prompt preview">
              {getDemoPreview(demoTopic)}
            </pre>
            <div className="onboarding-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(1)}
              >
                &larr; Back
              </button>
              <button
                type="button"
                className="btn-primary onboarding-btn-next"
                onClick={() => setStep(3)}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-content">
            <h2 className="onboarding-headline">
              Copy a prompt. Paste it anywhere.
            </h2>
            <p className="onboarding-body">
              Once you copy a prompt, paste it into ChatGPT at chatgpt.com,
              Claude at claude.ai, or any AI tool you prefer. The library also
              includes a button that copies your prompt and opens ChatGPT in a
              new tab — so you can go straight there.
            </p>
            <div className="onboarding-chips" aria-label="Compatible AI assistants">
              <span className="onboarding-chip">ChatGPT</span>
              <span className="onboarding-chip">Claude</span>
              <span className="onboarding-chip">Gemini</span>
            </div>
            <div className="onboarding-actions onboarding-actions-final">
              <button
                ref={firstFocusRef}
                type="button"
                className="btn-primary onboarding-btn-next"
                onClick={() => handleComplete(false)}
              >
                Start exploring &rarr;
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleComplete(true)}
              >
                Open Context drawer now &rarr;
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="onboarding-skip"
          onClick={handleSkip}
        >
          Skip for now
        </button>
      </div>
    </>
  );
}
