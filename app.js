import { gdelt } from "./sections/gdelt.js"
import { rss } from "./sections/rss.js"
import { acled } from "./sections/acled.js"
import { relief } from "./sections/reliefweb.js"
import { wiki } from "./sections/wikidata.js"

window.loadAll = async () => {
  const c = document.getElementById("country").value
  const out = document.getElementById("out")
  out.innerHTML = "Loading intelligence..."

  const data = await Promise.all([
    gdelt(c),
    rss(c),
    acled(c),
    relief(c),
    wiki(c)
  ])

  out.innerHTML = data.join("")
}
