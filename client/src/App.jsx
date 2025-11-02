import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import SingleCheckout from "./Pages/SingleCheckout"
import Cancel from "./Pages/Cancel"
import Success from "./Pages/Success"
import Plans from "./Pages/Plans"
import ProductCheckoutPage from "./Pages/ProductCheckoutPage"

function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<SingleCheckout />} />
        <Route path="/single-checkout" element={<SingleCheckout />} />
        <Route path="/multi-checkout" element={<ProductCheckoutPage />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  )
}

export default App
