import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {Routes,Route} from react-router-dom;
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App
