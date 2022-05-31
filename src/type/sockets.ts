import { Server, Socket } from 'socket.io';
import { ExerciceEtudiant } from './ExerciceEtudiant';
import { Tentative } from './Tentative';
import { Aide } from './Aide';

/**
 * Message envoyé par le serveur pour signaler l'ajout d'un exercice
 */
export type MessageExercice = { etudiantCommenceExo: ExerciceEtudiant };

/**
 * Message envoyé par le serveur pour signaler l'ajout d'une tentative
 */
export type MessageTentative = { etudiantFaitNouvelleTentative: Tentative };

/**
 * Message envoyé par le serveur pour signaler la nouvelle demande d'aide
 */
export type MessageAide = { etudiantDemandeAide: Aide };

/**
 * Évenements envoyés par le serveur
 */
export interface ServerToClientEvents {
  tentatives: (tentative: MessageTentative) => void;
  exercices: (exercice: MessageExercice) => void;
  aides: (aide: MessageAide) => void;
}

// Utilisation de never = ne devrait jamais arriver.
// En effet, on ne devrait pas recevoir de message, pas d'emit interne, ni de paramètre de connexion.

/* Type d'un socket dans le cadre de notre application */
export type MySocket = Socket<never, ServerToClientEvents, never, never>;

/* Type d'un serveur de sockets dans le cadre de notre application */
export type MySocketServer = Server<never, ServerToClientEvents, never, never>;
