import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
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
