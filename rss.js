export async function rss(country) {

  const feeds = {
    India: "https://www.thehindu.com/news/national/feeder/default.rss",
    USA: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  }

  const url = feeds[country]
  const proxy = "https://api.allorigins.win/raw?url="

  const res = await fetch(proxy + encodeURIComponent(url))
  const text = await res.text()

  const xml = new DOMParser().parseFromString(text, "text/xml")
  const items = [...xml.querySelectorAll("item")].slice(0, 10)

  return `
    <h2>📰 ${country} – Full Articles</h2>
    ${items.map(item => {
      const title = item.querySelector("title")?.textContent || "No title"
      const content =
        item.querySelector("content\\:encoded")?.textContent ||
        item.querySelector("description")?.textContent ||
        "Open full article"

      return `
        <div class="card">
          <h3>${title}</h3>
          <p>${content}</p>
        </div>
      `
    }).join("")}
  `
}
