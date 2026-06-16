import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AppContent = () => {
  const [toasts, setToasts] = useState([]);
  const { user, isAdmin, loading } = useAuth();

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  if (loading) {
    return (
      <div 
        style={{ 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#09090b',
          color: '#fafafa'
        }}
        data-testid="app-loading"
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Auth & Admin Guard components
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const AdminRoute = ({ children }) => {
    return user && isAdmin ? (
      children
    ) : (
      <div className="text-center p-4" data-testid="unauthorized-view" style={{ marginTop: '4rem' }}>
        <ShieldAlert size={64} style={{ color: 'var(--error)', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Không có quyền truy cập</h2>
        <p style={{ color: 'var(--text-muted)' }}>Bạn phải là Quản trị viên (Admin) để xem trang này.</p>
      </div>
    );
  };

  return (
    <div className="app-container" data-testid="app-container">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart showToast={showToast} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard showToast={showToast} />
                </AdminRoute>
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login showToast={showToast} />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register showToast={showToast} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modern custom toast alerts container */}
      <div className="toast-container" data-testid="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast ${toast.type}`}
            data-testid={`toast-${toast.type}`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
