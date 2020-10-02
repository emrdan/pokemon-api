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
      spDefese: Number,
      speed: Number,
      total: Number
    },
    typing: [{
      type: String
    }]
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pokemon', pokemonSchema);