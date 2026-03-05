import './App.css'
import Login from './components/Login'
import Success from './components/Success'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}

export default App