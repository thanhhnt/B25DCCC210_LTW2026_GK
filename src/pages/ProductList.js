import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onDelete, onUpdateStock }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const { state } = useLocation();
  const message = state?.message;
  const [notice, setNotice] = useState(message || '');

  useEffect(() => {
    if (!message) return;
    setNotice(message);
    const timer = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === 'Tất cả' || p.category === category)
  );

  return (
    <div>
      {notice && (
        <div className="notice">
          <span>{notice}</span>
          <button onClick={() => setNotice('')}>×</button>
        </div>
      )}
      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />
      <p>Tìm thấy {filtered.length} sản phẩm</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <ProductTable
          products={filtered}
          onDelete={onDelete}
          onUpdateStock={onUpdateStock}
        />
      )}
    </div>
  );
};

export default ProductList;
