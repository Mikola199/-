import time
import subprocess
from playwright.sync_api import sync_playwright

def main():
    # Start preview server
    server = subprocess.Popen(["npx", "vite", "preview", "--port", "3000"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(3)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 430, "height": 932}) # iPhone 15 Pro Max dimensions

            # Go to home page
            page.goto("http://localhost:3000")
            page.wait_for_timeout(2000)

            # Screenshot 1: Classifieds view
            page.screenshot(path="/home/jules/verification/avitok_listings.png")

            # Click on 'Лента' tab (TikTok feed)
            page.click("text=Лента")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/avitok_feed.png")

            # Click on 'Сообщения' tab
            page.click("text=Сообщения")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/avitok_chats.png")

            # Click on 'Объявления' tab and click first item
            page.click("text=Объявления")
            page.wait_for_timeout(500)
            page.click("text=iPhone 15 Pro Max")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/avitok_preview.png")

            browser.close()
            print("Successfully captured screenshots!")
    finally:
        server.terminate()

if __name__ == "__main__":
    main()
