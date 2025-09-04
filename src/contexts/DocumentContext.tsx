import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { documentService, type Document } from '../supabase/documentService'

interface DocumentContextType {
  documents: Document[]
  currentDocument: Document | null
  loading: boolean
  createNewDocument: () => void
  saveDocument: (title: string, content: string) => Promise<void>
  loadDocument: (id: string) => void
  deleteDocument: (id: string) => Promise<void>
  refreshDocuments: () => Promise<void>
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(false)

  // Load documents from Supabase on mount
  useEffect(() => {
    refreshDocuments()
    // Test connection on startup
    documentService.testConnection()
  }, [])

  const refreshDocuments = async () => {
    setLoading(true)
    try {
      console.log('Refreshing documents from Supabase...')
      const docs = await documentService.getAllDocuments()
      setDocuments(docs)
      console.log('Documents loaded:', docs.length, 'documents')
    } catch (error) {
      console.error('Error refreshing documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewDocument = () => {
    const newDoc: Document = {
      id: `temp-${Date.now()}`, // Temporary ID
      title: 'Untitled Document',
      content: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setCurrentDocument(newDoc)
  }

  const saveDocument = async (title: string, content: string) => {
    setLoading(true)
    try {
      console.log('🔄 Saving document:', { title, content })
      
      if (!currentDocument || currentDocument.id.startsWith('temp-')) {
        // Create new document
        const newDoc = await documentService.createDocument(title || 'Untitled Document', content)
        if (newDoc) {
          setCurrentDocument(newDoc)
          await refreshDocuments()
          console.log('New document created and saved')
        }
      } else {
        // Update existing document
        const updatedDoc = await documentService.updateDocument(
          currentDocument.id,
          title || 'Untitled Document',
          content
        )
        if (updatedDoc) {
          setCurrentDocument(updatedDoc)
          await refreshDocuments()
          console.log('Document updated and saved')
        }
      }
    } catch (error) {
      console.error('Error saving document:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadDocument = (id: string) => {
    const doc = documents.find(d => d.id === id)
    if (doc) {
      setCurrentDocument(doc)
      console.log('Document loaded:', doc.title)
    }
  }

  const deleteDocument = async (id: string) => {
    setLoading(true)
    try {
      console.log('Deleting document:', id)
      const success = await documentService.deleteDocument(id)
      if (success) {
        if (currentDocument?.id === id) {
          setCurrentDocument(null)
        }
        await refreshDocuments()
        console.log('Document deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DocumentContext.Provider value={{
      documents,
      currentDocument,
      loading,
      createNewDocument,
      saveDocument,
      loadDocument,
      deleteDocument,
      refreshDocuments
    }}>
      {children}
    </DocumentContext.Provider>
  )
}export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider')
  }
  return context
}