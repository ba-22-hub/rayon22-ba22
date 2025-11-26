// Importing dependencies
import {
  BrowserRouter as Router, // HashRouter for the electron built app
  Routes,
  Route
} from "react-router-dom";

// Importing the main app components
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";

// Importing the CookiePopup component
import CookiePopup from "@common/CookiePopup.jsx";

export default function Root() {
  return (
    <Router>
      <CookiePopup />
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}
