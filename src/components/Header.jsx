import React from "react";
import aaronDouglasLogoWhite from "../assets/AaronDouglasLogo White.png";
import aaronDouglasLogoBlack from "../assets/AaronDouglasLogoBlack.png";
import corekindLogoWhite from "../assets/CoreKind_Logo_White.PNG";
import corekindLogoBlack from "../assets/CoreKind_logo_black.png";

export default function Header({ mode, onModeChange, theme, setTheme, onOpenContext, contextButtonRef }) {
  const aaronDouglasLogo = theme === "night" ? aaronDouglasLogoWhite : aaronDouglasLogoBlack;
  const corekindLogo = theme === "night" ? corekindLogoWhite : corekindLogoBlack;

  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-brand-row">
          <img
            src={corekindLogo}
            alt="CoreKind"
            className="app-brand-logo"
            width={36}
            height={36}
          />
          <img
            src={aaronDouglasLogo}
            alt="Aaron Douglas LLC"
            className="app-brand-logo"
            width={36}
            height={36}
          />
          <h1 className="app-h1">CoreKind Aaron Douglas Prompt Library</h1>
        </div>
        <p className="app-sub">Set your context, pick a prompt, then copy.</p>
      </div>
      <div className="app-header-controls">
        <div className="tab-row" role="tablist" aria-label="Library mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "general"}
            className={mode === "general" ? "tab tab-active" : "tab"}
            onClick={() => onModeChange("general")}
          >
            Everyday & Creative
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "business"}
            className={mode === "business" ? "tab tab-active" : "tab"}
            onClick={() => onModeChange("business")}
          >
            Business
          </button>
        </div>
        <button
          type="button"
          className="btn-icon btn-icon-theme"
          onClick={() => setTheme((t) => (t === "night" ? "day" : "night"))}
          aria-label={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
          title={theme === "night" ? "Day mode" : "Night mode"}
        >
          <span aria-hidden="true">{theme === "night" ? "☀" : "🌙"}</span>
        </button>
        <button
          ref={contextButtonRef}
          type="button"
          className="btn-primary btn-cta-context"
          onClick={onOpenContext}
          aria-label="Open context"
        >
          Context
        </button>
      </div>
    </header>
  );
}
