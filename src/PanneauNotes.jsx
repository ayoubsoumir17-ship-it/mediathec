import { Component } from 'react'
import { pureUpdateNote, totalNotes } from './utils/immuable.js'

class PanneauNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      livres: [...props.livres],
      precedent: null,
    }
    this.annuler = this.annuler.bind(this)
  }

  componentDidUpdate(previousProps) {
    if (previousProps.livres !== this.props.livres) {
      this.setState({ livres: [...this.props.livres] })
    }
  }

  annuler() {
    if (!this.state.precedent) return
    const livres = [...this.state.precedent]
    this.setState({ livres, precedent: null })
    this.props.onLivresChange(livres)
  }

  noter(id) {
    const livre = this.state.livres.find((item) => item.id === id)
    if (!livre) return
    const livres = pureUpdateNote(
      this.state.livres,
      id,
      Math.min(10, livre.note + 1),
    )
    this.setState({ livres })
    this.props.onLivresChange(livres)
  }

  permuter() {
    if (this.state.livres.length < 2) return
    const [premier, second] = this.state.livres
    const livreA = this.state.livres.find((livre) => livre.id === premier.id)
    const livreB = this.state.livres.find((livre) => livre.id === second.id)
    const indexA = this.state.livres.findIndex((livre) => livre.id === livreA.id)
    const indexB = this.state.livres.findIndex((livre) => livre.id === livreB.id)
    const livres = [...this.state.livres]
    let a = livres[indexA]
    let b = livres[indexB]
    ;[a, b] = [b, a]
    livres[indexA] = a
    livres[indexB] = b
    this.setState({ precedent: [...this.state.livres], livres })
    this.props.onLivresChange(livres)
  }

  render() {
    const { livres } = this.state
    const notes = livres.map((livre) => livre.note)
    const noteMaximale = notes.length ? Math.max(...notes) : 0

    return (
      <section className="panneau-notes" aria-labelledby="titre-notes">
        <div className="panneau-entete">
          <div>
            <p className="surtitre">La vie du catalogue</p>
            <h2 id="titre-notes">Notes et organisation</h2>
          </div>
          <div className="resume-notes">
            <span>{totalNotes(livres)} pts au total</span>
            <span>Meilleure note : {noteMaximale}/10</span>
          </div>
        </div>
        <ul className="liste-notes">
          {livres.map((livre) => (
            <li key={livre.id}>
              <span>{livre.titre}</span>
              <span className="valeur-note">★ {livre.note}/10</span>
              <button
                className="bouton-texte"
                type="button"
                onClick={() => this.noter(livre.id)}
                aria-label={`Augmenter la note de ${livre.titre}`}
              >
                Noter +1
              </button>
            </li>
          ))}
        </ul>
        <div className="actions-notes">
          <button className="bouton-secondaire" type="button" onClick={() => this.permuter()}>
            Permuter les deux premiers
          </button>
          <button className="bouton-texte" type="button" onClick={this.annuler}>
            Annuler la permutation
          </button>
        </div>
      </section>
    )
  }
}

export default PanneauNotes
