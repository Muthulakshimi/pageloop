import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Toolbar from './Toolbar'

function DocumentEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  return (
    <main className="editor-container">
      {/* Title Input */}
      <div className="title-section">
        <input 
          type="text" 
          placeholder="Document Title" 
          className="title-input"
        />
      </div>

      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <div className="editor-section">
        <EditorContent editor={editor} />
      </div>
    </main>
  )
}

export default DocumentEditor