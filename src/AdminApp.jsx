// Importing dependencies
import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useAuthor } from "./context/AuthorContext.jsx";
import { ReactNotifications } from 'react-notifications-component'

// Importing pages
import AdminLogin from "./pages/dashboard/AdminLogin.jsx";
import UserTable from "./pages/dashboard/UserTable.jsx";
import ProductTable from "./pages/dashboard/ProductTable.jsx";
import MessagesDashboard from "./pages/dashboard/MessagesDashboard.jsx";
import RequestsDashboard from "./pages/dashboard/RequestsDashboard.jsx";
import OrderTable from "./pages/dashboard/OrderTable.jsx";

// Importing common components
import PageButton from "./common/PageButton.jsx";
import Loading from "./common/Loading.jsx";

function AdminNavbar() {
  const { logout } = useAuthor();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  return (
    <nav className="bg-rayonblue text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/admin/users" className="hover:underline">Utilisateurs</Link>
        <Link to="/admin/products" className="hover:underline">Produits</Link>
        <Link to="/admin/messages" className="hover:underline">Messages</Link>
        <Link to="/admin/requests" className="hover:underline">Demandes</Link>
        <Link to="/admin/orders" className="hover:underline">Commandes</Link>
      </div>
      <div className="flex items-center space-x-4">
        <PageButton
          buttonText='Rayon'
          page='/'
          className='w-[60px] h-10 bg-[#FF8200] text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition' />
        <button
          onClick={handleLogout}
          className="bg-red hover:bg-red-600 px-4 py-2 rounded-full font-bold"
        >
          ⏼
        </button>
      </div>
    </nav>
  );
}

// We need to use this layout to have a single Route in the component
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

function AdminApp() {
  const { isAdmin, loading } = useAuthor();
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100">
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {isAdmin && (
          <Route path="/*" element={<AdminLayout />}>
            <Route path="users" element={<UserTable />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="messages" element={<MessagesDashboard />} />
            <Route path="requests" element={<RequestsDashboard />} />
            <Route path="orders" element={<OrderTable />} />
            <Route path="*" element={<p>404 - Page inconnue</p>} />
          </Route>
        )}
        {!isAdmin && (
          <Route path="*" element={<Navigate to="/admin" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default AdminApp;
