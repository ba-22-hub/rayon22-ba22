import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

// Importing the style
import './styles/navbar.css'

// Importing all the pages
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Catalog from './pages/Catalog.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Login from './pages/Login.jsx'
import More from './pages/More.jsx'
import News from './pages/News.jsx'
import Register from './pages/Register.jsx'
import Sponsor from './pages/Sponsor.jsx'

function App() {
    return (
        <Router>
          <nav className="navbar">
            <ul className="navbar-menu">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">Qui sommes-nous ?</Link></li>
              <li><Link to="/how-it-works">Comment ça marche ?</Link></li>
              
              <li className="dropdown">
                <span className="dropdown-title">Commander</span>
                <ul className="dropdown-menu">
                  <li><Link to="/catalog">Catalogue de produits</Link></li>
                  <li><Link to="/cart">Mon panier</Link></li>
                </ul>
              </li>
    
              <li><Link to="/more">Toujours plus</Link></li>
              <li><Link to="/contact">Nous contacter</Link></li>
              <li><Link to="/register">Inscription</Link></li>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/sponsor">Sponsors</Link></li>
              <li><Link to="/news">Actualité</Link></li>
            </ul>
          </nav>
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/more" element={<More />} />
            <Route path="/news" element={<News />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sponsor" element={<Sponsor />} />
          </Routes>
        </Router>
      );
}

export default App
