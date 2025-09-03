import { Editor } from '@tiptap/react'

interface ToolbarProps {
  editor: Editor | null
}

function Toolbar({ editor }: ToolbarProps) {
  return (
    <div className="toolbar">
      {/* Basic formatting */}
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
      
      {/* Headings */}
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
      
      {/* Lists */}
      <button 
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={editor?.isActive('bulletList') ? 'toolbar-btn active' : 'toolbar-btn'}
      >
        • List
      </button>
    </div>
  )
}

export default Toolbar