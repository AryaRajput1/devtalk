import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallbackPage from "./pages/authCallback/AuthCallbackPage"
import MainLayout from "./layout/MainLayout"
import PlaylistPage from "./pages/playlist/PlaylistPage"
import AdminPage from "./pages/admin/AdminPage"

function App() {
  return (
    <Routes>
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
      </Route>
    </Routes>
  )
}

export default App
