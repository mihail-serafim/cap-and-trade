// TODO: Update to match theming. Add more fields as needed
// Defines starting nodes and connections
export var baseNodes = [
    { id: "mammal", group: 0, label: "Mammals", level: 1, locked: false, enabled: true },
    { id: "dog"   , group: 0, label: "Dogs"   , level: 2, locked: true, enabled: true },
    { id: "cat"   , group: 0, label: "Cats"   , level: 2, locked: true, enabled: true },
    { id: "fox"   , group: 0, label: "Foxes"  , level: 2, locked: true, enabled: true },
    { id: "elk"   , group: 0, label: "Elk"    , level: 2, locked: true, enabled: true },
    { id: "insect", group: 1, label: "Insects", level: 1, locked: true, enabled: true },
    { id: "ant"   , group: 1, label: "Ants"   , level: 2, locked: true, enabled: true },
    { id: "bee"   , group: 1, label: "Bees"   , level: 2, locked: true, enabled: true },
    { id: "fish"  , group: 2, label: "Fish"   , level: 1, locked: true, enabled: true },
    { id: "pike"  , group: 2, label: "Pikes"  , level: 2, locked: true, enabled: true }
]
  
export var baseLinks = [
    { target: "mammal", source: "dog" , strength: 0.1 },
    { target: "mammal", source: "cat" , strength: 0.1 },
    { target: "mammal", source: "fox" , strength: 0.1 },
    { target: "mammal", source: "elk" , strength: 0.1 },
    { target: "insect", source: "ant" , strength: 0.1 },
    { target: "insect", source: "bee" , strength: 0.1 },
    { target: "fish"  , source: "pike", strength: 0.1 },
    { target: "cat"   , source: "elk" , strength: 0.1 },
    { target: "elk"   , source: "bee" , strength: 0.1 },
    { target: "dog"   , source: "cat" , strength: 0.1 },
    { target: "fox"   , source: "ant" , strength: 0.1 },
    { target: "pike"  , source: "cat" , strength: 0.1 }
]