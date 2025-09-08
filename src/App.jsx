import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/LoginForm.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
