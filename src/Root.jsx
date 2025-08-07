// Importing dependencies
import {
  HashRouter as Router, // HashRouter for the electron built app
  Routes,
  Route
} from "react-router-dom";

// Importing the main app components
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}
