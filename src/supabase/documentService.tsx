import { supabase } from './supabaseClient'

export interface Document {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

class DocumentService {
  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔄 Testing Supabase connection...')
      const { error } = await supabase
        .from('documents')
        .select('count')
        .limit(1)

      if (error) {
        console.error('❌ Connection test failed:', error)
        return false
      }
      console.log('✅ Supabase connection successful')
      return true
    } catch (error) {
      console.error('❌ Connection test error:', error)
      return false
    }
  }

  // Get all documents
  async getAllDocuments(): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching documents:', error)
      return []
    }
  }

  // Create new document
  async createDocument(title: string, content: string): Promise<Document | null> {
    try {
      console.log('Attempting to save document:', { title, content })
      const { data, error } = await supabase
        .from('documents')
        .insert([{ title, content }])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      console.log('Created document:', data)
      return data
    } catch (error) {
      console.error('Error creating document:', error)
      return null
    }
  }

  // Update existing document
  async updateDocument(id: string, title: string, content: string): Promise<Document | null> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error updating document:', error)
      return null
    }
  }

  // Delete document
  async deleteDocument(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return true
    } catch (error) {
      console.error('Error deleting document:', error)
      return false
    }
  }
}

export const documentService = new DocumentService()