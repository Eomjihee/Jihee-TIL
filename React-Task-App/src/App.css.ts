import { createGlobalTheme, style } from "@vanilla-extract/css";
// vanilla-extract 이용
// - 원활한 사용을 위해 vite-config.ts에 vanillaExtractPlugin() 플러그인 추가 필수

export const vars = createGlobalTheme("#root", {
  color: {
    main: "#f2f2f2",
    mainDarker: "hsl(219, 39%, 48%)",
    mainFaded: "#657da7",
    mainFadedBright: "#98aad5",
    list: "rgba(235, 236, 240, 0.5)",
    task: "#fdfdfd",
    taskHover: "#4d94ff",
    brightText: "#f1f1f1",
    darkText: "#212121",
    primaryText: "#47608b",
    secondaryDarkText: "#c8c8c8",
    secondaryDarkTextHover: "#dae0e7",
    selectedTab: "#4095eb",
    updateButton: "#337dcd",
    deleteButton: "#c04959",
  },
  fontSizing: {
    T1: "32px",
    T2: "24px",
    T3: "18px",
    T4: "14px",
    P1: "12px",
  },
  spacing: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    big1: "24px",
    big2: "16px",
    listSpacing: "32px",
  },
  font: {
    body: "arial",
  },
  shadow: {
    basic: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
    hover: "4px 4px 8px 0px rgba(27, 54, 74, 0.3)",
  },
  minWidth: {
    list: "250px",
  },
});

export const appContainer = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  height: "max-content",
  width: "100vw",
});

export const board = style({
  display: "flex",
  flexDirection: "row",
  height: "100%",
});
export const buttons = style({
  marginTop: "auto",
  paddingLeft: vars.spacing.big2,
});
export const deleteBoardBtn = style({
  border: 'none',
  borderRadius: 4,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: 'auto',
  marginBottom: 28,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ":hover" : {
    opacity: 0.8
  }
});
export const loggerBtn = style({
  border: 'none',
  borderRadius: 4,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: '15px',
  marginRight: '28px',
  marginBottom: '28px',
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ":hover" : {
    opacity: 0.8
  }

});