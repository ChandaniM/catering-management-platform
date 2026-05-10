import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <Login onLogin={() => setIsAuthenticated(true)} />
        } 
      />
      <Route 
        path="/dashboard/*" 
        element={
          isAuthenticated ? 
          <Dashboard onLogout={() => setIsAuthenticated(false)} /> : 
          <Navigate to="/login" replace />
        } 
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  )
}

export default App
