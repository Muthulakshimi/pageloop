import { useDocuments } from '../contexts/DocumentContext'

function Sidebar() {
  const { documents, currentDocument, loadDocument, deleteDocument } = useDocuments()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <aside className="sidebar">
      <h3>Documents</h3>
      <div className="documents-list">
        {documents.length === 0 ? (
          <p className="no-documents">No documents yet. Create your first document!</p>
        ) : (
          documents.map(doc => (
            <div 
              key={doc.id} 
              className={`document-item ${currentDocument?.id === doc.id ? 'active' : ''}`}
              onClick={() => loadDocument(doc.id)}
            >
              <div className="document-info">
                <h4 className="document-title">{doc.title}</h4>
                <p className="document-date">
                  {formatDate(doc.updated_at)}
                </p>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteDocument(doc.id)
                }}
                title="Delete document"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default Sidebar