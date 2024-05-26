import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.spacing.md,
  backgroundColor: vars.color.task,
  borderRadius: 8,
  marginBottom: vars.spacing.big2,
  boxShadow: vars.shadow.basic,
  cursor: 'pointer',
  ":hover": {
    border: `1px solid ${vars.color.taskHover}`,
    transform: "scale(1.03)",
    boxShadow: vars.shadow.hover,
  }
})
export const title = style({
  fontSize: vars.fontSizing.T4,
  fontWeight: 'bold',
  marginBottom: vars.spacing.sm
})
export const description = style({
  fontSize: vars.fontSizing.P1,

})