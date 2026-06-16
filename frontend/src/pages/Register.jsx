import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = ({ showToast }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast('Vui lòng điền đầy đủ thông tin.', 'error');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      showToast('Đăng ký tài khoản thành công!', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Đăng ký thất bại. Email có thể đã tồn tại.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" data-testid="register-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Đăng ký</h2>
          <p>Tạo tài khoản mua sắm và kiểm thử</p>
        </div>

        <form onSubmit={handleSubmit} data-testid="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Họ tên</label>
            <input
              type="text"
              id="register-name"
              className="form-control"
              placeholder="Nguyen Van A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="register-name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="register-email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Mật khẩu</label>
            <input
              type="password"
              id="register-password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="register-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-btn"
            data-testid="register-submit"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản?{' '}
          <Link
            to="/login"
            data-testid="login-link"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
