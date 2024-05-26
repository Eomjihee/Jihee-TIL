import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const logMdalWrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 10000,
})
export const logMdalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '800px',
  height: 'max-content',
  maxHeight: '500px',
  overflowY: 'auto',
  borderRadius: '14px',
  padding: 20,
  boxShadow: vars.shadow.basic,
  backgroundColor: vars.color.mainDarker,
  opacity: 0.95,
  color: vars.color.brightText
})
export const logMdalHeader = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px'
})
export const logMdalTitle = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: 'auto',
  marginBottom: vars.spacing.md,
})
export const logMdalCloseBtn = style({
  fontSize: vars.fontSizing.T2,
  cursor: 'pointer',
  marginTop: '-20px',
  ":hover": {
    opacity: 0.8
  }
})
export const logMdalBody = style({
  maxHeight: '400px',
  overflowY: 'auto',
  width: '100%'
})