
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PasswordsPage from './pages/PasswordsPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>

        {/* Simple Navigation 
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/passwords" className="text-blue-500 hover:underline">Passwords</Link>
            </li>
          </ul>
        </nav> */}

        {/* Define Routes */}
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/passwords" element={<ProtectedRoute><PasswordsPage /></ProtectedRoute>} />
        </Routes>

      </Router>
    </AuthProvider>
  );
}
