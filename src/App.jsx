import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./Context/LanguageContext"
import { AuthProvider } from "./Context/AuthContext"
import VedaCraft from "./Pages/VedaCraft"
import SuperAdmin from "./Pages/SuperAdmin"


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VedaCraft />} />
            <Route path="/superadmin" element={<SuperAdmin />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App