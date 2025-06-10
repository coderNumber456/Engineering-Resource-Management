import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import CreateProjectForm from './pages/CreateProjectForm.tsx'
import Project from './pages/Project.tsx'
import AssignmentTable from './pages/Assignments.tsx'
import Teams from './pages/Teams.tsx'
import Profile from './pages/Profile.tsx'
import ProtectedRoute from './Service/ProtectedRoute.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />
        } />
      <Route path="/create-project" element={<ProtectedRoute> <CreateProjectForm /></ProtectedRoute>} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/assignment-table" element={<ProtectedRoute> <AssignmentTable/> </ProtectedRoute>} />
      <Route path="/teams" element={<ProtectedRoute> <Teams/> </ProtectedRoute>} />
      <Route path="/profile" element={<Profile/>} />
    </Route>
  )
   
)

createRoot(document.getElementById('root')!).render(
   
  <StrictMode>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)
