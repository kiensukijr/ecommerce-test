import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Check } from 'lucide-react';

const ProductCard = ({ product, showToast }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', 'error');
      return;
    }

    setAdding(true);
    try {
      await addToCart(product._id, 1);
      showToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      showToast(error.message || 'Không thể thêm vào giỏ hàng', 'error');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card" data-testid={`product-card-${product._id}`}>
      <div className="product-image-container">
        <span className="product-category-badge" data-testid={`product-category-${product._id}`}>
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          data-testid={`product-image-${product._id}`}
        />
      </div>

      <div className="product-info">
        <h4 className="product-name" data-testid={`product-name-${product._id}`}>
          {product.name}
        </h4>
        <p className="product-description" data-testid={`product-description-${product._id}`}>
          {product.description || 'Không có mô tả sản phẩm.'}
        </p>

        <div className="product-footer">
          <span className="product-price" data-testid={`product-price-${product._id}`}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`btn btn-icon ${success ? 'btn-primary' : 'btn-secondary'}`}
            data-testid={`add-to-cart-${product._id}`}
            title="Thêm vào giỏ"
          >
            {success ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
