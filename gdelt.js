export async function gdelt(country){
  const url =
    "https://api.gdeltproject.org/api/v2/doc/doc?query=" +
    country + "&mode=artlist&format=json"

  const r = await fetch(url)
  const d = await r.json()

  return section(
    "🔥 GDELT – Global Events",
    d.articles.slice(0,5).map(a => a.title)
  )
}

function section(title, items){
  return `
    <h2>${title}</h2>
    ${items.map(i=>`<div class="card">${i}</div>`).join("")}
  `
}
