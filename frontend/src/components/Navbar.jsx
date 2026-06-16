import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, Settings, LogIn, UserPlus, Store } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar" data-testid="nav-container">
      <div className="navbar-container">
        <Link 
          to="/" 
          className="nav-brand"
          data-testid="nav-brand"
        >
          <Store size={24} />
          <span>ShopGlow</span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            className={getNavLinkClass}
            data-testid="nav-home-btn"
          >
            Sản phẩm
          </NavLink>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={getNavLinkClass}
                  data-testid="nav-admin-btn"
                >
                  <Settings size={18} />
                  <span>Admin</span>
                </NavLink>
              )}

              <NavLink
                to="/cart"
                className={({ isActive }) => isActive ? 'nav-link nav-badge-container active' : 'nav-link nav-badge-container'}
                data-testid="nav-cart-btn"
              >
                <ShoppingCart size={18} />
                <span>Giỏ hàng</span>
                {cartItemsCount > 0 && (
                  <span className="nav-badge" data-testid="nav-cart-count">
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>

              <div className="user-info" data-testid="nav-user-section">
                <span 
                  className={`user-tag ${isAdmin ? 'admin' : ''}`} 
                  data-testid="nav-user-role"
                >
                  {isAdmin ? 'Admin' : 'User'}: {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-icon"
                  title="Đăng xuất"
                  data-testid="nav-logout-btn"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={getNavLinkClass}
                data-testid="nav-login-btn"
              >
                <LogIn size={18} />
                <span>Đăng nhập</span>
              </NavLink>
              <NavLink
                to="/register"
                className={getNavLinkClass}
                data-testid="nav-register-btn"
              >
                <UserPlus size={18} />
                <span>Đăng ký</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
