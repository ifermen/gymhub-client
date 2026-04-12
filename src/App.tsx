
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { UserContextProvider } from './contexts/UserContext'
import { Layout } from './layouts/Layout'
import { Home } from './pages/home/Home'
import { AuthGuard } from './guards/AuthGuard'
import { Profile } from './pages/profile/Profile'
import { EditProfile } from './pages/profile/EditProfile'
import { ReportList } from './pages/report/ReportList'
import { ReportById } from './pages/report/ReportById'

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route element={<AuthGuard />}>
              <Route index path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />
              <Route path='/report' element={<ReportList />} />
              <Route path='/report/{id}' element={<ReportById />} />
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
