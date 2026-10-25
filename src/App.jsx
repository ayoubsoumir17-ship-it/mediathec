import { Component } from 'react'
import Stagiaire from './models/Stagiaire.js'
import { Personne } from './models/Personne.js'
import { LIVRES as CATALOGUE } from './data/livres.js'
import { CATEGORIES } from './data/categories.js'
import { totalNotes as sommeNotes } from './utils/immuable.js'
import { compterLivres } from './utils/categories.js'
import { creerFiltre } from './utils/filtre.js'
import { pureAppend, pureDelete, pureInject, pureSetEmprunteur } from './utils/immuable.js'
import ChercheBar from './ChercheBar.jsx'
import ResultatList from './ResultatList.jsx'
import FormulaireLivre from './FormulaireLivre.jsx'
import PanneauNotes from './PanneauNotes.jsx'
import Connecte from './Connecte.jsx'
import Anonymous from './Anonymous.jsx'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      livres: [...CATALOGUE],
      filtre: '',
      isLoggedIn: false,
    }
    this.lecteur = new Stagiaire('El Fassi', 'Sara', '2e année', 'Documentation')
    this.bibliothecaire = new Personne('El Amrani', 'Nadia')
    this.handleTexteChange = this.handleTexteChange.bind(this)
    this.ajouterLivre = this.ajouterLivre.bind(this)
    this.insererTete = this.insererTete.bind(this)
    this.supprimerLivre = this.supprimerLivre.bind(this)
    this.permuterLivres = this.permuterLivres.bind(this)
  }

  handleTexteChange(filtre) {
    this.setState({ filtre })
  }

  prochainId(livres) {
    const prochainNumero = livres.reduce((maximum, livre) => {
      const numero = Number(livre.id.replace('L-', ''))
      return Number.isNaN(numero) ? maximum : Math.max(maximum, numero)
    }, 100) + 1
    return `L-${prochainNumero}`
  }

  creerLivre(livres, titre, nomAuteur) {
    return {
      id: this.prochainId(livres),
      titre,
      auteur: { prenom: '', nom: nomAuteur },
      emprunteur: null,
      note: 0,
      tags: ['nouveau'],
    }
  }

  ajouterLivre(titre, nomAuteur) {
    this.setState(({ livres }) => ({
      livres: pureAppend(livres, this.creerLivre(livres, titre, nomAuteur)),
    }))
  }

  insererTete(titre, nomAuteur) {
    this.setState(({ livres }) => ({
      livres: pureInject(livres, 0, this.creerLivre(livres, titre, nomAuteur)),
    }))
  }

  supprimerLivre(id) {
    this.setState(({ livres }) => ({ livres: pureDelete(livres, id) }))
  }

  permuterLivres(livres) {
    this.setState({ livres: [...livres] })
  }

  basculerEmprunt(id) {
    this.setState(({ livres }) => {
      const livre = livres.find((item) => item.id === id)
      const emprunteur = livre.emprunteur ? null : this.lecteur.getNomComplet()
      return { livres: pureSetEmprunteur(livres, id, emprunteur) }
    })
  }

  render() {
    const { livres, filtre, isLoggedIn } = this.state
    const filtrerLivre = creerFiltre(filtre)
    const resultats = livres.filter(filtrerLivre)
    const notes = livres.map((livre) => livre.note)
    const meilleureNote = notes.length ? Math.max(...notes) : 0
    let contenuPrincipal

    if (isLoggedIn) {
      contenuPrincipal = (
        <>
          <section className="section-catalogue" aria-labelledby="titre-catalogue">
            <div className="section-entete">
              <div>
                <p className="surtitre">Le fonds documentaire</p>
                <h2 id="titre-catalogue">Catalogue</h2>
              </div>
              <p className="statistique">
                {livres.length} ouvrages · {compterLivres(CATEGORIES)} dans les catégories
              </p>
            </div>
            <ChercheBar valeur={filtre} onTexteChange={this.handleTexteChange} />
            {/* liste filtrée */}
            <ResultatList
              donnees={resultats}
              onEmprunter={(id) => this.basculerEmprunt(id)}
              onSupprimer={this.supprimerLivre}
            />
            <PanneauNotes livres={livres} onLivresChange={this.permuterLivres} />
            <FormulaireLivre
              onAjouter={this.ajouterLivre}
              onInsererTete={this.insererTete}
            />
          </section>
        </>
      )
    } else {
      contenuPrincipal = (
        <section className="accueil">
          <p className="surtitre">Bienvenue à la médiathèque</p>
          <h2>Un espace pour vos prochaines lectures.</h2>
          <p>Connectez-vous pour explorer le catalogue, emprunter et noter des ouvrages.</p>
          <p className="accueil-note">
            {sommeNotes(livres)} points de notes · meilleure note : {meilleureNote}/10
          </p>
        </section>
      )
    }

    return (
      <>
        <header className="entete">
          <a className="marque" href="#accueil" aria-label="Médiathèque, accueil">
            <span className="marque-icone" aria-hidden="true">M</span>
            <span>Médiathèque</span>
          </a>
          <nav className="navigation" aria-label="Navigation principale">
            <span>Bibliothèque de quartier</span>
            <button
              className="bouton-connexion"
              type="button"
              onClick={() => this.setState(({ isLoggedIn: connecte }) => ({
                isLoggedIn: !connecte,
              }))}
            >
              {isLoggedIn ? 'Déconnexion' : 'Connexion'}
            </button>
          </nav>
        </header>
        <main id="accueil" className="contenu">
          <div className="bandeau-lecteur">
            {isLoggedIn ? (
              <Connecte nom={this.lecteur.getNomComplet()} />
            ) : (
              <Anonymous />
            )}
            <span>Accueil · Bibliothèque</span>
          </div>
          {contenuPrincipal}
          <footer className="pied-page">
            <span>Accueil assuré par {this.bibliothecaire.getNomComplet()}</span>
            <span>Des histoires à partager.</span>
          </footer>
        </main>
      </>
    )
  }
}

export default App
