const { celebrate, Joi, errors } = require('celebrate');
const PokemonRouter = require('express').Router();
const crudUtil = require('../../utils/crud');
const Pokemon = require('../../models/pokemon');

const crudHandlers = crudUtil(Pokemon);

const types = [
  'normal', 'fire', 'water', 'electric', 'grass',
  'ice', 'fighting', 'poison', 'ground', 'flying',
  'phsychic', 'bug', 'rock', 'ghost', 'drgaon',
  'dark', 'steel', 'fairy'
];

const createSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    stats: Joi.object({
      hp: Joi.number().min(1).max(255).required(),
      attack: Joi.number().min(5).max(190).required(),
      defense: Joi.number().min(5).max(250).required(),
      spAttack: Joi.number().min(10).max(194).required(),
      spDefense: Joi.number().min(20).max(250).required(),
      speed: Joi.number().min(5).max(180).required()
    }).required(),
    typing: Joi.array().max(2).items(Joi.string().lowercase().valid(...types)).required()
  }).required()
}

const updateSchema = {
  body: Joi.object({
    name: Joi.string(),
    stats: Joi.object({
      hp: Joi.number().min(1).max(255),
      attack: Joi.number().min(5).max(190),
      defense: Joi.number().min(5).max(250),
      spAttack: Joi.number().min(10).max(194),
      spDefense: Joi.number().min(20).max(250),
      speed: Joi.number().min(5).max(180)
    }),
    typing: Joi.array().max(2).items(Joi.string().lowercase().valid(...types))
  })
}

PokemonRouter.route('/:id')
  .get(
    crudHandlers.getOne
  )
  .put(
    celebrate(updateSchema),
    crudHandlers.updateOne
  )
  .delete(
    crudHandlers.removeOne
  );

PokemonRouter.route('/')
  .post(
    celebrate(createSchema),
    crudHandlers.createOne
  )
  .get(
    crudHandlers.getMany
  );

PokemonRouter.use(errors());

module.exports = PokemonRouter;