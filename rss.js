export async function rss(country){
  const feeds = {
    India: "https://www.thehindu.com/news/national/feeder/default.rss",
    USA: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  }

  const r = await fetch(
    "https://api.allorigins.win/raw?url=" +
    encodeURIComponent(feeds[country])
  )
  const t = await r.text()
  const xml = new DOMParser().parseFromString(t,"text/xml")

  const items = [...xml.querySelectorAll("item")].slice(0,5)

  return `
    <h2>📰 Full Articles</h2>
    ${items.map(i=>`
      <div class="card">
        <b>${i.querySelector("title").textContent}</b>
        <div>${i.querySelector("description").textContent}</div>
      </div>
    `).join("")}
  `
}
