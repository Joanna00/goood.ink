import { assets } from "./assetManifest";

export type Language = "zh-Hant" | "en" | "ja";
export type ProjectSize = "hero" | "medium" | "xs";

export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  id: number;
  binaryId: string;
  visibility?: "private";
  heading: string;
  headingByLang?: Partial<Record<Language, string>>;
  date: string;
  brand: string;
  tags: string;
  tagsByLang?: Partial<Record<Language, string>>;
  primaryColor: string;
  secondaryColor: string;
  heroImage: string;
  mainImage?: string;
  detailImages: string[];
  heroHeadingImage?: string;
  specialHeadingImage?: string;
  size: ProjectSize;
  description: string;
  quote: string;
  sections: ProjectSection[];
}

const projectCopy = {
  product: "From research signals to shipped interface systems, each case study focuses on reducing friction while keeping the experience memorable.",
  system: "The work blends interaction design, front-end prototyping, component logic, and visual language into a single production-minded process.",
  craft: "Every screen is treated as a working artifact: fast to scan, deliberate in motion, and resilient across the edges where real users arrive.",
};

export const projects: Project[] = [
  {
    id: 1,
    binaryId: "00000001",
    visibility: "private",
    heading: "沉浸式\nAI 互動新聞",
    date: "2025 - PRESENT",
    brand: "NOWnews",
    tags: "AI / MOBILE APP",
    primaryColor: "#FBC92B",
    secondaryColor: "#18181A",
    heroImage: assets.images.nownewsBg,
    mainImage: assets.images.nownews01,
    detailImages: [assets.images.nownews02, assets.images.nownews03, assets.images.nownews04],
    heroHeadingImage: assets.images.nownewsHero,
    size: "hero",
    description: "A private mobile newsroom exploration that turns breaking stories into an immersive AI-guided reading loop.",
    quote: "News can feel immediate without becoming noisy.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 2,
    binaryId: "00000010",
    heading: "串流影劇指南",
    date: "2019 - PRESENT",
    brand: "awwrated",
    tags: "WEB APP / REACT / NEXT.JS",
    primaryColor: "#FF1650",
    secondaryColor: "#151648",
    heroImage: assets.images.awwratedBg,
    detailImages: [],
    specialHeadingImage: assets.images.awwratedHeading,
    size: "medium",
    description: "A streaming discovery surface that helps viewers compare titles, ratings, providers, and watch intent at speed.",
    quote: "Discovery works best when choosing feels lighter.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 3,
    binaryId: "00000011",
    heading: "設計系統建置",
    date: "2019 - 2020",
    brand: "Shopmatic",
    tags: "DESIGN OPS / STORYBOOK / REACT",
    primaryColor: "#4285f4",
    secondaryColor: "#212b36",
    heroImage: assets.images.shopmaticDsBg,
    mainImage: assets.images.shopmaticDs01,
    detailImages: [assets.images.shopmaticDs02, assets.images.shopmaticDs03, assets.images.shopmaticDs04],
    heroHeadingImage: assets.images.shopmaticDsHero,
    size: "medium",
    description: "A design operations foundation for product teams shipping commerce tools across repeated workflows.",
    quote: "A component is only useful when teams trust it under pressure.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 4,
    binaryId: "00000100",
    heading: "品牌電商\n專屬 APP",
    date: "2020 - 2021",
    brand: "Shopmatic",
    tags: "SAAS / DESIGN SYSTEM / MOBILE",
    primaryColor: "#FFFFFF",
    secondaryColor: "#111111",
    heroImage: assets.images.buyerAppBg,
    mainImage: assets.images.buyerApp01,
    detailImages: [assets.images.buyerApp02, assets.images.buyerApp03, assets.images.buyerApp04],
    heroHeadingImage: assets.images.buyerAppHero,
    size: "medium",
    description: "A branded buyer app system for merchants who needed mobile storefronts without rebuilding their commerce stack.",
    quote: "A small store deserves the feeling of a real product.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 5,
    binaryId: "00000101",
    heading: "結帳流程優化",
    date: "2018 - 2019",
    brand: "Shopmatic",
    tags: "ECOMMERCE / SAAS / REFACTOR",
    primaryColor: "#4285f4",
    secondaryColor: "#EFF3F6",
    heroImage: assets.images.checkoutBg,
    mainImage: assets.images.checkout01,
    detailImages: [assets.images.checkout02, assets.images.checkout03],
    heroHeadingImage: assets.images.checkoutHero,
    size: "medium",
    description: "A checkout refactor that clarifies buyer decisions, merchant constraints, and system states in one flow.",
    quote: "Conversion is a design quality, not just a metric.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 6,
    binaryId: "00000110",
    heading: "旅行怪獸\nAPP 孵化",
    date: "2016 - 2017",
    brand: "KKday",
    tags: "MOBILE APP / BRANDING / STRATEGY",
    primaryColor: "#FFC410",
    secondaryColor: "#006C7F",
    heroImage: assets.images.kkdayBg,
    mainImage: assets.images.kkday01,
    detailImages: [assets.images.kkday02, assets.images.kkday03, assets.images.kkday04],
    heroHeadingImage: assets.images.kkdayHero,
    size: "xs",
    description: "An incubation track for a travel product identity, mobile interaction model, and campaign-ready experience.",
    quote: "Travel planning needs momentum before it needs more choices.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 7,
    binaryId: "00000111",
    heading: "國際中文學習平台",
    date: "2015 - 2017",
    brand: "TutorMing",
    tags: "EDTECH / FULL-STACK / REBRAND",
    primaryColor: "#FF435A",
    secondaryColor: "#111111",
    heroImage: assets.images.tutormingBg,
    mainImage: assets.images.tutorming01,
    detailImages: [assets.images.tutorming02, assets.images.tutorming03, assets.images.tutorming04],
    heroHeadingImage: assets.images.tutormingHero,
    size: "xs",
    description: "A learning platform refresh balancing brand confidence, lesson discovery, and international learner needs.",
    quote: "Education software should make progress feel visible.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
  {
    id: 8,
    binaryId: "00001000",
    heading: "互動式網頁體驗",
    date: "2017",
    brand: "NOEIN",
    tags: "AWWWARDS / PORTFOLIO / MOTION",
    primaryColor: "#28F1C3",
    secondaryColor: "#161B1A",
    heroImage: assets.images.noeinBg,
    mainImage: assets.images.noein01,
    detailImages: [assets.images.noein02, assets.images.noein03, assets.images.noein04],
    heroHeadingImage: assets.images.noeinHero,
    size: "xs",
    description: "An interactive web experience built around motion, visual identity, and portfolio storytelling.",
    quote: "The interface can be the memory.",
    sections: [
      { title: "Signal", body: projectCopy.product },
      { title: "System", body: projectCopy.system },
      { title: "Craft", body: projectCopy.craft },
    ],
  },
];
