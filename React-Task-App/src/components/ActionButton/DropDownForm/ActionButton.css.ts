import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const taskButton = style({
    display: 'flex',
    alignItems: 'center',
    height: 'max-content',
    borderRadius:4,
    marginTop: vars.spacing.sm,
    fontSize: vars.fontSizing.T3,
    padding: vars.spacing.md,
    cursor: 'pointer',
    ":hover": {
      backgroundColor: vars.color.secondaryDarkTextHover
    }
  })
  export const listButton = style({
    display: 'flex',
    alignItems: 'center',
    height: 'max-content',
    borderRadius:4,
    minWidth: vars.minWidth.list,
    marginTop: vars.spacing.sm,
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.mainFaded,
    paddingTop: vars.spacing.sm,
    paddingBottom: vars.spacing.sm,
    paddingRight: vars.spacing.big2,
    paddingLeft: vars.spacing.big2,
    cursor: 'pointer',
    ":hover": {
      backgroundColor: vars.color.mainFadedBright
    }
})
