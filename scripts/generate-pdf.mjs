import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, "..", "docs");
const htmlFile = path.join(docsDir, "presentacion-hackaton.html");
const outputPdf = path.join(docsDir, "presentacion-miproceso.pdf");

async function main() {
  if (!fs.existsSync(htmlFile)) {
    console.error("HTML not found:", htmlFile);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  await page.goto("file:///" + htmlFile.replace(/\\/g, "/"), {
    waitUntil: "networkidle",
  });

  // Let animations fully render
  await page.waitForTimeout(500);

  const totalSlides = await page.evaluate(() => {
    return document.querySelectorAll(".slide-container").length;
  });
  console.log(`Found ${totalSlides} slides`);

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < totalSlides; i++) {
    // Navigate to slide i
    await page.evaluate((n) => {
      // Directly activate slide without going through goTo (which uses GSAP)
      const slides = document.querySelectorAll(".slide-container");
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === n);
        s.style.opacity = idx === n ? "1" : "0";
        s.style.pointerEvents = idx === n ? "all" : "none";
      });
      // Trigger animations
      const anims = slides[n].querySelectorAll(".animate-in");
      anims.forEach((a) => {
        a.style.opacity = "1";
        a.style.transform = "none";
      });
    }, i);

    await page.waitForTimeout(400);

    // Capture the full viewport as PNG (slide fills the viewport)
    const screenshot = await page.screenshot({
      type: "png",
    });

    // Embed the screenshot into an A4 PDF page, preserving 16:9 aspect ratio
    const pngImage = await pdfDoc.embedPng(screenshot);
    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points

    // 16:9 image inside A4 → width is limiting, center vertically
    const imgWidth = pageWidth;
    const imgHeight = (imgWidth * 720) / 1280; // maintain 16:9
    const yOffset = (pageHeight - imgHeight) / 2;

    const newPage = pdfDoc.addPage([pageWidth, pageHeight]);
    newPage.drawImage(pngImage, {
      x: 0,
      y: yOffset,
      width: imgWidth,
      height: imgHeight,
    });

    console.log(`  Slide ${i + 1}/${totalSlides} captured`);
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdf, pdfBytes);

  await browser.close();

  const stats = fs.statSync(outputPdf);
  console.log("PDF generated:", outputPdf, `(${(stats.size / 1024).toFixed(0)} KB, ${totalSlides} pages)`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
