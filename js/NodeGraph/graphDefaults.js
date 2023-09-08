var descriptions = {
    mineralRights:       "Mineral rights are the claims to ownership of the natural resources located in a plot of land.",
    mine:                "This type of minining involves digging tunnels underground to reach mineral deposits deep below the surface.",
    quarry:              "Quarries, also called open-pit mines, are a method of mining where materials are extracted directly from the\
                            surface to create a pit.",
    heavyMachinery:      "More heavy machinery like bulldozers and trucks allow for increased quarry efficiency.",
    improvedVentilation: "One of the most vital components of deep underground mines, stronger ventilation systems mean that underground mines can reach deeper into the earth.",
    betterDrills:        "Newer, more efficient drills allow for deeper and larger mineshafts to be dug, increasing the yield of your mine.",
    strongerExplosives:  "The most common way to excavate quarries is through blasting. Stronger explosives will allow your firm to expand the quarry faster.",
    refinery:            "Purifies precious metals by separating them from other metals and residues, increasing the yield of your firm.",
    researchFunding:     "Investors have given the green light to hire researchers and set up facilities in order to improve your research and development capabilities.",
    geologyLab:          "Geological knowledge is critical to mining operations, as it relates to the discovery of ore deposits, and how to safely extract them from the earth.",
    chemistryLab:        "Chemistry plays a vital role in modern-day mining, and is needed for the extraction, processing, and refining of raw ore using various chemical compounds.",
    researchFacility:    "A larger and better-equipped facility can house multiple labs of different types, and provides a research hub for your firm.",
};

// Defines starting nodes and connections
export var baseNodes = [
    //Type 0 is Gold, type 1 is silver, type 2 is research
    { id: "g-1"   , type: 0, label: "Gold Mineral Rights"   , cost: 100, yield: 1, emissions: 5 , locked: false, enabled: true , description: descriptions.mineralRights      , },
    { id: "g-2"   , type: 0, label: "Gold Quarry"           , cost: 100, yield: 2, emissions: 30, locked: true , enabled: true , description: descriptions.quarry             , },
    { id: "g-3"   , type: 0, label: "Gold Mine"             , cost: 200, yield: 5, emissions: 30, locked: true , enabled: true , description: descriptions.mine               , },
    { id: "g-4"   , type: 0, label: "Heavy Machinery"       , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.heavyMachinery     , },
    { id: "g-5"   , type: 0, label: "Improved Ventilation"  , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.improvedVentilation, },
    { id: "g-6"   , type: 0, label: "Gold Refinery"         , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.refinery           , },
    { id: "s-1"   , type: 1, label: "Silver Mineral Rights" , cost: 100, yield: 1, emissions: 5 , locked: false, enabled: true , description: descriptions.mineralRights      , },
    { id: "s-2"   , type: 1, label: "Silver Quarry"         , cost: 100, yield: 2, emissions: 30, locked: true , enabled: true , description: descriptions.quarry             , },
    { id: "s-3"   , type: 1, label: "Silver Mine"           , cost: 200, yield: 5, emissions: 30, locked: true , enabled: true , description: descriptions.mine               , },
    { id: "s-4"   , type: 1, label: "Stronger Explosives"   , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.heavyMachinery     , },
    { id: "s-5"   , type: 1, label: "Better Drills"         , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.betterDrills       , },
    { id: "s-6"   , type: 1, label: "Silver Refinery"       , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.refinery           , },
    { id: "r-1"   , type: 2, label: "Research Funding"      , cost: 200, yield: 1, emissions: 5 , locked: false, enabled: true , description: descriptions.researchFunding    , },
    { id: "r-2"   , type: 2, label: "Geology Lab"           , cost: 200, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.geologyLab         , },
    { id: "r-3"   , type: 2, label: "Chemistry Lab"         , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.chemistryLab       , },
    { id: "r-4"   , type: 2, label: "Research Facility"     , cost: 100, yield: 1, emissions: 30, locked: true , enabled: true , description: descriptions.researchFacility   , }
]
  
export var baseLinks = [
    { target: "g-1", source: "s-1" , strength: 1 },
    { target: "g-1", source: "r-1" , strength: 1 },
    { target: "s-1", source: "r-1" , strength: 1 },
    { target: "g-1", source: "g-2" , strength: 1 },
    { target: "g-1", source: "g-3" , strength: 1 },
    { target: "g-2", source: "g-4" , strength: 1 },
    { target: "g-3", source: "g-5" , strength: 1 },
    { target: "g-4", source: "g-6" , strength: 1 },
    { target: "g-5", source: "g-6" , strength: 1 },
    { target: "s-1", source: "s-2" , strength: 1 },
    { target: "s-2", source: "s-4" , strength: 1 },
    { target: "s-2", source: "s-3" , strength: 1 },
    { target: "s-3", source: "s-5" , strength: 1 },
    { target: "s-3", source: "s-6" , strength: 1 },
    { target: "r-1", source: "r-2" , strength: 1 },
    { target: "r-1", source: "r-3" , strength: 1 },
    { target: "r-2", source: "r-4" , strength: 1 },
    { target: "r-3", source: "r-4" , strength: 1 },
]

