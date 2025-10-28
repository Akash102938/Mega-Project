import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f160f] text-white py-12 px-6 border-t-4 border-yellow-500">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-sm">
        
        {/* Left Section - Logo and Description */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/766/766204.png"
              alt="Plant Logo"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-lg font-semibold">FloraVision.</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            "From lush indoor greens to vibrant outdoor blooms, our plants are
            crafted to thrive and elevate your living environment."
          </p>
          <div className="flex gap-5 mt-4 font-semibold">
            <a href="#" className="hover:text-yellow-400 transition">FB</a>
            <a href="#" className="hover:text-yellow-400 transition">TW</a>
            <a href="#" className="hover:text-yellow-400 transition">LI</a>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">Quick Link’s</h3>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400 underline">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 underline">Type’s Of plant’s</a></li>
            <li><a href="#" className="hover:text-yellow-400 underline">Contact</a></li>
            <li><a href="#" className="hover:text-yellow-400 underline">Privacy</a></li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div>
          <h3 className="text-base font-semibold mb-4">For Every Update.</h3>
          <form className="flex items-center border border-white rounded overflow-hidden w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter Email"
              className="flex-1 bg-transparent px-3 py-2 text-gray-200 outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold px-4 py-2 hover:bg-yellow-400 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-xs mt-10">
        FloraVision © all right reserve
      </div>
    </footer>
  );
}

export default Footer;
