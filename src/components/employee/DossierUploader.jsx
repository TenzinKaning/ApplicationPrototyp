// Verwaltet das Bewerbungsdossier (CV, Zeugnisse, Motivationsschreiben, …)
// im Profil. Der Upload wird simuliert: es wird nur der Dateiname erfasst,
// keine tatsächliche Datei übertragen. Eine echte Anbindung würde hier
// z.B. FormData an einen Upload-Endpunkt senden.
export function DossierUploader({ documents, onAdd, onRemove }) {
  function handleFileChange(event) {
    const files = Array.from(event.target.files ?? [])
    files.forEach((file) => onAdd(file.name))
    event.target.value = ''
  }

  return (
    <div>
      {documents.length === 0 ? (
        <p className="muted">Noch keine Dokumente hochgeladen.</p>
      ) : (
        <ul className="list-panel" style={{ marginBottom: 'var(--space-4)' }}>
          {documents.map((doc) => (
            <li key={doc.name} className="list-row">
              <div className="list-row__main">
                <div className="list-row__title">{doc.name}</div>
              </div>
              <div className="list-row__actions">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemove(doc.name)}
                >
                  Entfernen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <label className="btn btn-secondary btn-sm" htmlFor="dossier-upload">
        Dokument hochladen
      </label>
      <input
        id="dossier-upload"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
