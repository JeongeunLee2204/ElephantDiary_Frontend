import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Write from "./pages/Write";
import List from "./pages/List";
import Navbar from "./components/navbar";
import PrivateRoute from "./components/privateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <>
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 보호 페이지 */}
        <Route
          path="/mypage"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/write"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Write />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <List />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
