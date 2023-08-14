// Update/set up the header HTML
export function updateHeader(currency = 1000, research = 10, currentEmissions = 130, emissionsCap = 150) {
    // update values
    document.getElementById("header-content").innerHTML = `
      <img id="header-coins" src="/icons/coins-solid.svg" alt="Currency" title="Currency"></img>
      <div class="header-label" title="Currency"> ${currency} </div>

      <img id="header-research" src="/icons/flask-solid.svg" alt="Research" title="Research points"></img>
      <div class="header-label" title="Research points"> ${research} </div>

      <div id="emissions" title="Emissions">
        <img id="header-emissions" src="/icons/smog-solid.svg" alt="Emissions"></img>
        <div class="header-label"> ${currentEmissions} / ${emissionsCap} </div>
      </div>
    `
}
