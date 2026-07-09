import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./Context/LanguageContext"
import { AuthProvider } from "./Context/AuthContext"
import VedaCraft from "./Pages/VedaCraft"
import SuperAdmin from "./Pages/SuperAdmin"
import PrivacyPolicy from "./Pages/PrivacyPolicy"
import RefundPolicy from "./Pages/RefundPolicy"
import TermsAndConditions from "./Pages/TermsAndConditions"
import ScrollToTop from "./Components/ScrollToTop"


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<VedaCraft />} />
            <Route path="/superadmin" element={<SuperAdmin />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App