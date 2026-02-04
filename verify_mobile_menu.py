from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        try:
            page.goto("http://localhost:8081/index.html")
            page.wait_for_selector("header", timeout=10000)
            print("Header found.")

            # Verify Menu Button
            # Selector for the button that toggles menu
            menu_btn = page.locator("header button").filter(has=page.locator("span.material-symbols-outlined", has_text="menu"))

            if not menu_btn.is_visible():
                print("Menu button not visible!")
                page.screenshot(path="verification/mobile_menu_btn_fail.png")
                exit(1)

            print("Menu button visible. Clicking...")
            menu_btn.click()
            time.sleep(1)

            # Verify Menu Overlay
            # MobileMenu renders: div className="fixed inset-0 z-40..."
            mobile_menu = page.locator("div.fixed.inset-0.z-40")
            if mobile_menu.is_visible():
                print("Mobile menu opened.")
                page.screenshot(path="verification/7_mobile_menu_success.png")
            else:
                print("Mobile menu not visible.")
                page.screenshot(path="verification/7_mobile_menu_overlay_fail.png")
                exit(1)

            # Verify Link Navigation (e.g. Services)
            # The menu has buttons with text "Services"
            # It might be in English or Arabic, default EN
            services_link = mobile_menu.get_by_text("Services")
            if not services_link.is_visible():
                print("Services link not found in menu")
                exit(1)

            services_link.click()
            time.sleep(1)

            # Verify we are on Services page
            # Look for "Concierge Care"
            if page.get_by_text("Concierge Care").is_visible():
                print("Navigation to Services success.")
                page.screenshot(path="verification/8_mobile_nav_success.png")
            else:
                print("Navigation failed.")
                page.screenshot(path="verification/8_mobile_nav_fail.png")
                exit(1)

        except Exception as e:
            print(f"Error: {e}")

        browser.close()

if __name__ == "__main__":
    run()
