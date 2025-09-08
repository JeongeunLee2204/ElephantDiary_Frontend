import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Write from "./pages/Write";
import List from "./pages/List";
import PrivateRoute from "./components/privateRoute";
import Edit from "./pages/Edit";
import View from "./pages/View";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* 공개 페이지 */}
      <Route path="/" element={<Home />} />
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

      {/* 보기 / 수정 */}
      <Route
        path="/diary/:id"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <View />
          </PrivateRoute>
        }
      />
      <Route
        path="/diary/:id/edit"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Edit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
