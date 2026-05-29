import type { Language } from "./projects";

export const languageLabels: Record<Language, string> = {
  "zh-Hant": "ZH",
  en: "EN",
  ja: "JA",
};

export const translations = {
  "zh-Hant": {
    nav: {
      work: "WORK",
      articles: "ARTICLES",
      about: "ABOUT",
    },
    controls: {
      theme: "切換主題",
      sound: "切換聲音",
      language: "切換語言",
      menu: "開啟選單",
      close: "關閉",
      email: "寄送 Email",
      heart: "喜歡",
      top: "回到頂部",
    },
    project: {
      private: "非公開專案",
      role: "ROLE",
      year: "YEAR",
      brand: "BRAND",
      details: "DETAILS",
      close: "CLOSE",
    },
    footer: {
      copyright: "COPYRIGHT © HARRY.DS ALL RIGHTS RESERVED.",
      thanks: ["Thanks!", "Thank you!", "Big thanks!", "Mega thx!", "You rock!"],
    },
    mobile: {
      menu: "[ MENU ]",
      close: "[ CLOSE ]",
    },
  },
  en: {
    nav: {
      work: "WORK",
      articles: "ARTICLES",
      about: "ABOUT",
    },
    controls: {
      theme: "Toggle theme",
      sound: "Toggle sound",
      language: "Change language",
      menu: "Open menu",
      close: "Close",
      email: "Send email",
      heart: "Like",
      top: "Back to top",
    },
    project: {
      private: "PRIVATE PROJECT",
      role: "ROLE",
      year: "YEAR",
      brand: "BRAND",
      details: "DETAILS",
      close: "CLOSE",
    },
    footer: {
      copyright: "COPYRIGHT © HARRY.DS ALL RIGHTS RESERVED.",
      thanks: ["Thanks!", "Thank you!", "Big thanks!", "Mega thx!", "You rock!"],
    },
    mobile: {
      menu: "[ MENU ]",
      close: "[ CLOSE ]",
    },
  },
  ja: {
    nav: {
      work: "WORK",
      articles: "ARTICLES",
      about: "ABOUT",
    },
    controls: {
      theme: "テーマ切替",
      sound: "サウンド切替",
      language: "言語切替",
      menu: "メニューを開く",
      close: "閉じる",
      email: "メール送信",
      heart: "いいね",
      top: "トップへ戻る",
    },
    project: {
      private: "非公開プロジェクト",
      role: "ROLE",
      year: "YEAR",
      brand: "BRAND",
      details: "DETAILS",
      close: "CLOSE",
    },
    footer: {
      copyright: "COPYRIGHT © HARRY.DS ALL RIGHTS RESERVED.",
      thanks: ["Thanks!", "Thank you!", "Big thanks!", "Mega thx!", "You rock!"],
    },
    mobile: {
      menu: "[ MENU ]",
      close: "[ CLOSE ]",
    },
  },
} as const;
