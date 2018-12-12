var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var artillerySchema = new Schema({
  profile: {
      artillery: {
          rotation_time: Number,
          max_damage_AP: Number,
          max_damage_HE: Number,
          gun_rate: Number
      }
  },
  name: String,
  image: String,
  tag: String,
  module_id_str: String,
  module_id: Number,
  type: String,
  price_credit: Number
});

var Artillery = mongoose.model('Artillery', artillerySchema);
module.exports = Artillery;

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
