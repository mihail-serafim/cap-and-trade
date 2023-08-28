var descriptions = {
    mineralRights: "Mineral rights are the claims to ownership of the natural resources located in a plot of land.",
    mine: "This type of minining involves digging tunnels underground to reach mineral deposits deep below the surface.",
    quarry: "Quarries, also called open-pit mines, are a method of mining where materials are extracted directly from the\
             surface to create a pit. They can reveal larger deposits of precious metals which reach deep below the surface.",
    heavyMachinery: "More heavy machinery like bulldozers and trucks allow for increased quarry efficiency.",
    improvedVentilation: "One of the most vital components of deep underground mines, stronger ventilation systems mean that underground mines can reach deeper into the earth.",
    refinery: "Purifies precious metals by separating them from other metals and residues, increasing the yield of your firm.",
    researchFunding: "Investors have given the green light to hire researchers and set up facilities in order to improve our firm's R&D capabilities.",
    geologyLab: "Geological knowledge is critical to mining operations, as it relates to the discovery of ore deposits, and how to safely extract them from the earth.",
    chemistryLab: "Chemistry plays a vital role in modern-day mining, and is needed for the extraction, processing, and refining of raw ore using various chemical compounds.",
    researchFacility: "A larger and better-equipped facility can house multiple labs of different types, and provides a research hub for your firm.",
};

// TODO: Update to match theming. Add more fields as needed
// Defines starting nodes and connections
export var baseNodes = [
    //Type 0 is Gold, type 1 is silver, type 2 is research
    { id: "g-1", type: 0, label: "Gold Site Mineral Rights", cost: 100, yield: 1, emissions: 30, locked: false, enabled: true, description: descriptions.mineralRights },
    { id: "g-2"   , type: 0, label: "Gold Quarry", cost: 100, yield: 2, emissions: 30, locked: true, enabled: true, description: descriptions.quarry },
    { id: "g-3"   , type: 0, label: "Gold Mine",  cost: 200, yield: 5, emissions: 30, locked: true, enabled: true, description: descriptions.mine },
    { id: "g-4"   , type: 0, label: "Heavy Machinery", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.heavyMachinery },
    { id: "g-5"   , type: 1, label: "Improved Ventilation", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.improvedVentilation },
    { id: "g-6", type: 1, label: "Gold Refinery", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.refinery },
    { id: "g-1", type: 0, label: "Gold Site Mineral Rights", cost: 100, yield: 1, emissions: 30, locked: false, enabled: true, description: descriptions.mineralRights },
    { id: "g-2"   , type: 0, label: "Gold Quarry", cost: 100, yield: 2, emissions: 30, locked: true, enabled: true, description: descriptions.quarry },
    { id: "g-3"   , type: 0, label: "Gold Mine",  cost: 200, yield: 5, emissions: 30, locked: true, enabled: true, description: descriptions.mine },
    { id: "g-4"   , type: 0, label: "Heavy Machinery", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.heavyMachinery },
    { id: "g-5"   , type: 1, label: "Improved Ventilation", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.improvedVentilation },
    { id: "g-6", type: 1, label: "Gold Refinery", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.refinery },
    { id: "r-1"   , type: 2, label: "Research Funding", cost: 200, yield: 1, emissions: 0, locked: false, enabled: true, description: descriptions.researchFunding },
    { id: "r-2"   , type: 2, label: "Geology Lab", cost: 200, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.geologyLab },
    { id: "r-3"  , type: 2, label: "Chemistry Lab", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.chemistryLab },
    { id: "r-4"  , type: 2, label: "Research Facility", cost: 100, yield: 1, emissions: 30, locked: true, enabled: true, description: descriptions.researchFacility }
]
  
export var baseLinks = [
    { target: "mammal", source: "dog" , strength: 0.1 },
    { target: "mammal", source: "fox" , strength: 0.1 },
    { target: "mammal", source: "elk" , strength: 0.2 },
    { target: "insect", source: "bee" , strength: 0.05 },
    { target: "fish"  , source: "pike", strength: 0.1 },
    { target: "dog"  , source: "pike", strength: 0.1 },
    { target: "cat"   , source: "elk" , strength: 0.1 },
    { target: "elk"   , source: "bee" , strength: 0.1 },
    { target: "fox"   , source: "ant" , strength: 0.1 },
    { target: "pike"  , source: "cat" , strength: 0.1 }
]

