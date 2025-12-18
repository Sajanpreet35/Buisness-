import { gdelt } from "./sections/gdelt.js"
import { rss } from "./sections/rss.js"
import { acled } from "./sections/acled.js"
import { relief } from "./sections/reliefweb.js"
import { wiki } from "./sections/wikidata.js"

window.loadAll = async () => {
  const c = document.getElementById("country").value
  const out = document.getElementById("out")

  out.innerHTML = "<p>Loading global intelligence...</p>"

  try {
    const blocks = await Promise.all([
      gdelt(c),
      rss(c),
      acled(c),
      relief(c),
      wiki(c)
    ])

    out.innerHTML = blocks.join("")
  } catch (e) {
    out.innerHTML = `
      <div style="color:red">
        ❌ Error loading data<br/>
        ${e.message}
      </div>
    `
    console.error(e)
  }
}
