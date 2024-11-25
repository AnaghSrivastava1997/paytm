import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Signup'
import Signin from './Signin'
import Dashboard from './Dashboard'
import Send from './Send'


function App() {

  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
    </Router>
  )
}

export default App
