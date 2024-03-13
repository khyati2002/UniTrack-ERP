import { Link } from "react-router-dom"
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <div className="nav-items bg-gray-100 ">
    <button onClick={toggleMenu} className="block md:hidden text-lg p-4">
      <img src={LOGO_URL} alt="Menu"></img>
    </button>

    <ul className={`flex flex-col md:flex-row align-middle ${isMenuOpen ? 'block' : 'hidden'}`}>
      <li className="md:m-4 md:mt-2 p-4 mb-0"><img className="w-8 h-8 md:w-32 md:h-14 border border-black" src="https://i.imgur.com/pMWgY6N.png" alt="logo"></img></li>
      <li className="md:m-4 p-4 text-lg"><Link to="/">Dashboard</Link></li>
      <li className="md:m-4 p-4 text-lg "><Link to="/products">Products</Link></li>
      <li className="md:m-4 p-4 text-lg "><Link to="/orders">Orders</Link></li>
      <li className="md:m-4 p-4 text-lg "><Link to="/calendar"><img className="w-7 h-7" src="https://uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/package-delivery-status-time-icon.png" alt="Calendar"></img></Link></li>
    </ul>

  </div>
}

export default Header