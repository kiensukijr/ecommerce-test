import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ showToast }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Vui lòng điền đầy đủ thông tin.', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('Đăng nhập thành công!', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Sai email hoặc mật khẩu', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Đăng nhập</h2>
          <p>Chào mừng bạn trở lại ShopGlow</p>
        </div>

        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="login-email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Mật khẩu</label>
            <input
              type="password"
              id="login-password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="login-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-btn"
            data-testid="login-submit"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="auth-footer">
          Chưa có tài khoản?{' '}
          <Link
            to="/register"
            data-testid="register-link"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
