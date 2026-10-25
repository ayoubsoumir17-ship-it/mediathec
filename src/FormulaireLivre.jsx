import { useState } from 'react'

function FormulaireLivre({ onAjouter, onInsererTete }) {
  const [titre, setTitre] = useState('')
  const [nomAuteur, setNomAuteur] = useState('')

  function soumettre(event) {
    event.preventDefault()
    if (!titre.trim() || !nomAuteur.trim()) return
    onAjouter(titre.trim(), nomAuteur.trim())
    setTitre('')
    setNomAuteur('')
  }

  function inserer() {
    if (!titre.trim() || !nomAuteur.trim()) return
    onInsererTete(titre.trim(), nomAuteur.trim())
    setTitre('')
    setNomAuteur('')
  }

  return (
    <section className="formulaire-section" aria-labelledby="titre-ajout">
      <div>
        <p className="surtitre">Enrichir la collection</p>
        <h2 id="titre-ajout">Ajouter un ouvrage</h2>
      </div>
      <form onSubmit={soumettre}>
        <label>
          Titre
          <input
            value={titre}
            onChange={(event) => setTitre(event.target.value)}
            placeholder="Titre du livre"
            required
          />
        </label>
        <label>
          Nom de l’auteur
          <input
            value={nomAuteur}
            onChange={(event) => setNomAuteur(event.target.value)}
            placeholder="Prénom et nom"
            required
          />
        </label>
        <div className="actions-formulaire">
          <button className="bouton-secondaire" type="button" onClick={inserer}>
            Ajouter en tête
          </button>
          <button className="bouton-principal" type="submit">
            Ajouter à la fin <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormulaireLivre
