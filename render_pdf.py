import asyncio
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright
from reportlab.pdfgen import canvas as pdf_canvas

HTML_FILE = "presentacion-hackaton.html"
PDF_FILE = "presentacion-justuc.pdf"
W, H = 1920, 1080  # Horizontal / landscape

async def render():
    html_path = Path(HTML_FILE).resolve()
    if not html_path.exists():
        print(f"ERROR: No se encuentra {HTML_FILE}")
        sys.exit(1)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": W, "height": H},
            device_scale_factor=2,
        )
        page = await context.new_page()
        await page.goto(f"file:///{html_path}", wait_until="networkidle")
        await page.wait_for_timeout(2000)  # Esperar a que carguen fonts + GSAP

        # Obtener cantidad de slides
        total_slides = await page.evaluate("document.querySelectorAll('.slide-container').length")
        print(f"Slides detectados: {total_slides}")

        pngs = []
        for i in range(total_slides):
            print(f"Renderizando slide {i+1}/{total_slides}...")

            # Ir al slide con la funcion goTo del HTML
            await page.evaluate(f"goTo({i})")
            await page.wait_for_timeout(800)  # Esperar animaciones GSAP

            # Tomar screenshot
            path = f"_slide_{i:02d}.png"
            await page.screenshot(path=path, full_page=False)
            pngs.append(path)
            print(f"  [OK] Slide {i+1} capturado")

        await browser.close()

        # Generar PDF con reportlab
        print(f"\nGenerando PDF: {PDF_FILE}")
        c = pdf_canvas.Canvas(PDF_FILE, pagesize=(W, H))
        for i, png in enumerate(pngs):
            c.drawImage(png, 0, 0, width=W, height=H)
            if i < len(pngs) - 1:
                c.showPage()
        c.save()
        print(f"[OK] PDF generado: {PDF_FILE} ({len(pngs)} paginas)")

        # Limpiar PNGs temporales
        for png in pngs:
            os.remove(png)
        print("[OK] PNGs temporales eliminados")

asyncio.run(render())
