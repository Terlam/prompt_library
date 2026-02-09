/**
 * Design tokens — values only, no component logic.
 * Used by theme.css via CSS custom properties (see [data-theme] in theme.css).
 */

export const spacing = {
  space1: "4px",
  space2: "8px",
  space3: "12px",
  space4: "16px",
  space5: "24px",
  space6: "32px",
};

export const typography = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize11: "11px",
  fontSize12: "12px",
  fontSize13: "13px",
  fontSize14: "14px",
  fontSize15: "15px",
  fontSize18: "18px",
  fontSize20: "20px",
  lineHeightTight: 1.1,
  lineHeightNormal: 1.35,
  lineHeightRelaxed: 1.4,
  lineHeightBase: 1.5,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
  letterSpacingTight: "0.02em",
  letterSpacingWide: "0.2px",
};

export const radius = {
  radiusSm: "8px",
  radiusMd: "10px",
  radiusLg: "12px",
  radiusXl: "16px",
  radiusPill: "999px",
};

export const colors = {
  primary: "#3758F9",
  overlay: "rgba(0,0,0,0.4)",
  shadow: "0 10px 30px rgba(0,0,0,0.08)",
  drawerShadow: "4px 0 24px rgba(0,0,0,0.15)",
};

export const day = {
  pageBg: "#f5f5f7",
  text: "#1a1a1a",
  textMuted: "#6e6e73",
  cardBg: "#ffffff",
  cardBorder: "#e5e5e7",
  inputBg: "#ffffff",
  inputBorder: "#d1d1d6",
  preBg: "#f5f5f7",
  tabInactiveBg: "#e5e5e7",
  tabInactiveColor: "#6e6e73",
};

export const night = {
  pageBg: "#0b0d12",
  text: "#e9ecf1",
  textMuted: "#b9c0cc",
  cardBg: "#0f131b",
  cardBorder: "#20283a",
  inputBg: "#0b0d12",
  inputBorder: "#2a3140",
  preBg: "#07090d",
  tabInactiveBg: "#161a23",
  tabInactiveColor: "#9aa3b4",
};
