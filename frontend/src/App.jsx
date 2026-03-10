import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

import TestPage from "./pages/TestPage";
import AddQuestions from "./pages/AddQuestions";
import Submissions from "./pages/Submissions";

import Jobs from "./pages/Jobs";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/jobs" />
              )
            ) : (
              <Home />
            )
          }
        />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/:id"
          element={
            <ProtectedRoute role="candidate">
              <TestPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions/:id"
          element={
            <ProtectedRoute role="admin">
              <AddQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/submissions/:jobId"
          element={
            <ProtectedRoute role="admin">
              <Submissions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
