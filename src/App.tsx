
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import { ReportForm } from './pages/report/ReportForm'
import { ClassList } from './pages/class/ClassList'
import { ClassById } from './pages/class/ClassById'
import { ClassForm } from './pages/class/ClassForm'

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route element={<AuthGuard />}>
              <Route index element={<Navigate to={"/home"} />} />
              <Route path='/home' element={<Home />} />

              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />

              <Route path='/report' element={<ReportList />} />
              <Route path='/report/create' element={<ReportForm />} />
              <Route path='/report/:id' element={<ReportById />} />
              <Route path='/report/:id/edit' element={<ReportForm />} />

              <Route path='/class' element={<ClassList />} />
              <Route path='/class/create' element={<ClassForm />} />
              <Route path='/class/:id' element={<ClassById />} />
              <Route path='/class/:id/edit' element={<ClassForm />} />
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
