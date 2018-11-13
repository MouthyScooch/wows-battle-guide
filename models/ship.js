var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var shipSchema = new Schema({
  description: String,
  has_demo_profile: Boolean,
  images: {
    small: String,
    large: String,
    medium: String,
    contour: String
  },
  is_premium: Boolean,
  is_special: Boolean,
  mod_slots: Number,
  name: String,
  nation: String,
  price_credit: Number,
  price_gold: Number,
  ship_id: Number,
  ship_id_str: String,
  tier: Number,
  type: String,
  default_profile: {
    anti_aircraft: {
      slots: {
        o: {
          avg_damage: Number,
          caliber: Number,
          distance: Number,
          guns: Number,
          name: String
        },
        i: {
          avg_damage: Number,
          caliber: Number,
          distance: Number,
          guns: Number,
          name: String
        }
      },
      defense: Number
    },
    armour: {
      flood_prob: Number,
      flood_damage: Number,
      health: Number,
      range: {
        max: Number,
        min: Number
      },
      total: Number
    },
    artillery: {
      max_dispersion: Number,
      shot_delay: Number,
      rotation_time: Number,
      distance: Number,
      gun_rate: Number,
      artillery_id: Number,
      artillery_id_str: String,
      shells: {
        ap: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          name: String,
          type: String
        },
        he: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          name: String,
          type: String
        }
      }
    },
    atbas: {
      distance: Number,
      slots: {
        o: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          gun_rate: Number,
          name: String,
          shot_delay: Number,
          type: String
        }
      }
    },
    battle_level_range_max: Number,
    battle_level_range_min: Number,
    concealment: {
      total: Number,
      detect_distance_by_plane: Number,
      detect_distance_by_ship: Number
    },
    engine: {
      engine_id_str: String,
      max_speed: Number,
      engine_id: Number
    },
    fire_control: {
      fire_control_id: Number,
      distance: Number,
      distance_increase: Number,
      fire_control_id_str: String
    },
    hull: {
      hull_id: Number,
      hull_id_str: String,
      torpedoes_barrels: Number,
      anti_aircraft_barrels: Number,
      artillery_barrels: Number,
      atba_barrels: Number,
      health: Number,
      planes_amount: Number,
      range: {
        max: Number,
        min: Number
      }
    },
    mobility: {
      rudder_time: Number,
      total: Number,
      turning_radius: Number,
      max_speed: Number
    },
    torpedoes: {
      distance: Number,
      max_damage: Number,
      reload_time: Number,
      rotation_time: Number,
      slots: {
        0: {
          barrels: Number,
          caliber: Number,
          guns: Number,
          name: String
        }
      },
      torpedo_name: String,
      torpedo_speed: Number,
      torpedoes_id: Number,
      torpedoes_id_str: String,
      visibility_dist: Number
    },
    weaponry: {
      anti_aircraft: Number,
      aircraft: Number,
      artillery: Number,
      torpedoes: Number
    }
  },
  upgrades: Array
});

var Ship = mongoose.model('Ship', shipSchema);
module.exports = Ship;

// default_profile: {engine: {…}, torpedo_bomber: null, anti_aircraft: {…}, mobility: {…}, hull: {…}, …}
// description: "This ship is a copy of ZAO and is suitable for Clan Battles only"
// has_demo_profile: false
// images: {small: "http://glossary-na-static.gcdn.co/icons/wows/current/vehicle/small/PJSC934.png", large: "http://glossary-na-static.gcdn.co/icons/wows/current/vehicle/large/PJSC934.png", medium: "http://glossary-na-static.gcdn.co/icons/wows/current/vehicle/medium/PJSC934.png", contour: "http://glossary-na-static.gcdn.co/icons/wows/current/vehicle/contour/PJSC934.png"}
// is_premium: false
// is_special: false
// mod_slots: 6
// modules: {engine: Array(1), torpedo_bomber: Array(0), fighter: Array(0), hull: Array(1), artillery: Array(1), …}
// modules_tree: {3268816592: {…}, 3272355536: {…}, 3272453840: {…}, 3273010896: {…}, 3273043664: {…}, 3273633488: {…}}
// name: "[Zao]"
// nation: "japan"
// next_ships: {}
// price_credit: 0
// price_gold: 0
// ship_id: 3315513040
// ship_id_str: "PJSC934"
// tier: 10
// type: "Cruiser"
// upgrades: (21) [4260548528, 4268937136, 4266839984, 4281520048, 4273131440, 4265791408, 4261597104, 4269985712, 4267888560, 4274180016, 4278374320, 4282568624, 4262645680, 4271034288, 4275228592, 4279422896, 4259499952, 4287811504, 4272082864, 4257402800, 4280471472]
