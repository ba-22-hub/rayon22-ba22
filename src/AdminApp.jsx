import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate, 
  Navigate
} from "react-router-dom";
import { useAuthor } from "./context/AuthorContext.jsx";

import AdminLogin from "./pages/dashboard/AdminLogin.jsx";
import UserTable from "./pages/dashboard/UserTable.jsx";
import ProductTable from "./pages/dashboard/ProductTable.jsx";
import MessagesDashboard from "./pages/dashboard/MessagesDashboard.jsx";
import RequestsDashboard from "./pages/dashboard/RequestsDashboard.jsx";

function AdminNavbar() {
  const { logout } = useAuthor()
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate('/admin')
  }

  return (
    <nav className="bg-rayonblue text-white p-4 flex justify-between items-center">
      {/* Liens de gauche */}
      <div className="space-x-4">
        <Link to="/admin/users" className="hover:underline">Utilisateurs</Link>
        <Link to="/admin/products" className="hover:underline">Produits</Link>
        <Link to="/admin/messages" className="hover:underline">Messages</Link>
        <Link to="/admin/requests" className="hover:underline">Demandes</Link>
      </div>

      {/* Bouton de déconnexion */}
      <button
        onClick={handleLogout}
        className="bg-red hover:bg-red-600 px-4 py-2 rounded-full font-bold"
      >
        ⏼
      </button>
    </nav>
  );
}

function AdminApp() {
  const { isAdmin, loading} = useAuthor()
  if (loading) return (<p>Chargement... </p>)
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          {/* Routes protégées */}
         {/* Routes protégées */}
          {isAdmin && (
            <Route
              path="/admin/*"
              element={
                <>
                  <AdminNavbar />
                  <div className="p-4">
                    <Routes>
                      <Route path="users" element={<UserTable />} />
                      <Route path="products" element={<ProductTable />} />
                      <Route path="messages" element={<MessagesDashboard />} />
                      <Route path="requests" element={<RequestsDashboard />} />
                      <Route path="*" element={<p>404 - Page inconnue</p>} />
                    </Routes>
                  </div>
                </>
              }
            />
          )}

          {/* Si non-admin et tente d'accéder à une page protégée */}
          {!isAdmin && (
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default AdminApp;
