import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Home = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        
        // Extract unique categories
        const cats = ['All', ...new Set(data.map((p) => p.category))];
        setCategories(cats);
      } else {
        showToast('Không thể tải danh sách sản phẩm', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Có lỗi xảy ra khi tải sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div data-testid="home-page">
      <div className="page-header">
        <h1 className="page-title" data-testid="home-title">Sản phẩm nổi bật</h1>

        <div className="filter-bar">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="search-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '0.85rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-muted)' 
              }} 
            />
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} style={{ color: 'var(--text-muted)' }} />
            <select
              className="form-control form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="category-filter"
              style={{ minWidth: '150px' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'Tất cả danh mục' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner" data-testid="products-loading"></div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-4" data-testid="no-products-msg">
          <p style={{ color: 'var(--text-muted)' }}>Không tìm thấy sản phẩm nào phù hợp.</p>
        </div>
      ) : (
        <div className="product-grid" data-testid="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showToast={showToast}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
