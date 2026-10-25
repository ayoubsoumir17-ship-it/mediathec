export class Personne {
  constructor(nom, prenom) {
    this.nom = nom
    this.prenom = prenom
  }

  getNomComplet() {
    return `${this.prenom} ${this.nom}`
  }
}
