import { Etudiant } from './Etudiant.js'

export default class Stagiaire extends Etudiant {
  constructor(nom, prenom, niveau, filiere) {
    super(nom, prenom, niveau)
    this.filiere = filiere
  }
}
