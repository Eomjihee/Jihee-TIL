import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";


export const container = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap', // wrap 설정시 width를 줄일 경우 아래로 내려가도록 설정
  rowGap: 15, // space 확보
  minHeight: 'max-content',
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainDarker
})
export const title = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  marginRight: vars.spacing.big1,
})
export const addButton = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  cursor: 'pointer',
  marginLeft: vars.spacing.big1,
  ":hover": {
    opacity: 0.8
  }
})
export const boardItem = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.mainFaded,
  padding: vars.spacing.md,
  borderRadius: 4,
  cursor: 'pointer',
  marginRight:vars.spacing.big1,
  ":hover":{
    opacity: 0.8,
    transform: "scale(1.03)"
  }
})
export const boardItemActive = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.selectedTab,
  padding: vars.spacing.md,
  borderRadius: 4,
  cursor: "pointer",
  marginRight: vars.spacing.big1
})
export const addSection = style({
  display:'flex',
  alignItems: "center",
  marginLeft: "auto"
})
export const smallTitle = style({
  color:vars.color.brightText,
  fontSize: vars.fontSizing.T3
})