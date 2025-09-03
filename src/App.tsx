import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import pageloopLogo from './assets/pageloop.png'
import './index.css'

function App() {
    const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Start writing your document...</p>',
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
  })

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-section">
        <div className="header-content">
          <a href="https://www.parallelhq.com/work/pageloop-parallel" target="_blank">
            <img src={pageloopLogo} className="logo pageloop" alt="Pageloop logo" />
          </a>
          <h1>Pageloop</h1>
          <p className="read-the-docs">
            Still editing manuals manually?
            <br />
            Pageloop spins up the latest in a click!
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Documents</h3>
          <div className="documents-list">
            {/* Document list will go here */}
          </div>
        </aside>

        {/* Editor Area */}
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
          <div className="toolbar">
            {/* Buttons will go here */}
            <button 
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive('bold') ? 'toolbar-btn active' : 'toolbar-btn'}
            >
              Bold
            </button>
            <button 
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'toolbar-btn active' : 'toolbar-btn'}
            >
              Italic
            </button>
            <button 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor?.isActive('heading', { level: 1 }) ? 'toolbar-btn active' : 'toolbar-btn'}
            >
              H1
            </button>
            <button 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor?.isActive('heading', { level: 2 }) ? 'toolbar-btn active' : 'toolbar-btn'}
            >
              H2
            </button>
            <button 
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={editor?.isActive('bulletList') ? 'toolbar-btn active' : 'toolbar-btn'}
            >
              • List
            </button>
          </div>

          {/* Editor */}
          <div className="editor-section">
            <EditorContent editor={editor} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App