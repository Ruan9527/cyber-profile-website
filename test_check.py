import sys
from playwright.sync_api import sync_playwright

def test_hero():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')
        # Check if hero section exists
        hero = page.locator('#home')
        if hero.count() == 0:
            print("ERROR: Hero section not found")
            sys.exit(1)
        else:
            print("Hero section found")
        # Check avatar
        avatar = page.locator('img[alt*="圆周率的达"]')
        if avatar.count() == 0:
            print("WARNING: Avatar image not found")
        else:
            print("Avatar found")
        # Check name
        name = page.locator('h1')
        if name.count() == 0:
            print("WARNING: Name heading not found")
        else:
            print(f"Name heading text: {name.first.text_content()[:20]}")
        # Check buttons
        buttons = page.locator('.cyber-button')
        print(f"Found {buttons.count()} cyber buttons")
        browser.close()
        print("Test passed")

if __name__ == '__main__':
    try:
        test_hero()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)