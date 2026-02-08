import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ContextPanel from "./components/ContextPanel.jsx";
import PromptList from "./components/PromptList.jsx";

/**
 * Prompt Library Demo (no DB)
 * - Two modes: Everyday & Creative (general) | Business (business context)
 * - Context in toggleable drawer; collapsible prompt cards; night/day theme
 */

const DEFAULT_GENERAL_CONTEXT = {
  topic: "",
  goal: "",
  audience: "",
  tone: "warm, clear",
  constraints: "",
  details: "",
};

const DEFAULT_BUSINESS_CONTEXT = {
  projectName: "",
  shortDescription: "",
  audience: "",
  problem: "",
  solution: "",
  tonePreference: "warm, clear, empowering",
  values: "",
  accessibilityGoals: "plain language, screen-reader friendly headings, good contrast",
  constraints: "",
  stage: "idea",
};

const BUSINESS_PROMPTS = [
  {
    id: "clarify_cofounder",
    contextType: "business",
    category: "Clarify your idea",
    title: "AI Co-Founder Questions + Name + Next Steps",
    description:
      "Great first step. The model asks 5 questions, then proposes a name, tagline, and a 7-day plan.",
    template: `Act as my co-founder and product strategist.

Project context:
- Name: {{projectName}}
- One-liner: {{shortDescription}}
- Audience: {{audience}}
- Problem: {{problem}}
- Solution: {{solution}}
- Stage: {{stage}}
- Values: {{values}}
- Constraints: {{constraints}}
- Tone: {{tonePreference}}
- Accessibility goals: {{accessibilityGoals}}

Task:
1) Ask me 5 sharp questions to clarify the product (market, differentiation, pricing, delivery, risks).
2) Based on my answers, propose:
   - 3 better product names (if {{projectName}} is empty, generate 5)
   - a tagline
   - a value proposition in 2 sentences
3) Give a 7-day plan with daily tasks and outcomes.
Include accessibility considerations in any suggested website/content structure.`,
  },
  {
    id: "brand_logo",
    contextType: "business",
    category: "Design your presence",
    title: "Logo Concepts (3 directions)",
    description: "Three logo directions with color palette, symbolism, and vibe.",
    template: `Act as a brand designer.

Project context:
- Business name: {{projectName}}
- Description: {{shortDescription}}
- Audience: {{audience}}
- Values: {{values}}
- Tone: {{tonePreference}}
- Accessibility goals: {{accessibilityGoals}}

Task:
Generate 3 distinct logo concepts. For each concept include:
- Visual idea (symbols/shapes)
- Style keywords
- Color palette (include hex codes and note contrast considerations)
- Typography suggestion
- Why this fits the audience and values

Constraints: {{constraints}}`,
  },
  {
    id: "brand_styleguide",
    contextType: "business",
    category: "Design your presence",
    title: "Style Guide (colors, type, voice, do/don’t)",
    description: "A lightweight style guide that non-designers can follow.",
    template: `Create a simple brand style guide for {{projectName}}.

Context:
- One-liner: {{shortDescription}}
- Audience: {{audience}}
- Values: {{values}}
- Tone: {{tonePreference}}
- Accessibility goals: {{accessibilityGoals}}

Include:
1) Primary + secondary colors (hex) with guidance on accessible contrast
2) Font pairing suggestions (1 heading, 1 body) and fallback fonts
3) Tone of voice (3 bullets) + example sentences
4) Visual style rules (spacing, imagery, icons)
5) Do’s and Don’ts

Constraints: {{constraints}}`,
  },
  {
    id: "web_structure",
    contextType: "business",
    category: "Build something real",
    title: "Website Structure (Home/About/Services/Contact)",
    description: "A clear site outline with section headings and CTAs.",
    template: `Act as a UX writer + IA (information architecture) designer.

Project context:
- Name: {{projectName}}
- One-liner: {{shortDescription}}
- Audience: {{audience}}
- Problem: {{problem}}
- Solution: {{solution}}
- Values: {{values}}
- Tone: {{tonePreference}}
- Accessibility goals: {{accessibilityGoals}}

Task:
Create a 4-page website plan with:
- Home: hero headline, subheadline, CTA, 3 benefits, testimonials placeholder
- About: story, values, team/community, credibility
- Services: 3 offerings with short descriptions and who each is for
- Contact: form fields + what happens next

Make the headings semantic (H1/H2/H3), keep language plain, and include accessibility notes (keyboard nav, labels, contrast).`,
  },
  {
    id: "a11y_review",
    contextType: "business",
    category: "Make it inclusive",
    title: "Accessibility + Inclusive Language Review",
    description: "Paste any draft content and get an a11y + inclusivity critique.",
    template: `Act as an accessibility and inclusive design reviewer.

Project context:
- Name: {{projectName}}
- Audience: {{audience}}
- Accessibility goals: {{accessibilityGoals}}

Review the content below for:
- Plain language and cognitive accessibility
- Heading structure (H1/H2/H3), scannability
- Form labeling and error messages (if applicable)
- Keyboard navigation assumptions
- Color/contrast risks (if any colors mentioned)
- Inclusive language (avoid stereotypes, be respectful + empowering)
- Concrete rewrite suggestions (provide revised version)

Content to review:
[paste content here]`,
  },
  {
    id: "social_pack",
    contextType: "business",
    category: "Communicate",
    title: "Social Media Starter Pack (3 posts + hashtags)",
    description: "Three launch posts aligned with tone + audience.",
    template: `Write 3 social posts announcing {{projectName}}.

Context:
- One-liner: {{shortDescription}}
- Audience: {{audience}}
- Values: {{values}}
- Tone: {{tonePreference}}
- Accessibility goals: {{accessibilityGoals}}

Requirements:
- Platform: Instagram (but keep it adaptable)
- Each post: 1–2 short paragraphs + 5–10 hashtags
- Include a suggested alt-text line for any implied image
- Avoid hype; be specific and community-grounded`,
  },
];

const GENERAL_PROMPTS = [
  {
    id: "organize_weekly_plan",
    contextType: "general",
    category: "Organize my week",
    title: "Weekly plan from my goal",
    description: "Get a structured weekly plan based on your goal and constraints.",
    template: `Act as a friendly productivity coach.

Context:
- What I'm focusing on: {{topic}}
- My goal this week: {{goal}}
- Who or what this affects: {{audience}}
- Tone: {{tone}}
- Constraints: {{constraints}}
- Extra context: {{details}}

Task:
Create a practical weekly plan (Mon–Sun or next 7 days) that includes:
1) 3–5 priority tasks or themes
2) Suggested time blocks or focus sessions
3) One or two buffer slots for the unexpected
4) A simple daily check-in question or reflection prompt

Keep it realistic and aligned with my constraints.`,
  },
  {
    id: "organize_priority_list",
    contextType: "general",
    category: "Organize my week",
    title: "Priority list and time blocks",
    description: "Turn your goal into a priority list and suggested time blocks.",
    template: `Act as a productivity coach.

Context:
- Focus area: {{topic}}
- Goal: {{goal}}
- Constraints: {{constraints}}
- Details: {{details}}

Task:
1) List 5–7 priorities in order of impact or urgency.
2) Suggest how to group them into 2–4 time blocks (e.g. "Deep work", "Admin", "Creative").
3) Give one tip to protect focus time.

Tone: {{tone}}. Keep it clear and actionable.`,
  },
  {
    id: "message_draft_avoiding",
    contextType: "general",
    category: "Write a message I've been avoiding",
    title: "Draft the message I've been avoiding",
    description: "Get a draft for a difficult email, text, or conversation.",
    template: `Act as a thoughtful communication coach.

Context:
- What the message is about: {{topic}}
- What I want to achieve: {{goal}}
- Who I'm writing to: {{audience}}
- Tone I want: {{tone}}
- Any constraints or sensitivities: {{constraints}}
- Extra context: {{details}}

Task:
Draft a message (email or text length) that:
1) Opens in a way that feels genuine and not confrontational
2) States what I need or want clearly
3) Leaves room for the other person's perspective
4) Suggests a next step or invitation to talk

Offer 2 optional opening lines (softer and more direct) so I can choose.`,
  },
  {
    id: "message_soften_clarify",
    contextType: "general",
    category: "Write a message I've been avoiding",
    title: "Soften or clarify my draft",
    description: "Paste your draft and get a softer or clearer version.",
    template: `Act as an editor for difficult conversations.

Context:
- Situation: {{topic}}
- Goal: {{goal}}
- Audience: {{audience}}
- Tone: {{tone}}
- My draft or key points: {{details}}

Task:
Rewrite my message to be clearer and more considerate without losing my point. Suggest one alternative sentence for any part that might land badly. Keep the same length roughly.`,
  },
  {
    id: "brainstorm_side_project",
    contextType: "general",
    category: "Brainstorm ideas for side project or passion",
    title: "5–10 ideas for my side project or passion",
    description: "Generate ideas for a hobby, side project, or passion using your topic and goal.",
    template: `Act as a creative brainstorm partner.

Context:
- Topic / area: {{topic}}
- What I want to get out of it: {{goal}}
- Who it's for (if anyone): {{audience}}
- Constraints: {{constraints}}
- Extra context: {{details}}

Task:
Generate 5–10 concrete ideas (not necessarily business). For each:
- One sentence description
- One small first step I could take this week
- One "what could this become?" possibility

Tone: {{tone}}. Encourage exploration without pushing.`,
  },
  {
    id: "brainstorm_name_first_steps",
    contextType: "general",
    category: "Brainstorm ideas for side project or passion",
    title: "Name ideas and first steps",
    description: "Get name ideas and a short action plan for your project or passion.",
    template: `Act as a naming and planning partner.

Context:
- Project / passion: {{topic}}
- Goal: {{goal}}
- Audience: {{audience}}
- Constraints: {{constraints}}

Task:
1) Suggest 5 name or title options (with a one-line reason for each).
2) List 3–5 first steps I could take in the next 2 weeks.
3) One question to help me decide what to do first.

Tone: {{tone}}.`,
  },
  {
    id: "build_simple_site_brief",
    contextType: "general",
    category: "Build a simple site",
    title: "One-page site brief (sections, tone, audience)",
    description: "Get a clear brief you can paste into a no-code builder like Lovable.",
    template: `Act as a simple-website strategist.

Context:
- What the site is for: {{topic}}
- Goal of the site: {{goal}}
- Who it's for: {{audience}}
- Tone: {{tone}}
- Constraints: {{constraints}}
- Extra details: {{details}}

Task:
Create a one-page site brief that includes:
1) Suggested sections (e.g. Hero, What I do, How it works, Contact) with one sentence each
2) A headline and subheadline for the hero
3) Tone and word-choice notes for the audience
4) One short paragraph I could paste into a no-code site builder (e.g. Lovable) to generate a first draft

Keep it scannable and ready to copy-paste.`,
  },
  {
    id: "build_lovable_prompt",
    contextType: "general",
    category: "Build a simple site",
    title: "Lovable-ready prompt from my topic + goal",
    description: "A single prompt you can paste into Lovable to generate a simple site.",
    template: `Act as a product spec writer for no-code tools.

Context:
- Topic: {{topic}}
- Goal: {{goal}}
- Audience: {{audience}}
- Tone: {{tone}}
- Details: {{details}}

Task:
Write one cohesive prompt (2–4 short paragraphs) that I can paste into Lovable (or similar) to generate a simple, accessible website. Include:
- Purpose and one-line description
- Main sections and what each should convey
- Tone and any accessibility preferences (plain language, clear headings)
- Any specific requests (e.g. contact form, links)

Output only the prompt, ready to copy-paste.`,
  },
  {
    id: "define_mission_statement",
    contextType: "general",
    category: "Define my mission",
    title: "Personal mission statement",
    description: "Articulate your purpose or mission (life, community, or creative—not necessarily business).",
    template: `Act as a values and purpose coach.

Context:
- What I care about / my focus: {{topic}}
- What I want to achieve or stand for: {{goal}}
- Who I'm doing it for: {{audience}}
- Tone: {{tone}}
- Constraints or context: {{constraints}}
- Extra: {{details}}

Task:
Help me write a personal mission statement (2–4 sentences) that:
1) States my "why" in plain language
2) Is specific enough to guide decisions
3) Feels true to me (not corporate jargon)

Offer one draft and one shorter "elevator" version.`,
  },
  {
    id: "define_values_purpose",
    contextType: "general",
    category: "Define my mission",
    title: "Values and purpose in plain language",
    description: "Get a clear \"why\" and values in 2–3 sentences.",
    template: `Act as a clarity coach for purpose and values.

Context:
- My focus: {{topic}}
- What I want: {{goal}}
- Who for: {{audience}}
- Tone: {{tone}}
- Details: {{details}}

Task:
1) Summarize my purpose or "why" in 2–3 sentences (plain language, no buzzwords).
2) List 3–5 values that seem to show up, with a one-line definition of each.
3) One question I can sit with to refine this.

Keep it grounded and usable for everyday decisions.`,
  },
];

const PROMPTS = [...GENERAL_PROMPTS, ...BUSINESS_PROMPTS];

function renderTemplate(template, ctx) {
  // Replace {{var}} with ctx[var] or a friendly placeholder
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = (ctx[key] ?? "").toString().trim();
    return val.length ? val : `[${key}]`;
  });
}

function toBullets(str) {
  // turn comma-separated values into nicer bullets (for display only)
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function PromptLibraryDemo() {
  const [mode, setMode] = useState("general");
  const [theme, setTheme] = useState("night");
  const [contextOpen, setContextOpen] = useState(false);
  const [generalContext, setGeneralContext] = useState(DEFAULT_GENERAL_CONTEXT);
  const [businessContext, setBusinessContext] = useState(DEFAULT_BUSINESS_CONTEXT);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const promptsByMode = useMemo(() => {
    return PROMPTS.filter((p) => p.contextType === mode);
  }, [mode]);

  const categories = useMemo(() => {
    const set = new Set(promptsByMode.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [promptsByMode]);

  const filteredPrompts = useMemo(() => {
    if (selectedCategory === "All") return promptsByMode;
    return promptsByMode.filter((p) => p.category === selectedCategory);
  }, [promptsByMode, selectedCategory]);

  async function copy(text, id) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1200);
    } catch {
      alert("Copy failed — your browser may block clipboard access.");
    }
  }

  function updateGeneralField(field) {
    return (e) => setGeneralContext((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function updateBusinessField(field) {
    return (e) => setBusinessContext((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const businessValuesBullets = toBullets(businessContext.values);
  const businessConstraintsBullets = toBullets(businessContext.constraints);
  const generalConstraintsBullets = toBullets(generalContext.constraints);

  const styles = getStyles(theme);

  return (
    <div style={styles.page}>
      <Header
        mode={mode}
        onModeChange={(m) => {
          setMode(m);
          setSelectedCategory("All");
        }}
        theme={theme}
        setTheme={setTheme}
        onOpenContext={() => setContextOpen(true)}
        styles={styles}
      />

      <ContextPanel
        open={contextOpen}
        onClose={() => setContextOpen(false)}
        mode={mode}
        generalContext={generalContext}
        businessContext={businessContext}
        updateGeneralField={updateGeneralField}
        updateBusinessField={updateBusinessField}
        onResetGeneral={() => setGeneralContext(DEFAULT_GENERAL_CONTEXT)}
        onResetBusiness={() => setBusinessContext(DEFAULT_BUSINESS_CONTEXT)}
        generalConstraintsBullets={generalConstraintsBullets}
        businessValuesBullets={businessValuesBullets}
        businessConstraintsBullets={businessConstraintsBullets}
        styles={styles}
        DEFAULT_GENERAL_CONTEXT={DEFAULT_GENERAL_CONTEXT}
        DEFAULT_BUSINESS_CONTEXT={DEFAULT_BUSINESS_CONTEXT}
      />

      <main style={styles.main}>
        <PromptList
          prompts={filteredPrompts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          onCopy={copy}
          copiedId={copiedId}
          renderTemplate={renderTemplate}
          generalContext={generalContext}
          businessContext={businessContext}
          styles={styles}
        />
      </main>

      <footer style={styles.footer}>
        <small>
          Context in drawer • Prompts collapse/expand • Night/day toggle
        </small>
      </footer>
    </div>
  );
}

function getStyles(theme) {
  const isNight = theme === "night";
  const pageBg = isNight ? "#0b0d12" : "#f5f5f7";
  const text = isNight ? "#e9ecf1" : "#1a1a1a";
  const textMuted = isNight ? "#b9c0cc" : "#6e6e73";
  const cardBg = isNight ? "#0f131b" : "#ffffff";
  const cardBorder = isNight ? "#20283a" : "#e5e5e7";
  const inputBg = isNight ? "#0b0d12" : "#ffffff";
  const inputBorder = isNight ? "#2a3140" : "#d1d1d6";
  const preBg = isNight ? "#07090d" : "#f5f5f7";
  const primary = "#3758F9";
  const tabInactiveBg = isNight ? "#161a23" : "#e5e5e7";
  const tabInactiveColor = isNight ? "#9aa3b4" : "#6e6e73";

  return {
    page: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      padding: 16,
      background: pageBg,
      color: text,
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    headerLeft: { flex: "1 1 200px", minWidth: 0 },
    brandRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    brandLogo: {
      width: 36,
      height: 36,
      objectFit: "contain",
      flexShrink: 0,
    },
    corekindLogoPlaceholder: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: tabInactiveBg,
      border: `1px solid ${cardBorder}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    corekindPlaceholderText: {
      fontSize: 12,
      fontWeight: 700,
      color: textMuted,
      letterSpacing: "0.02em",
    },
    headerControls: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      alignItems: "center",
    },
    h1: { margin: 0, fontSize: 20, letterSpacing: 0.2, lineHeight: 1.3 },
    sub: { margin: "4px 0 0", color: textMuted, maxWidth: 480, lineHeight: 1.4, fontSize: 14 },
    tabRow: {
      display: "flex",
      gap: 0,
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${cardBorder}`,
    },
    tab: {
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 500,
      background: tabInactiveBg,
      border: "none",
      color: tabInactiveColor,
      cursor: "pointer",
      minHeight: 44,
    },
    tabActive: {
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 600,
      background: primary,
      border: "none",
      color: "white",
      cursor: "pointer",
      minHeight: 44,
    },
    themeBtn: {
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 500,
      background: tabInactiveBg,
      border: `1px solid ${cardBorder}`,
      color: tabInactiveColor,
      borderRadius: 12,
      cursor: "pointer",
      minHeight: 44,
    },
    contextBtn: {
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 600,
      background: primary,
      border: "none",
      color: "white",
      borderRadius: 12,
      cursor: "pointer",
      minHeight: 44,
    },
    main: {
      maxWidth: "100%",
      overflowX: "hidden",
    },
    drawerOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 1000,
      cursor: "pointer",
    },
    drawer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "min(400px, 100vw)",
      maxWidth: "100%",
      height: "100%",
      background: cardBg,
      borderRight: `1px solid ${cardBorder}`,
      zIndex: 1001,
      overflowY: "auto",
      boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
    },
    drawerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottom: `1px solid ${cardBorder}`,
    },
    drawerTitle: { margin: 0, fontSize: 18 },
    drawerBody: { padding: 16 },
    closeBtn: {
      padding: "8px 14px",
      fontSize: 14,
      fontWeight: 600,
      background: tabInactiveBg,
      border: `1px solid ${cardBorder}`,
      color: text,
      borderRadius: 10,
      cursor: "pointer",
    },
    formGrid: { display: "grid", gap: 10, marginTop: 12 },
    label: { display: "grid", gap: 6, fontSize: 12, color: textMuted },
    input: {
      background: inputBg,
      border: `1px solid ${inputBorder}`,
      color: text,
      borderRadius: 10,
      padding: "10px 10px",
      outline: "none",
    },
    textarea: {
      background: inputBg,
      border: `1px solid ${inputBorder}`,
      color: text,
      borderRadius: 10,
      padding: "10px 10px",
      outline: "none",
      resize: "vertical",
    },
    previewBox: {
      marginTop: 12,
      padding: 12,
      borderRadius: 12,
      border: `1px dashed ${inputBorder}`,
      background: inputBg,
    },
    h3: { margin: "0 0 8px", fontSize: 14, color: text },
    previewLine: { margin: "6px 0", color: textMuted, lineHeight: 1.35 },
    secondaryBtn: {
      marginTop: 12,
      background: tabInactiveBg,
      border: `1px solid ${cardBorder}`,
      color: text,
      borderRadius: 12,
      padding: "10px 12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    promptListSection: {
      background: cardBg,
      border: `1px solid ${cardBorder}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      overflow: "hidden",
      minWidth: 0,
    },
    libraryHeader: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "flex-end",
      justifyContent: "space-between",
      minWidth: 0,
    },
    h2: { margin: 0, fontSize: 18, minWidth: 0 },
    categoryLabel: {
      display: "grid",
      gap: 6,
      fontSize: 12,
      color: textMuted,
      maxWidth: "100%",
      minWidth: 0,
      width: "100%",
    },
    categorySelect: {
      width: "100%",
      maxWidth: 260,
      minWidth: 0,
      boxSizing: "border-box",
    },
    promptList: { display: "grid", gap: 12, marginTop: 12 },
    promptCard: {
      background: inputBg,
      border: `1px solid ${cardBorder}`,
      borderRadius: 16,
      padding: 0,
      overflow: "hidden",
    },
    promptCardHeader: {
      width: "100%",
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: 14,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      font: "inherit",
      color: "inherit",
      minHeight: 44,
    },
    promptCardHeaderContent: { flex: 1 },
    category: {
      display: "inline-block",
      fontSize: 11,
      padding: "4px 8px",
      borderRadius: 999,
      background: tabInactiveBg,
      border: `1px solid ${cardBorder}`,
      color: textMuted,
      marginBottom: 6,
    },
    promptTitle: { margin: 0, fontSize: 15 },
    promptDesc: { margin: "6px 0 0", color: textMuted, lineHeight: 1.35, fontSize: 13 },
    chevron: {
      fontSize: 18,
      fontWeight: 600,
      color: textMuted,
      flexShrink: 0,
    },
    promptCardBody: {
      padding: "0 14px 14px",
      borderTop: `1px solid ${cardBorder}`,
    },
    pre: {
      margin: "0 0 12px",
      padding: 12,
      borderRadius: 12,
      border: `1px solid ${cardBorder}`,
      background: preBg,
      color: text,
      overflowX: "auto",
      whiteSpace: "pre-wrap",
      lineHeight: 1.4,
      fontSize: 12.5,
    },
    primaryBtn: {
      background: primary,
      border: `1px solid ${primary}`,
      color: "white",
      borderRadius: 12,
      padding: "10px 12px",
      cursor: "pointer",
      fontWeight: 600,
      minHeight: 44,
      whiteSpace: "nowrap",
    },
    footer: { marginTop: 14, color: textMuted, fontSize: 13 },
  };
}
