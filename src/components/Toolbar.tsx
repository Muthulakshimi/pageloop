import { Editor } from '@tiptap/react'

interface ToolbarProps {
  editor: Editor | null
}

function Toolbar({ editor }: ToolbarProps) {
  const addCallout = (type: string) => {
    editor?.chain().focus().insertContent(`<div data-callout data-type="${type}"><p>This is a ${type} callout</p></div>`).run()
  }

  return (
    <div className="toolbar">
      {/* Font formatting group */}
      <div className="toolbar-group">
        <button 
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Bold (Ctrl+B)"
          type="button"
        >
          <strong>B</strong>
        </button>
        <button 
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Italic (Ctrl+I)"
          type="button"
        >
          <em>I</em>
        </button>
        <button 
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Underline (Ctrl+U)"
          type="button"
        >
          <u>U</u>
        </button>
      </div>
      
      {/* Lists group */}
      <div className="toolbar-group">
        <button 
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Bullets"
          type="button"
        >
          •
        </button>
        <button 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive('orderedList') ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Numbering"
          type="button"
        >
          1.
        </button>
      </div>

      {/* Headings group */}
      <div className="toolbar-group">
        <button 
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className="toolbar-btn"
          title="Normal Text"
          type="button"
        >
          Normal
        </button>
        <button 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor?.isActive('heading', { level: 1 }) ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Heading 1"
          type="button"
        >
          H1
        </button>
        <button 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive('heading', { level: 2 }) ? 'toolbar-btn active' : 'toolbar-btn'}
          title="Heading 2"
          type="button"
        >
          H2
        </button>
      </div>

      {/* Callouts group */}
      <div className="toolbar-group">
        <button 
          onClick={() => addCallout('info')} 
          className="toolbar-btn callout-btn"
          title="Info"
          type="button"
        >
          💡
        </button>
        <button 
          onClick={() => addCallout('warning')} 
          className="toolbar-btn callout-btn"
          title="Warning"
          type="button"
        >
          ⚠️
        </button>
        <button 
          onClick={() => addCallout('error')} 
          className="toolbar-btn callout-btn"
          title="Error"
          type="button"
        >
          ❌
        </button>
        <button 
          onClick={() => addCallout('success')} 
          className="toolbar-btn callout-btn"
          title="Success"
          type="button"
        >
          ✅
        </button>
      </div>
    </div>
  )
}

export default Toolbar