import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import RefreshHandler from "./RefreshHandler.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      {/* Pass setIsAuthenticated as a prop to RefreshHandler */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={"login"} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
