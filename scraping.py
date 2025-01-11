from bs4 import BeautifulSoup
from selenium import webdriver
import json

driver = webdriver.Chrome()
url = 'https://www.volunteermatch.org/search/?v=true&onloc=false'
driver.get(url)
driver.implicitly_wait(10)

soup = BeautifulSoup(driver.page_source, 'html.parser')

driver.quit()

data = []
events = soup.find_all("li", class_="pub-srp-opps__opp pub-srp-opps__opp--ao")

for event in events:
    eventName = event.find("span").get_text(strip=True)
    description = event.find("p", class_="pub-srp-opps__desc").get_text(strip=True)
    link = event.find("a", href=True)["href"]
    fullLink = "https://www.volunteermatch.org" + link
    datePosted = event.find("div", class_="pub-srp-opps__posted pub-srp-opps__sml-txt").get_text(strip=True)

    data.append({
        "eventName": eventName,
        "description": description,
        "fullLink": fullLink,
        "datePosted": datePosted
    })

output_file = "volunteer_data.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Data saved to {output_file}")

                             

