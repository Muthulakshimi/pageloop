import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface DocumentContextType {
  documents: Document[]
  currentDocument: Document | null
  createNewDocument: () => void
  saveDocument: (title: string, content: string) => void
  loadDocument: (id: string) => void
  deleteDocument: (id: string) => void
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)

  const createNewDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setCurrentDocument(newDoc)
  }

  const saveDocument = (title: string, content: string) => {
    if (!currentDocument) {
      // Create new document if none exists
      const newDoc: Document = {
        id: Date.now().toString(),
        title: title || 'Untitled Document',
        content,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setDocuments(prev => [newDoc, ...prev])
      setCurrentDocument(newDoc)
    } else {
      // Check if document already exists in the array
      const exists = documents.some(doc => doc.id === currentDocument.id)
      const updatedDoc = {
        ...currentDocument,
        title: title || 'Untitled Document',
        content,
        updatedAt: new Date()
      }
      if (exists) {
        // Update existing document
        setDocuments(prev =>
          prev.map(doc => doc.id === currentDocument.id ? updatedDoc : doc)
        )
      } else {
        // Add new document
        setDocuments(prev => [updatedDoc, ...prev])
      }
      setCurrentDocument(updatedDoc)
    }
  }

  const loadDocument = (id: string) => {
    const doc = documents.find(d => d.id === id)
    if (doc) {
      setCurrentDocument(doc)
    }
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    if (currentDocument?.id === id) {
      setCurrentDocument(null)
    }
  }

  return (
    <DocumentContext.Provider value={{
      documents,
      currentDocument,
      createNewDocument,
      saveDocument,
      loadDocument,
      deleteDocument
    }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider')
  }
  return context
}