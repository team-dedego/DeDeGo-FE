import { style } from "@vanilla-extract/css";
import { screen } from "@/styles";

export const container = style({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
});

export const main = style({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const errorSection = style({
  textAlign: "center",
  gap: "16px",
});

export const errorCode = style({
  fontSize: "96px",
  fontWeight: "bold",
  color: "#16a34a",
  lineHeight: 1,
  margin: 0,
  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      fontSize: "64px",
    },
  },  
});

export const errorTitle = style({
  fontSize: "32px",
  fontWeight: "600",
  color: "#1f2937",
  margin: 0,
    "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      fontSize: "24px",
    },
  },  
});

export const errorDescription = style({
  fontSize: "18px",
  color: "#6b7280",
  lineHeight: 1.6,
  maxWidth: "500px",
  margin: "0 auto",
  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      fontSize: "16px",
    },
  },  
});

export const secondaryButton = style({
  display: "inline-block",
  color: "#16a34a",

  ":hover": {
    textDecoration: "underline",
  }
});