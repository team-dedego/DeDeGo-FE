import { keyframes, style } from "@vanilla-extract/css";
import { theme, screen } from "@/styles";

export const outputSection = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  minHeight: 0,
  overflow: "hidden",
});

export const languageHeader = style({
  padding: "16px 0px",
  borderBottom: `2px solid ${theme.gray}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      padding: "0",
    },
  },
});

export const languageLabel = style({
  padding: "8px 30px 8px 30px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
  lineHeight: 1.5,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "none",
    },
  },
});

export const outputText = style({
  flex: 1,
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  padding: "30px",
  minHeight: 0,
  overflowY: "auto",
});

export const termWrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const termLabel = style({
  color: theme.primary,
  fontWeight: "600",
  lineHeight: "15px",
  fontSize: "12px",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "default",
  textAlign: "left",
  fontFamily: "inherit",
  userSelect: "none",
});

const underlineAnimation = keyframes({
  "0%": {
    backgroundSize: "0% 2px",
  },
  "100%": {
    backgroundSize: "100% 2px",
  },
});

const highlightPulse = keyframes({
  "0%": {
    backgroundColor: "transparent",
  },
  "50%": {
    backgroundColor: "#FEF3C7",
  },
  "100%": {
    backgroundColor: "transparent",
  },
});

export const underlinedTerm = style({
  backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.primary})`,
  backgroundPosition: "0 calc(100% - 0px)", 
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 2px",
  transition: "color 0.2s ease",
  fontWeight: "bold",
  animation: `${underlineAnimation} 0.4s ease-out forwards`,
  display: "inline",
  cursor: "pointer",
  
  ":hover": {
    opacity: 0.7,
  },
});

export const termHighlight = style({
  animation: `${highlightPulse} 1.5s ease-in-out`,
});