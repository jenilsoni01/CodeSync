import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Page from './components/Page'
import './App.css'

// App component sets up routing for the application
function App() {
  return (
    <Router>
      <Routes>

        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for dynamic pages by pageId */}
        <Route path="/:pageId" element={<Page />} />
        
      </Routes>
    </Router>
  )
}

export default App
