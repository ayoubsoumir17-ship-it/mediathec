import styles from './FicheLivre.module.css'

function FicheLivre({
  livre: {
    id,
    titre,
    auteur: { prenom, nom },
  },
  tags,
  titreCourt,
  children,
}) {
  return (
    <article className={styles.carte}>
      <div className={styles.couverture} aria-hidden="true">
        <span>{titre.slice(0, 1)}</span>
      </div>
      <div className={styles.details}>
        <div className={styles.enteteCarte}>
          <div>
            <p className={styles.identifiant}>{id}</p>
            <h3 title={titre}>{titreCourt || titre}</h3>
          </div>
          <span className={styles.marqueFavori} aria-label="Ouvrage du catalogue">✦</span>
        </div>
        <p className={styles.auteur}>
          {prenom} {nom}
        </p>
        {children}
        <div className={styles.tags}>
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  )
}

export default FicheLivre
