import { ExerciceService } from '@services/exercice.service';
import * as repo from '@repositories/resultat.repo';

jest.mock('@repositories/resultat.repo');

const mockRepo = repo as unknown as jest.Mocked<typeof repo>;
const resultat = [
  {
    idExo: 'string',
    nomExo: 'Skew',
    idEtu: 'Jean-Claude Van-Skew',
    idSession: 'ClashOfL3',
    nomSession: 'Synchro des processus',
    estFini: true,
    langage: 'C--',
    themes: ['Ennui', 'boucles', 'Sockets'],
    difficulte: 10,
    tempsMoyen: 1,
    tempsMaximum: 2,
    debut: new Date(),
    tentatives: [],
    id: '6234e1c446358dcf1450ef8e',
    idSeance: '6006e1c446358dcf1450y4fl',
    aides: [],
  },
  {
    idExo: '4561384324132',
    nomExo: 'pouloulou',
    idEtu: 'Koba LaRoche ',
    idSession: 'ClashOfL3',
    nomSession: 'string',
    estFini: true,
    langage: '--C',
    themes: ['Ennui', 'boucles', 'Sockets'],
    difficulte: 1,
    tempsMoyen: 1,
    tempsMaximum: 2,
    debut: new Date(),
    tentatives: [],
    id: '6234e1d246358dcf1450ef90',
    idSeance: '6006e1c446358dcf1450y4fl',
    aides: [],
  },
];

describe('Service Resultat', () => {
  test('getExerciceEtudiants: teste le resultat que renvoie la fonction de recuperation des resultats des tentatives etudiants', async () => {
    mockRepo.getExerciceEtudiants.mockResolvedValueOnce(resultat);
    const tabResult = await ExerciceService.getExerciceEtudiants();
    expect(tabResult).toBeDefined(); //est definis ?
    expect(tabResult).toBe(resultat); //On s'attends a ce que le tabResult soit composé de resultats.
  });
  test('getExerciceEtudiants: teste que le tableau de resultats est bien défini et non undefined', async () => {
    mockRepo.getExerciceEtudiants.mockResolvedValueOnce([]);
    const tabResult = await ExerciceService.getExerciceEtudiants();
    expect(tabResult).toBeDefined(); //Est definis ?
    expect(tabResult).toStrictEqual([]); // le tableau est-il bien vide ? L'appli crash t'elle?
  });
});
