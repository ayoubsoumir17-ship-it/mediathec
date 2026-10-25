function ChercheBar({ valeur, onTexteChange }) {
  return (
    <label className="recherche">
      <span className="sr-only">Rechercher dans le catalogue</span>
      <span className="recherche-icone" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={valeur}
        onChange={(event) => onTexteChange(event.target.value)}
        placeholder="Titre, auteur ou catégorie..."
      />
      <kbd>⌘ K</kbd>
    </label>
  )
}

export default ChercheBar
