import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

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
