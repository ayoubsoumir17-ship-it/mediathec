export function pureAppend(livres, livre) {
  return [...livres, livre]
}

export function pureInject(livres, index, livre) {
  return [...livres.slice(0, index), livre, ...livres.slice(index)]
}

export function pureDelete(livres, id) {
  return livres.filter((livre) => livre.id !== id)
}

export function pureUpdateNote(livres, id, note) {
  return livres.map((livre) => (
    livre.id === id ? { ...livre, note } : livre
  ))
}

export function pureSetEmprunteur(livres, id, emprunteur) {
  return livres.map((livre) => (
    livre.id === id ? Object.assign({}, livre, { emprunteur }) : livre
  ))
}

export function totalNotes(livres) {
  return livres.reduce((total, livre) => total + livre.note, 0)
}
