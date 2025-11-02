import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import CheckoutRedirect from "./Pages/CheckoutRedirect"
import Cancel from "./Pages/Cancel"
import Success from "./Pages/Success"
import Plans from "./Pages/Plans"

function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<CheckoutRedirect />} />
        <Route path="/checkout-redirect" element={<CheckoutRedirect />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  )
}

export default App
