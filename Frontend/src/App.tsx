import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart/:id" element={<Cart />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;