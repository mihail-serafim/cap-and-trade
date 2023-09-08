function roundTo2Decimals(num) {
  return Math.round(parseFloat(num) * 100) / 100
}

// Update/set up the header HTML
export function updateHeader(currency, research, currentEmissions, emissionsCap) {
    // update values
    document.getElementById("header-content").innerHTML = `
      <img id="header-coins" src="/icons/coins-solid.svg" alt="Currency" title="Currency"></img>
      <div class="header-label" title="Currency"> ${roundTo2Decimals(currency)} </div>

      <img id="header-research" src="/icons/flask-solid.svg" alt="Research" title="Research points"></img>
      <div class="header-label" title="Research points"> ${roundTo2Decimals(research)} </div>

      <div id="emissions" title="Emissions">
        <img id="header-emissions" src="/icons/smog-solid.svg" alt="Emissions"></img>
        <div class="header-label"> ${roundTo2Decimals(currentEmissions)} / ${roundTo2Decimals(emissionsCap)} </div>
      </div>
    `
}
