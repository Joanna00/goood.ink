import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "assets", "portfolio");

const assets = [
  ["https://noeinoi.com/assets/Pixel-Cz0HeQ7W.ttf", "fonts/pixel.ttf"],
  ["https://noeinoi.com/assets/PublicPixel-CiF2aheh.ttf", "fonts/public-pixel.ttf"],
  [
    "https://noeinoi.com/assets/Coin%20Collect%20Retro%208-bit%20Sound%20Effect-DxLOsTlk.mp3",
    "audio/coin-collect-retro-8-bit.mp3",
  ],
  ["https://noeinoi.com/assets/demo-nownews-bg-mJf_govZ.jpg", "images/demo-nownews-bg.jpg"],
  ["https://noeinoi.com/assets/demo-nownews-01-CVFVb7qx.jpg", "images/demo-nownews-01.jpg"],
  ["https://noeinoi.com/assets/demo-nownews-02-Dy8PMN1R.jpg", "images/demo-nownews-02.jpg"],
  ["https://noeinoi.com/assets/demo-nownews-03-BVnR0ftY.jpg", "images/demo-nownews-03.jpg"],
  ["https://noeinoi.com/assets/demo-nownews-04-Dqm7-L3D.jpg", "images/demo-nownews-04.jpg"],
  ["https://noeinoi.com/assets/demo-nownews-hero-img-CJJisQ3M.png", "images/demo-nownews-hero-img.png"],
  ["https://noeinoi.com/assets/project-demo-BWpcXRtr.jpg", "images/project-awwrated-bg.jpg"],
  [
    "https://noeinoi.com/assets/project-awwrated-heading-img-BCi3sH4A.png",
    "images/project-awwrated-heading-img.png",
  ],
  ["https://noeinoi.com/assets/demo-shopmaticds-bg-dzaDlts9.jpg", "images/demo-shopmaticds-bg.jpg"],
  ["https://noeinoi.com/assets/demo-shopmaticds-01-Dx1J-6sJ.jpg", "images/demo-shopmaticds-01.jpg"],
  ["https://noeinoi.com/assets/demo-shopmaticds-02-BqI2axfw.jpg", "images/demo-shopmaticds-02.jpg"],
  ["https://noeinoi.com/assets/demo-shopmaticds-03-1_u-q1K3.jpg", "images/demo-shopmaticds-03.jpg"],
  ["https://noeinoi.com/assets/demo-shopmaticds-04-0cZNwd7p.jpg", "images/demo-shopmaticds-04.jpg"],
  [
    "https://noeinoi.com/assets/demo-shopmaticds-hero-img-hIZUUK56.png",
    "images/demo-shopmaticds-hero-img.png",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-bg-BeZdPx4z.jpg",
    "images/demo-shopmaticbuyerapp-bg.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-01-PjIvdT3f.jpg",
    "images/demo-shopmaticbuyerapp-01.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-02-DdS2JJGn.jpg",
    "images/demo-shopmaticbuyerapp-02.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-03-pVSKI5iM.jpg",
    "images/demo-shopmaticbuyerapp-03.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-04-BkA08RkT.jpg",
    "images/demo-shopmaticbuyerapp-04.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticbuyerapp-hero-img-CsuHweIY.png",
    "images/demo-shopmaticbuyerapp-hero-img.png",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticcheckout-bg-DDtWU0Ly.jpg",
    "images/demo-shopmaticcheckout-bg.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticcheckout-01-BEEe3ON1.jpg",
    "images/demo-shopmaticcheckout-01.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticcheckout-02-C_iVENoV.jpg",
    "images/demo-shopmaticcheckout-02.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticcheckout-03-CkrGxblz.jpg",
    "images/demo-shopmaticcheckout-03.jpg",
  ],
  [
    "https://noeinoi.com/assets/demo-shopmaticcheckout-hero-img-B_CYNWzu.png",
    "images/demo-shopmaticcheckout-hero-img.png",
  ],
  ["https://noeinoi.com/assets/demo-kkday-bg-CR_jR18V.jpg", "images/demo-kkday-bg.jpg"],
  ["https://noeinoi.com/assets/demo-kkday-01-BerJ01UA.jpg", "images/demo-kkday-01.jpg"],
  ["https://noeinoi.com/assets/demo-kkday-02-D0I2eZtr.jpg", "images/demo-kkday-02.jpg"],
  ["https://noeinoi.com/assets/demo-kkday-03-bAXbwhqA.jpg", "images/demo-kkday-03.jpg"],
  ["https://noeinoi.com/assets/demo-kkday-04-BMTZPnf9.jpg", "images/demo-kkday-04.jpg"],
  ["https://noeinoi.com/assets/demo-kkday-hero-img-BWwa7vWC.png", "images/demo-kkday-hero-img.png"],
  ["https://noeinoi.com/assets/demo-tutorming-bg-INUBiPV2.jpg", "images/demo-tutorming-bg.jpg"],
  ["https://noeinoi.com/assets/demo-tutorming-01-BpKw9W82.jpg", "images/demo-tutorming-01.jpg"],
  ["https://noeinoi.com/assets/demo-tutorming-02-1SJlYL1O.jpg", "images/demo-tutorming-02.jpg"],
  ["https://noeinoi.com/assets/demo-tutorming-03-DbLukuCG.jpg", "images/demo-tutorming-03.jpg"],
  ["https://noeinoi.com/assets/demo-tutorming-04-BkRToksx.jpg", "images/demo-tutorming-04.jpg"],
  [
    "https://noeinoi.com/assets/demo-tutorming-hero-img-B_QYpGEW.png",
    "images/demo-tutorming-hero-img.png",
  ],
  ["https://noeinoi.com/assets/demo-noein-bg-BvyfFILQ.jpg", "images/demo-noein-bg.jpg"],
  ["https://noeinoi.com/assets/demo-noein-01-BTmPK3wT.jpg", "images/demo-noein-01.jpg"],
  ["https://noeinoi.com/assets/demo-noein-02-CH48aIjh.jpg", "images/demo-noein-02.jpg"],
  ["https://noeinoi.com/assets/demo-noein-03-ukv5ee_o.jpg", "images/demo-noein-03.jpg"],
  ["https://noeinoi.com/assets/demo-noein-04-Dmouhiix.jpg", "images/demo-noein-04.jpg"],
  ["https://noeinoi.com/assets/demo-noein-hero-img-dUNzJCpH.png", "images/demo-noein-hero-img.png"],
];

function fetchFile(url, destination) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;
    client
      .get(url, (response) => {
        if ([301, 302, 303, 307, 308].includes(response.statusCode ?? 0) && response.headers.location) {
          response.resume();
          fetchFile(new URL(response.headers.location, url).toString(), destination).then(resolve, reject);
          return;
        }

        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`Failed ${response.statusCode} ${url}`));
          return;
        }

        fs.mkdirSync(path.dirname(destination), { recursive: true });
        const file = fs.createWriteStream(destination);
        response.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

for (const [url, relativePath] of assets) {
  const destination = path.join(outDir, relativePath);
  if (fs.existsSync(destination) && fs.statSync(destination).size > 0) {
    console.log(`skip ${relativePath}`);
    continue;
  }

  console.log(`download ${relativePath}`);
  await fetchFile(url, destination);
}

console.log(`Downloaded ${assets.length} portfolio assets.`);
