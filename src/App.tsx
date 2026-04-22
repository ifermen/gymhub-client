
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
import { ExerciseTable } from './pages/exercises/ExerciseTable'
import { Toaster } from 'react-hot-toast'
import { ClientList } from './pages/client/ClientList'
import ClientById from './pages/client/ClientById'
import ClientForm from './pages/client/ClientForm'
import { EmployeeList } from './pages/employee/EmployeeList'
import { EmployeeById } from './pages/employee/EmployeeById'
import { EmployeeForm } from './pages/employee/EmployeeForm'
import { OfferList } from './pages/offer/OfferList'

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position='top-center' toastOptions={{
          success: {
            className: "!bg-success-800 !font-bold !rounded-full !pb-1 !border-2 border-success-600 !text-success-50"
          }
        }} />
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

              <Route path='/exercise' element={<ExerciseTable />} />

              <Route path='/client' element={<ClientList />} />
              <Route path='/client/create' element={<ClientForm />} />
              <Route path='/client/:id' element={<ClientById />} />
              <Route path='/client/:id/edit' element={<ClientForm />} />

              <Route path='/employee' element={<EmployeeList />} />
              <Route path='/employee/create' element={<EmployeeForm />} />
              <Route path='/employee/:id' element={<EmployeeById />} />
              <Route path='/employee/:id/edit' element={<EmployeeForm />} />

              <Route path='/offer' element={<OfferList />} />
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
