import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';

const Cart = ({ showToast }) => {
  const {
    cart,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
  } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleQtyChange = async (productId, currentQty, increment) => {
    try {
      const newQty = currentQty + increment;
      await updateQuantity(productId, newQty);
      showToast('Đã cập nhật số lượng!', 'success');
    } catch (error) {
      showToast(error.message || 'Lỗi cập nhật số lượng', 'error');
    }
  };

  const handleRemoveItem = async (productId, name) => {
    try {
      await removeFromCart(productId);
      showToast(`Đã xóa ${name} khỏi giỏ hàng!`, 'success');
    } catch (error) {
      showToast(error.message || 'Lỗi xóa sản phẩm', 'error');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      try {
        await clearCart();
        showToast('Đã xóa toàn bộ giỏ hàng!', 'success');
      } catch (error) {
        showToast(error.message || 'Lỗi xóa giỏ hàng', 'error');
      }
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      // Simulate API checkout request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await clearCart();
      showToast('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.', 'success');
      navigate('/');
    } catch (error) {
      showToast('Đặt hàng thất bại, vui lòng thử lại.', 'error');
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading && cart.items.length === 0) {
    return <div className="loading-spinner" data-testid="cart-loading"></div>;
  }

  const isEmpty = cart.items.length === 0;

  return (
    <div data-testid="cart-page">
      <h1 className="page-title mb-4" data-testid="cart-title">Giỏ hàng của bạn</h1>

      {isEmpty ? (
        <div className="empty-cart-view" data-testid="empty-cart-view">
          <ShoppingBag className="empty-cart-icon" />
          <h2>Giỏ hàng trống</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Bạn chưa thêm sản phẩm nào vào giỏ hàng.
          </p>
          <Link
            to="/"
            className="btn btn-primary"
            data-testid="cart-back-to-shop-btn"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list" data-testid="cart-items-list">
            {cart.items.map((item) => {
              const product = item.productId;
              // Handle potential null products if they were deleted by admin
              if (!product) return null;

              return (
                <div
                  key={product._id}
                  className="cart-item"
                  data-testid={`cart-item-${product._id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item-img"
                    data-testid={`cart-item-image-${product._id}`}
                  />

                  <div className="cart-item-details">
                    <span
                      className="cart-item-name"
                      data-testid={`cart-item-name-${product._id}`}
                    >
                      {product.name}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Danh mục: {product.category}
                    </span>
                    <span
                      className="cart-item-price"
                      data-testid={`cart-item-price-${product._id}`}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controller">
                      <button
                        onClick={() => handleQtyChange(product._id, item.quantity, -1)}
                        className="quantity-btn"
                        data-testid={`cart-quantity-dec-${product._id}`}
                        title="Giảm số lượng"
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        className="quantity-val"
                        data-testid={`cart-quantity-val-${product._id}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product._id, item.quantity, 1)}
                        className="quantity-btn"
                        data-testid={`cart-quantity-inc-${product._id}`}
                        title="Tăng số lượng"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(product._id, product.name)}
                      className="btn btn-danger btn-icon"
                      data-testid={`cart-remove-${product._id}`}
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleClearCart}
              className="btn btn-secondary"
              data-testid="cart-clear-btn"
              style={{ alignSelf: 'flex-start' }}
            >
              <Trash2 size={16} />
              <span>Xóa toàn bộ giỏ hàng</span>
            </button>
          </div>

          <div className="cart-summary-card" data-testid="cart-summary-card">
            <h3 className="summary-title">Tóm tắt đơn hàng</h3>
            
            <div className="summary-row">
              <span>Tạm tính</span>
              <span data-testid="cart-subtotal">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>

            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span data-testid="cart-total">${cartSubtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn btn-primary checkout-btn"
              data-testid="cart-checkout-btn"
            >
              <CreditCard size={18} />
              <span>{checkingOut ? 'Đang thanh toán...' : 'Thanh toán ngay'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
