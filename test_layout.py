from playwright.sync_api import sync_playwright
import time

def take_screenshot(url, output_path, viewport=None):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        if viewport:
            context.set_viewport_size(viewport)
        page = context.new_page()
        page.goto(url)
        page.wait_for_load_state('networkidle')
        time.sleep(2)
        page.screenshot(path=output_path, full_page=True)
        browser.close()
        print(f"Screenshot saved to {output_path}")

if __name__ == '__main__':
    # Desktop screenshot
    take_screenshot('http://localhost:3000', 'hero_desktop.png', {'width': 1280, 'height': 800})
    # Mobile screenshot
    take_screenshot('http://localhost:3000', 'hero_mobile.png', {'width': 375, 'height': 667})