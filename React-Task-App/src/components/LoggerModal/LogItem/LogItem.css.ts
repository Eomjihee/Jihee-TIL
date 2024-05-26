import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const logItemWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'flex-start',
  padding: vars.spacing.md,
  marginBottom: vars.spacing.big2,
  width: '100%',
  borderBottom: 'solid 1px rgb(191, 197, 217, 0.3)',
  ":hover": {
    backgroundColor: vars.color.mainFadedBright,
    borderRadius:8
  }
})
export const logItemMsg = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: vars.color.brightText,
  fontWeight: 'bold',
  fontSize: vars.fontSizing.T4,
  marginBottom:vars.spacing.sm
})
export const logItemAuthor = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: 8,
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  fontWeight: 'bold',
  marginBottom: vars.spacing.md
})
export const logItemDate = style({
  fontSize: vars.fontSizing.T4,
  fontWeight: 'bold',
  marginBottom: vars.spacing.md
})