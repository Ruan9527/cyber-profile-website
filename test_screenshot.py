from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    time.sleep(2)  # extra time for animations
    # Take full page screenshot
    page.screenshot(path='hero_screenshot.png', full_page=True)
    print("Screenshot saved as hero_screenshot.png")
    browser.close()