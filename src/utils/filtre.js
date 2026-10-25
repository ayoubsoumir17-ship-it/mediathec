export function creerFiltre(texte) {
  const recherche = texte.trim().toLocaleLowerCase('fr')

  return (livre) => {
    if (!recherche) return true
    const auteur = `${livre.auteur.prenom} ${livre.auteur.nom}`
    return [livre.titre, auteur, ...livre.tags]
      .some((valeur) => valeur.toLocaleLowerCase('fr').includes(recherche))
  }
}
