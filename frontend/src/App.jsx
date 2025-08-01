// Importing dependencies
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

import { useAuthor } from "./context/AuthorContext.jsx";

// Importing the style
import './styles/navbar.css'


// Importing assets
import rayonLogo from "./assets/logos/roundLogo.png"
import banqueLogo from "./assets/logos/banquesAlimentaires.png"
import avatar from "./assets/Assets/avatar2.png"

// Importing all the pages
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Catalog from './pages/Catalog.jsx'
import Contact from './pages/Contact.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Login from './pages/Login.jsx'
import More from './pages/More.jsx'
import News from './pages/News.jsx'
import Register from './pages/Register.jsx'
import Sponsor from './pages/Sponsor.jsx'
import Account from "./pages/Account.jsx";  
import AdminLogin from "./pages/dashboard/AdminLogin.jsx";
import UserTable from "./pages/dashboard/UserTable.jsx";  
import ProductTable from "./pages/dashboard/ProductTable.jsx";

// Importing common components
import Footer from "./common/Footer.jsx";

/**
 * A component wrapping all the website pages.
 * @returns {React.ReactElement} App component.
 */
function App() {
    const {user} = useAuthor()
    return (
      <div className="min-h-screen bg-[#FEF7F1]">
        <Router>

          {/* Horizontal navigation bar to choose the page of the website we want to visit */}
          <nav className="bg-white shadow-lg border-b border-gray-200 mb-8 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img src={rayonLogo} alt="RAYON logo" className="h-10 w-10" />
                  </Link>
                </div>
                
                {/* Navigation Links */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    <Link to="/about" className="text-[#3435FF] hover:text-[#5253ff] px-3 py-2 text-sm font-medium transition-colors">
                      Qui sommes-nous ?
                    </Link>
                    <Link to="/how-it-works" className="text-[#3435FF] hover:text-[#5253ff] px-3 py-2 text-sm font-medium transition-colors">
                      Comment ça marche ?
                    </Link>
                    <Link to="/catalog" className="text-[#3435FF] hover:text-[#5253ff] px-3 py-2 text-sm font-medium transition-colors">
                      Nos produits
                    </Link>
                    <Link to="/more" className="text-[#3435FF] hover:text-[#5253ff] px-3 py-2 text-sm font-medium transition-colors">
                      Toujours plus
                    </Link>
                    <Link to="/contact" className="text-[#3435FF] hover:text-[#5253ff] px-3 py-2 text-sm font-medium transition-colors">
                      Nous contacter
                    </Link>
                  </div>
                </div>
                
                {/* Right side - Inscription button and Avatar */}
                <div className="flex items-center space-x-4">
                  <Link to="/register" className="bg-[#FF8200] hover:bg-[#ff9800] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors h-10 flex items-center">
                    S'inscrire
                  </Link>
                  <Link to={`${user ? '/account' : '/login'}`} className="flex-shrink-0">
                    <div className="bg-[#FF8200] p-1 rounded-lg h-10 w-10 flex items-center justify-center">
                      <img src={avatar} alt="User avatar" className="h-8 w-8 rounded-full" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Creating the routes to the website pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/more" element={<More />} />
            <Route path="/news" element={<News />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard/user-table" element={<UserTable />} />
            <Route path="/dashboard/product-table" element={<ProductTable/>} />
            {/* Redirecting to Error404 page if the route does not exist */}
            <Route path="*" element={<div className="text-center mt-20 text-2xl">Page not found</div>} />
          </Routes>
        </Router>

        <div className="bg-[#FEF7F1]">
          <Footer></Footer>
        </div>
      </div>
      );
}

export default App
