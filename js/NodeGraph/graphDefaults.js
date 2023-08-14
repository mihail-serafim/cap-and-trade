// TODO: Update to match theming. Add more fields as needed
// Defines starting nodes and connections
export var baseNodes = [
    { id: "mammal", type: 0, label: "Mammals", level: 1, cost: 100, yield: 1, emissions: 30, locked: false, enabled: true },
    { id: "dog"   , type: 0, label: "Dogs"   , level: 1, cost: 100, yield: 2, emissions: 30, locked: true, enabled: true },
    { id: "cat"   , type: 1, label: "Cats"   , level: 1, cost: 200, yield: 5, emissions: 30, locked: true, enabled: true },
    { id: "fox"   , type: 0, label: "Foxes"  , level: 1, cost: 100, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "elk"   , type: 1, label: "Elk"    , level: 1, cost: 100, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "insect", type: 1, label: "Insects", level: 1, cost: 100, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "ant"   , type: 0, label: "Ants"   , level: 1, cost: 200, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "bee"   , type: 1, label: "Bees"   , level: 1, cost: 200, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "fish"  , type: 2, label: "Fish"   , level: 1, cost: 100, yield: 1, emissions: 30, locked: true, enabled: true },
    { id: "pike"  , type: 2, label: "Pikes"  , level: 1, cost: 100, yield: 1, emissions: 30, locked: true, enabled: true }
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