import FicheLivre from './FicheLivre.jsx'
import BoutonEmprunt from './BoutonEmprunt.js'

function ResultatList({ donnees, onEmprunter, onSupprimer }) {
  if (donnees.length === 0) {
    return <p className="aucun-resultat">Aucun ouvrage ne correspond à votre recherche.</p>
  }

  return (
    <ul id="catalogue" className="liste">
      {donnees.map((livre) => (
        <li key={livre.id} className="ligne-livre">
          <FicheLivre
            livre={livre}
            tags={livre.tags}
            titreCourt={livre.titre.length > 24 ? `${livre.titre.slice(0, 22)}…` : livre.titre}
          >
            <p className="auteur-livre">
              {livre.auteur.prenom} {livre.auteur.nom}
            </p>
            <div className="meta-livre">
              <span className="tag">{livre.tags[0]}</span>
              <span className="note-livre">★ {livre.note}/10</span>
              <span
                className="statut-emprunt"
                style={{ color: livre.emprunteur ? '#666' : '#0a0' }}
              >
                {livre.emprunteur
                  ? `Emprunté par ${livre.emprunteur}`
                  : 'Disponible'}
              </span>
            </div>
          </FicheLivre>
          <div className="actions-livre">
            <BoutonEmprunt
              $emprunte={Boolean(livre.emprunteur)}
              onClick={() => onEmprunter(livre.id)}
            >
              {livre.emprunteur ? 'Rendre' : 'Emprunter'}
            </BoutonEmprunt>
            <button
              className="bouton-texte bouton-supprimer"
              type="button"
              onClick={() => onSupprimer(livre.id)}
              aria-label={`Supprimer ${livre.titre}`}
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ResultatList
