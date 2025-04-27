import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

// Importing the style
import './styles/App.css'

// Importing all the pages
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Catalaog from './pages/Catalog.jsx'
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
          <nav>
              <ul>
                  <li>
                      <Link to="/about">Qui somme-nous ?</Link>
                  </li>
                  <li>
                      <Link to="/how-it-works">Comment ça marche ?</Link>
                  </li>
                  <li>
                        Commander
                        <ul>
                            <li>
                                 <Link to="/catalog">Catalogue de porduits</Link>
                            </li>
                            <li>
                                 <Link to="/cart">Mon panier</Link>
                            </li>
                        </ul>
                  </li>
                  <li>
                      <Link to="/more">Toujours plus</Link>
                  </li>
                  <li>
                      <Link to="/contact">Nous contacter</Link>
                  </li>
                  <li>
                      <Link to="/register">Inscription</Link>
                  </li>
                  <li>
                      <Link to="/login">Connection</Link>
                  </li>
                  <li>
                      <Link to="/sponsor">Sponsors</Link>
                  </li>
                  <li>
                      <Link to="/news">Actualité</Link>
                  </li>
              </ul>
          </nav>

          {/*Implementing Routes for respective Path */}

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/catalog" element={<Catalaog />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/how-it-works" element={<HowItWorks />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/more" element={<More />}/>
              <Route path="/news" element={<News />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/sponsor" element={<Sponsor />}/>
          </Routes>
      </Router>
  );
}

export default App
