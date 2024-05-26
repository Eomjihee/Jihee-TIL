import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const modalWrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 10000,
})
export const modalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '800px',
  height: 'max-content',
  maxHeight: '500px',
  marginTop: '80px',
  overflowY: 'auto',
  border: `1px solid ${vars.color.mainDarker}`,
  opacity:0.95,
  backgroundColor: vars.color.main,
  borderRadius: 12,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.darkText
})
export const modalHeader = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px',
})
export const modalCloseBtn = style({
  fontSize: vars.fontSizing.T2,
  cursor: 'pointer',
  marginTop: '-20px',
  ":hover": {
    opacity: 0.8
  }
})
export const modalHeaderTitle = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.darkText,
  marginRight: 'auto',
  marginBottom: vars.spacing.md
})
export const modalTitle = style({
  fontSize: vars.fontSizing.T3,
  color: vars.color.primaryText,
  marginRight: 'auto',
  marginBottom: vars.spacing.md
})
export const modalButtons = style({
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: 50
})
export const modalUpdateBtn = style({
  border: 'none',
  borderRadius: 4,
  fontSize: vars.fontSizing.T3,
  padding: vars.spacing.lg,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: 'pointer',
  ":hover": {
    opacity : 0.8
  }
})
export const modalDeleteBtn = style({
  border: 'none',
  borderRadius: 4,
  fontSize: vars.fontSizing.T3,
  padding: vars.spacing.lg,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: 'pointer',
  ":hover": {
    opacity : 0.8
  }
})
export const modalInput = style({
  width: '100%',
  minHeight: '36px',
  border: 'none',
  borderRadius: 4,
  marginBottom: vars.spacing.big1,
  padding: vars.spacing.md,
  fontSize: vars.fontSizing.T4,
  boxShadow: vars.shadow.basic,
})