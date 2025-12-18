export async function wiki(country){
  return `
    <h2>📚 Country Background</h2>
    <div class="card">
      Key facts, leaders, population, regions of ${country}
    </div>
  `
}
