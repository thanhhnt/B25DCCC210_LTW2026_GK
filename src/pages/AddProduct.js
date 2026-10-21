import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    stock: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, price, stock } = form;
    if (!name.trim() || price === '' || stock === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (!(priceNum > 0) || !Number.isInteger(stockNum) || stockNum < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }
    const cleanName = name.trim();
    onAdd({ name: cleanName, category, price: priceNum, stock: stockNum });
    const message = `Đã thêm sản phẩm ${cleanName}`;
    navigate('/products', { replace: true, state: { message } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Tên sản phẩm</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label htmlFor="category">Danh mục</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="price">Giá</label>
        <input id="price" name="price" type="number" value={form.price} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label htmlFor="stock">Số lượng tồn</label>
        <input id="stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
      </div>
      <button type="submit">Thêm</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddProduct;
