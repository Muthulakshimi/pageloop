import pageloopLogo from './assets/pageloop.png'
import DocumentEditor from './components/DocumentEditor'
import Sidebar from './components/Sidebar'
import { DocumentProvider } from './contexts/DocumentContext'
import './index.css'

function App() {
  return (
    <DocumentProvider>
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
          <Sidebar />
          <DocumentEditor />
        </div>
      </div>
    </DocumentProvider>
  )
}

export default App