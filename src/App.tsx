import pageloopLogo from './assets/pageloop.png'
import './index.css'

function App() {
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
          </div>

          {/* Editor */}
          <div className="editor-section">
            <div className="editor-placeholder">
              <textarea 
                placeholder="Start writing your document..." 
                className="editor-input"
                rows={10}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App