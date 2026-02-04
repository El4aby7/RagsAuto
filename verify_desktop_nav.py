from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Desktop viewport
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        page.goto("http://localhost:8081/index.html")
        page.wait_for_selector("header")

        # Verify Mobile Menu Button is HIDDEN
        menu_btn = page.locator("header button:has(.material-symbols-outlined:text-is('menu'))")
        if menu_btn.is_visible():
            print("Error: Mobile menu button is visible on desktop!")
            exit(1)
        else:
            print("Mobile menu button is hidden on desktop.")

        # Verify Desktop Nav Links are visible
        if page.get_by_text("Inventory").first.is_visible():
            print("Desktop nav visible.")
        else:
            print("Desktop nav not visible!")
            exit(1)

        browser.close()

if __name__ == "__main__":
    run()
