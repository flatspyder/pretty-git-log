import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_ui(page: Page):
    """
    This script verifies the new UI of the Git Pretty Format application.
    """
    # 1. Navigate to the app on the correct preview server URL.
    page.goto("http://localhost:4173/pretty-git-log/")

    # Take a screenshot for debugging FIRST.
    page.screenshot(path="jules-scratch/verification/debug_final.png")

    # 2. Check for main layout elements.
    header = page.get_by_role("banner")
    expect(header).to_be_visible()
    expect(header.get_by_role("heading", name="Git Pretty Format")).to_be_visible()

    token_palette = page.get_by_role("heading", name="Tokens Palette")
    current_format = page.get_by_role("heading", name="Current Format")
    expect(token_palette).to_be_visible()
    expect(current_format).to_be_visible()

    # 3. Test Theme Switcher.
    html_element = page.locator("html")
    theme_switcher_button = page.get_by_label("Toggle theme")

    theme_switcher_button.click()
    expect(html_element).to_have_class(re.compile(r"dark"))
    page.screenshot(path="jules-scratch/verification/dark_mode.png")

    theme_switcher_button.click()
    expect(html_element).not_to_have_class(re.compile(r"dark"))

    # 4. Test Drag and Drop.
    source_chip = page.get_by_role("button", name="Hash")
    expect(source_chip).to_be_visible()

    dropzone = page.locator(".rounded-xl.border-dashed")
    expect(dropzone).to_be_visible()

    source_chip.drag_to(dropzone)

    dropped_chip = dropzone.get_by_role("button", name="Hash: full")
    expect(dropped_chip).to_be_visible()

    # 5. Take final screenshot.
    page.screenshot(path="jules-scratch/verification/final_view.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_ui(page)
        browser.close()

if __name__ == "__main__":
    main()
