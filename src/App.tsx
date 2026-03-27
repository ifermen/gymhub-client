
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { UserContextProvider } from './contexts/UserContext'
import { Layout } from './layouts/Layout'
import { Home } from './pages/home/Home'

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
