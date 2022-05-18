import { ExerciceEtudiant as TExerciceEtudiant } from '@type/ExerciceEtudiant';
import { model, Schema } from 'mongoose';
import { Tentative } from '@type/Tentative';
import { Aide } from '@type/Aide';

const TentativeSchema = new Schema<Tentative>({
  validationExercice: {
    type: Boolean,
    required: true,
  },
  logErreurs: {
    type: String,
    required: true,
  },
  dateSoumission: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reponseEtudiant: {
    type: String,
    required: true,
  },
  idSeance: {
    type: String,
    required: true,
  },
});

const AideSchema = new Schema<Aide>({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  resolue: {
    type: Boolean,
    default: false,
  },
});

/**
 * Schéma d'un exercice en base de donnée.
 */
const ExerciceEtudiantSchema = new Schema<TExerciceEtudiant>({
  idExo: {
    type: String,
    required: true,
  },
  nomExo: {
    type: String,
    required: true,
  },
  idEtu: {
    type: String,
    required: true,
  },
  idSession: {
    type: String,
    required: true,
  },
  nomSession: {
    type: String,
  },
  idSeance: {
    type: String,
    required: true,
  },
  estFini: {
    type: Boolean,
    default: false,
  },
  langage: {
    type: String,
    required: true,
  },
  themes: {
    type: [String],
    required: true,
  },
  difficulte: {
    type: Number,
    min: 1,
    max: 10,
  },
  tempsMoyen: {
    type: Number,
    required: false,
  },
  tempsMaximum: {
    type: Number,
    required: false,
  },
  debut: {
    type: Date,
    default: Date.now,
  },
  tentatives: {
    type: [TentativeSchema],
  },
  aides: {
    type: [AideSchema],
  },
});

// Enlève les propriétés non voulu lorsque l'on transforme en JSON
[TentativeSchema, ExerciceEtudiantSchema].forEach((schema) => {
  schema.set('toJSON', {
    // pour avoir `id`, alias natif de `_id`. virtual = alias
    virtuals: true,
    // pour ne pas avoir __v, version du document par Mongoose
    versionKey: false,
    // true par défaut, mais pour que vous sachiez: convertie les Maps en POJO
    flattenMaps: true,
    getters: false,
    // delete `_id` manuellement
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    },
  });
});

export const ExerciceEtudiant = model('ExerciceEtudiant', ExerciceEtudiantSchema);
