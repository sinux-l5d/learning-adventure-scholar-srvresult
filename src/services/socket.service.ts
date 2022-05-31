import { MySocket, MySocketServer } from '@type/sockets';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Tentative } from '@type/Tentative';
import { AideARenvoyer } from '@type/AideARenvoyer';

/* La classe SocketService est un singleton qui est initialisé avec un serveur de socket. */
export class SocketService {
  /* Singleton de l'instance */
  private static instance: SocketService;

  /**
   * Constructeur du singleton.
   *
   * Lorsqu'un utilisateur se connecte, on log l'identifiant et l'adresse IP de l'utilisateur.
   * Même chose lorsque l'utilisateur se déconnecte.
   *
   * @param io L'instance du serveur socket.io.
   */
  private constructor(private io: MySocketServer) {
    io.on('connection', (socket: MySocket) => {
      // Affiche qui s'est connecté avec son id et son ip
      console.log(
        "Connexion d'un utilisateur : id=" + socket.id + ' ip=' + socket.handshake.address,
      );

      // Affiche quand un utilisateur se déconnecte
      socket.on('disconnect', () => {
        console.log(
          "Déconnexion d'un utilisateur : id=" + socket.id + ' ip=' + socket.handshake.address,
        );
      });
    });
  }

  /**
   * Initialise une instance singleton de la classe SocketService.
   * @param {MySocketServer} io L'instance du serveur socket.io.
   */
  public static initInstance(io: MySocketServer) {
    if (!SocketService.instance) SocketService.instance = new SocketService(io);
    else throw new Error('SocketService already initialized');
  }

  /**
   * Retourne l'instance de la classe SocketService. S'il n'existe pas, renvoie une erreur.
   * @returns Une instance singleton de la classe SocketService.
   * @throws {Error} Si la classe SocketService n'a pas été initialisée.
   */
  public static getInstance() {
    if (!SocketService.instance) throw new Error('SocketService not initialized');
    return SocketService.instance;
  }

  /**
   * Envoie un exercice à tous les clients connectés
   * @param exercice ExerciceEtudiant
   * @throws {Error} Si la classe SocketService n'a pas été initialisée.
   */
  public async emitExercice(exercice: ExerciceEtudiant) {
    if (!SocketService.instance) throw new Error('SocketService not initialized');

    this.io.emit('exercices', { etudiantCommenceExo: exercice });

    console.log('Exercice envoyé à ' + (await this.getNbClients()) + ' clients');
  }

  /**
   * Envoie une tentative à tous les clients connectés
   * @param tentative La tentative d'émission.
   * @throws {Error} Si la classe SocketService n'a pas été initialisée.
   */
  public async emitTentative(tentative: Tentative) {
    if (!SocketService.instance) throw new Error('SocketService not initialized');

    this.io.emit('tentatives', { etudiantFaitNouvelleTentative: tentative });

    console.log('Tentative envoyé à ' + (await this.getNbClients()) + ' clients');
  }

  /**
   * Envoie une demande d'aide à tous les clients connectés
   * @param aideARenvoyer La demande d'aide d'émission.
   * @throws {Error} Si la classe SocketService n'a pas été initialisée.
   */
  public async emitAide(aideARenvoyer: AideARenvoyer) {
    if (!SocketService.instance) throw new Error('SocketService not initialized');

    this.io.emit('aides', { etudiantDemandeAide: aideARenvoyer });

    console.log('aide envoyé à ' + (await this.getNbClients()) + ' clients');
  }

  /**
   * Retourne le nombre de clients connectés.
   * @returns {number} Le nombre de clients connectés.
   * @throws {Error} Si la classe SocketService n'a pas été initialisée.
   */
  public async getNbClients() {
    if (!SocketService.instance) throw new Error('SocketService not initialized');

    return (await this.io.sockets.allSockets()).size;
  }
}
