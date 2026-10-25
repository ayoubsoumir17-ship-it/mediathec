export function compterLivres(noeud) {
  return noeud.livres + noeud.enfants.reduce(
    (total, enfant) => total + compterLivres(enfant),
    0,
  )
}
