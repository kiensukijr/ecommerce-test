import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import Modal from '../components/Modal';

const AdminDashboard = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Không thể tải danh sách sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setCategory('Electronics');
    setImage('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setImage(product.image);
    setDescription(product.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}"?`)) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: getHeaders(),
        });

        if (res.ok) {
          showToast('Xóa sản phẩm thành công!', 'success');
          fetchProducts();
        } else {
          const data = await res.json();
          showToast(data.message || 'Xóa sản phẩm thất bại', 'error');
        }
      } catch (err) {
        showToast('Lỗi kết nối máy chủ', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      showToast('Vui lòng nhập tên và giá sản phẩm.', 'error');
      return;
    }

    const productData = {
      name,
      price: parseFloat(price),
      category,
      image: image || undefined,
      description,
    };

    try {
      let res;
      if (editingProduct) {
        // Update product (PUT)
        res = await fetch(`/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(productData),
        });
      } else {
        // Create product (POST)
        res = await fetch('/api/products', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(productData),
        });
      }

      const data = await res.json();

      if (res.ok) {
        showToast(
          editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm thành công!',
          'success'
        );
        setIsModalOpen(false);
        fetchProducts();
      } else {
        showToast(data.message || 'Lưu sản phẩm thất bại', 'error');
      }
    } catch (err) {
      showToast('Lỗi kết nối máy chủ', 'error');
    }
  };

  return (
    <div data-testid="admin-page">
      <div className="admin-header">
        <h1 className="page-title" data-testid="admin-title">Quản lý sản phẩm</h1>
        <button
          onClick={openCreateModal}
          className="btn btn-primary"
          data-testid="admin-create-btn"
        >
          <Plus size={18} />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner" data-testid="admin-loading"></div>
      ) : products.length === 0 ? (
        <div className="text-center p-4" data-testid="admin-empty-msg">
          <p style={{ color: 'var(--text-muted)' }}>Chưa có sản phẩm nào trong cửa hàng.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table" data-testid="admin-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} data-testid={`admin-product-row-${product._id}`}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-table-img"
                      data-testid={`admin-product-image-${product._id}`}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }} data-testid={`admin-product-name-${product._id}`}>
                    {product.name}
                  </td>
                  <td data-testid={`admin-product-category-${product._id}`}>
                    {product.category}
                  </td>
                  <td data-testid={`admin-product-price-${product._id}`}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td>
                    <div className="admin-actions-cell" style={{ justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => openEditModal(product)}
                        className="btn btn-secondary btn-icon"
                        data-testid={`admin-edit-btn-${product._id}`}
                        title="Sửa sản phẩm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="btn btn-danger btn-icon"
                        data-testid={`admin-delete-btn-${product._id}`}
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm mới'}
        testIdPrefix="product-form-modal"
      >
        <form onSubmit={handleSubmit} data-testid="product-form">
          <div className="form-group">
            <label className="form-label" htmlFor="product-form-name">Tên sản phẩm</label>
            <input
              type="text"
              id="product-form-name"
              className="form-control"
              placeholder="Ví dụ: Tai nghe Bluetooth"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="product-form-name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="product-form-price">Giá bán ($)</label>
            <input
              type="number"
              id="product-form-price"
              className="form-control"
              placeholder="Ví dụ: 99.99"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              data-testid="product-form-price"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="product-form-category">Danh mục</label>
            <select
              id="product-form-category"
              className="form-control form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="product-form-category"
            >
              <option value="Electronics">Electronics (Điện tử)</option>
              <option value="Wearables">Wearables (Đồ đeo)</option>
              <option value="Accessories">Accessories (Phụ kiện)</option>
              <option value="Home">Home (Nhà cửa)</option>
              <option value="General">General (Khác)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="product-form-image">Đường dẫn ảnh (Image URL)</label>
            <input
              type="url"
              id="product-form-image"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              data-testid="product-form-image"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="product-form-description">Mô tả sản phẩm</label>
            <textarea
              id="product-form-description"
              className="form-control"
              placeholder="Nhập mô tả sản phẩm..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="product-form-description"
            ></textarea>
          </div>

          <div className="flex gap-2 justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
              data-testid="product-form-cancel"
              style={{ flex: 1 }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              data-testid="product-form-submit"
              style={{ flex: 1 }}
            >
              <Save size={18} />
              <span>{editingProduct ? 'Cập nhật' : 'Thêm mới'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
