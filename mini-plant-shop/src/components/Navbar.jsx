import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-darkGreen shadow-lg">
      <Link to="/" className="text-2xl font-bold text-green-400">🌿 FloraVision</Link>

      <div className="space-x-8 hidden md:flex">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/product" className="hover:text-green-400">Plants Type</Link>
        <Link to="#" className="hover:text-green-400">More</Link>
        <Link to="#" className="hover:text-green-400">Contact</Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/login" className="hover:text-green-400">Login</Link>
      </div>
    </nav>
  );
}
