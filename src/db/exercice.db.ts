import { ExerciceEtudiant as TExerciceEtudiant } from '@type/ExerciceEtudiant';
import { model, Schema } from 'mongoose';
import { Tentative } from '@type/Tentative';

const TentativeSchema = new Schema<Tentative>({
  resultState: {
    type: String,
    enum: ['Ok', 'Faux', 'ErrorExecution', 'ErrorCompile'],
    required: true,
  },
  erreurs: {
    type: [String],
  },
  dateSoumission: {
    type: Date,
    default: Date.now,
    required: true,
  },
  code: {
    type: String,
    required: true,
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
});

// Enlève les propriétés non voulu lorsque l'on transforme en JSON
ExerciceEtudiantSchema.set('toJSON', {
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

export const ExerciceEtudiant = model('ExerciceEtudiant', ExerciceEtudiantSchema);
