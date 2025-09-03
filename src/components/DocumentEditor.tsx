import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Callout } from '../extensions/callout'
import { useDocuments } from '../contexts/DocumentContext'
import { useState, useEffect } from 'react'
import Toolbar from './Toolbar'

function DocumentEditor() {
  const { currentDocument } = useDocuments()
  const [title, setTitle] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Callout,
      Placeholder.configure({
        placeholder: 'Start writing your document...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
  })

  // Update editor content when document changes
  useEffect(() => {
    if (currentDocument) {
      setTitle(currentDocument.title)
      editor?.commands.setContent(currentDocument.content || '')
    } else {
      setTitle('')
      editor?.commands.setContent('')
    }
  }, [currentDocument, editor])

  return (
    <main className="editor-container">
      {/* Title Input */}
      <div className="title-section">
        <input 
          type="text" 
          placeholder="Document Title" 
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Toolbar */}
      <Toolbar editor={editor} title={title} />

      {/* Editor */}
      <div className="editor-section">
        <EditorContent editor={editor} />
      </div>
    </main>
  )
}

export default DocumentEditor