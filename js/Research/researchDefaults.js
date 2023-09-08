//
export const productionTreeData = {
    "name": "",
    "id": "1",
    "type": "display",
    "locked": false,
    "cost": "",
    "children": [
      {
        "name": "Production",
        "id": "2",
        "type": "display",
        "locked": false,
        "cost": "",
        "children": [
          {
            "name": "Gold Efficiency",
            "id": "prod-1",
            "multiplier": 0.1,
            "type": "production",
            "locked": true,
            "cost": 5,
            "description": "Produce 10% more gold.",
          },
          {
            "name": "Silver Efficiency",
            "id": "prod-2",
            "multiplier": 0.1, 
            "type": "production",
            "locked": true,
            "cost": 5,
            "description": "Produce 10% more silver.",
          },
          {
            "name": "Research Mandates I",
            "id": "prod-3",
            "multiplier": 0.15,
            "type": "production",
            "locked": true,
            "cost": 7.5,
            "description": "Produce 15% more research points.",
            "children": [              
                {
                  "name": "Research Mandates II",
                  "id": "prod-4",
                  "multiplier": 0.15,
                  "type": "production",
                  "locked": true,
                  "cost": 10,
                  "description": "Produce an additional 10% more research points.",
                }             
            ]
          }
        ]
      },
      {
        "name": "Emissions",
        "id": "3",
        "type": "display",
        "locked": false,
        "cost": "",
        "children": [
          {
            "name": "Clean Production",
            "id": "emis-1",
            "multiplier": 0.2,
            "type": "emissions",
            "locked": true,
            "cost": 10,
            "description": "Lower emissions caused by all production by 20%.",
          },
          {
            "name": "Lobby Government",
            "id": "emis-2",
            "multiplier": 0.5,
            "type": "emissions",
            "locked": true,
            "cost": 10,
            "description": "Reduce the fine for exceeding emissions limits by 50%.",
            "children": [
              {
                "name": "R&D Allowances",
                "id": "emis-3",
                "multiplier": 0.6,
                "type": "emissions",
                "locked": true,
                "cost": 15,
                "description": "Lower emissions of all research nodes by 60%.",
              },
            ]
          },       
        ]
      },
      {
        "name": "Selling",
        "id": "4",
        "type": "display",
        "locked": false,
        "cost": "",
        "children": [
          {
            "name": "Quality Metals",
            "id": "sell-1",
            "multiplier": 0.1,
            "type": "selling",
            "locked": true,
            "cost": 5,
            "description": "All outputs sell for 10% more.",
            "children" : [
              {
                "name": "Quality Gold",
                "id": "sell-2",
                "multiplier": 0.2,
                "type": "selling",
                "locked": true,
                "cost": 10,
                "description": "Gold sells for 20% more.",
              },
              {
                "name": "Quality Silver",
                "id": "sell-3",
                "multiplier": 0.2,
                "type": "selling",
                "locked": true,
                "cost": 10,
                "description": "Silver sells for 20% more.",
              },
            ]
          }
        ]
      },
    ]
  };

