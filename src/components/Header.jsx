import React from "react";
import aaronDouglasLogoWhite from "../assets/AaronDouglasLogo White.png";
import aaronDouglasLogoBlack from "../assets/AaronDouglasLogoBlack.png";

export default function Header({ mode, onModeChange, theme, setTheme, onOpenContext, styles }) {
  const aaronDouglasLogo = theme === "night" ? aaronDouglasLogoWhite : aaronDouglasLogoBlack;

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <div style={styles.brandRow}>
          <div style={styles.corekindLogoPlaceholder} title="CoreKind logo placeholder">
            <span style={styles.corekindPlaceholderText}>CK</span>
          </div>
          <img
            src={aaronDouglasLogo}
            alt="Aaron Douglas Institute"
            style={styles.brandLogo}
            width={36}
            height={36}
          />
          <h1 style={styles.h1}>CoreKind Aaron Douglas Institute</h1>
        </div>
        <p style={styles.sub}>Choose a mode, fill your context, then copy prompts.</p>
      </div>
      <div style={styles.headerControls}>
        <div style={styles.tabRow} role="tablist" aria-label="Library mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "general"}
            style={mode === "general" ? styles.tabActive : styles.tab}
            onClick={() => onModeChange("general")}
          >
            Everyday & Creative
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "business"}
            style={mode === "business" ? styles.tabActive : styles.tab}
            onClick={() => onModeChange("business")}
          >
            Business
          </button>
        </div>
        <button
          type="button"
          style={styles.themeBtn}
          onClick={() => setTheme((t) => (t === "night" ? "day" : "night"))}
          aria-label={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
          title={theme === "night" ? "Day mode" : "Night mode"}
        >
          {theme === "night" ? "Day" : "Night"}
        </button>
        <button
          type="button"
          style={styles.contextBtn}
          onClick={onOpenContext}
          aria-label="Open context"
        >
          Context
        </button>
      </div>
    </header>
  );
}
