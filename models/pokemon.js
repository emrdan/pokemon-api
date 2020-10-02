const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
    },
    stats: {
      hp: Number,
      attack: Number,
      defense: Number,
      spAttack: Number,
      spDefense: Number,
      speed: Number,
      total: {
        type: Number,
        default: 0
      }
    },
    typing: [{
      type: String
    }]
  },
  { timestamps: true },
);

pokemonSchema.pre('save', function(next) {
  this.stats.total = this.stats.hp
   + this.stats.attack
   + this.stats.defense
   + this.stats.spAttack
   + this.stats.spDefense
   + this.stats.speed;

   next();
});

module.exports = mongoose.model('Pokemon', pokemonSchema);