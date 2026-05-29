# Harry Design Studio Portfolio Landing Spec

This document is the local source of truth for the portfolio landing page. Keep future visual, interaction, and content adjustments here before changing component code.

## Product Goal

Build a highly faithful interactive portfolio landing page inspired by https://noeinoi.com/ for "Harry Design Studio / HARRY DESI".

Page title:

`Harry Design Studio | 哈利設計事務所 | 產品設計 · 前端開發 · 設計系統`

## Stack

- Vite SPA with React, TypeScript, Tailwind CSS.
- Framer Motion for React layout transitions and overlay presence.
- GSAP for loader timing, click fireworks, and compact timeline effects.
- Web Audio API for interaction sound.
- Canvas rendering for pixel logo, nav text, icon glyphs, and pixelated project imagery.

## Visual System

- Overall: monochrome pixel-art brutalist portfolio, white/light by default, black heavy outlines, huge bold CJK project titles, retro 8-bit feedback.
- Light mode: page background `#FFFFFF`, foreground `#111111`, theme surface `#111111`, on-theme surface `#FFFFFF`.
- Dark mode: page background `#111111`, foreground `#FFFFFF`, theme surface `#FFFFFF`, on-theme surface `#111111`.
- Rainbow token: `linear-gradient(120deg, #ff124f, #ff7a00, #ffe600, #19ffb6, #00c3ff, #8a2bff, #ff00f0, #ff124f)`.
- Cards and buttons use square corners only.
- Pixel fonts are loaded from local copies of:
  - `https://noeinoi.com/assets/Pixel-Cz0HeQ7W.ttf`
  - `https://noeinoi.com/assets/PublicPixel-CiF2aheh.ttf`

## Layout

- Structure: `Header`, `PortfolioGrid`, `Footer`, `ClickFireworks`, `PageLoader`, `ProjectDetailOverlay`.
- Header is fixed with z-index `1100`, desktop padding `50px`, visual height around `145px`, and max inner width `1580px`.
- Desktop nav items: `WORK`, `ARTICLES`, `ABOUT`; active item shows five marquee pixels with opacity `0.2` through `1`.
- Header controls are `40px` square with `4px` border, pixel icons, and upward hover feedback.
- Mobile under `1000px`: hide desktop nav, show `[ MENU ]`, open a fullscreen black overlay with white pixel text.
- Main `.home` starts below the fixed header, max width `1600px`, desktop padding `50px 50px 100px`, mobile padding `0 20px 100px`.
- Portfolio grid: six columns desktop, `50px` gap, one column under `768px`.
- Card sizes: hero spans 6 columns at `600px`; medium spans 3 columns at `500px`; xs spans 2 columns at `240px`. Under `1100px`, xs spans 3 columns and the last xs card spans 6.

## Interactions

- Dormant cards look like black-and-white printed pixel posters: white/light background, thick outline, hidden image layer, binary ID/date/tags, huge title.
- On hover/touch preload, the active card outline changes to the project primary color, its image fades in at opacity around `0.5`, a secondary-color mask appears around `0.6`, and other cards dim to `0.2` with `25-30ms` stagger.
- `PixelationImg` draws images into canvas, starts at pixel size `80`, and animates toward `1` over `500ms` with cubic-bezier `(0.215, 0.61, 0.355, 1)`.
- Card click opens a fullscreen detail overlay; ESC and close button return to the grid.
- Loader has a minimum display time of `1000ms` and closes with a bottom-origin mask.
- Global clicks spawn 20-30 square rainbow particles.
- Sound uses local storage key `portfolio-sound-enabled`, defaults to enabled unless the value is `"false"`, and resumes audio after first user interaction.

## Language

- Supported language codes: `zh-Hant`, `en`, `ja`.
- Default is `zh-Hant`.
- Language changes update `document.lang`, nav labels, generic UI text, and any project text with translations.
- Project headings without translations keep the `zh-Hant` fallback to prevent layout churn.

## Project Content

Use exactly the eight project cards in `src/data/projects.ts`:

1. NOWnews, `沉浸式 / AI 互動新聞`, private, 2025 - PRESENT.
2. awwrated, `串流影劇指南`, 2019 - PRESENT.
3. Shopmatic, `設計系統建置`, 2019 - 2020.
4. Shopmatic, `品牌電商 / 專屬 APP`, 2020 - 2021.
5. Shopmatic, `結帳流程優化`, 2018 - 2019.
6. KKday, `旅行怪獸 / APP 孵化`, 2016 - 2017.
7. TutorMing, `國際中文學習平台`, 2015 - 2017.
8. NOEIN, `互動式網頁體驗`, 2017.

## Accessibility And Performance

- Every interactive control uses a native button or anchor with an `aria-label`.
- Enter/Space activates controls through native semantics; ESC closes overlays.
- Respect `prefers-reduced-motion`: remove stagger delays, shorten transitions, and avoid complex pixelation loops.
- Canvas rendering pauses when offscreen.
- No horizontal body scroll.
- Text must stay inside containers on desktop, tablet, and mobile.

## Local Assets

- All remote prompt assets are downloaded by `scripts/download-assets.mjs`.
- Local files live under `public/assets/portfolio/`.
- Components must reference local asset paths from `src/data/assetManifest.ts`.
