import { Personne } from './Personne.js'

export class Etudiant extends Personne {
  constructor(nom, prenom, niveau) {
    super(nom, prenom)
    this.niveau = niveau
  }
}
