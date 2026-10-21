const BUILD_TAG = "kt-6641";
/* eslint-disable import/first */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const STORAGE_KEY = 'gk_products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mounting: đọc localStorage, nếu không có thì gọi API
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
        setLoading(false);
        return;
      } catch (e) {
        // dữ liệu lưu hỏng -> gọi API
      }
    }
    const controller = new AbortController();
    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // Unmounting: bỏ qua
        setError('Không tải được dữ liệu');
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  // Updating: lưu dữ liệu khi đã tải xong
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loading, error]);

  const addProduct = (data) => {
    const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    setProducts([...products, { id, ...data }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateStock = (id, delta) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home products={products} />} />
        <Route
          path="products"
          element={
            <ProductList
              products={products}
              onDelete={deleteProduct}
              onUpdateStock={updateStock}
            />
          }
        />
        <Route path="products/new" element={<AddProduct onAdd={addProduct} />} />
        <Route path="products/:id" element={<ProductDetail products={products} />} />
      </Route>
    </Routes>
  );
};

export { BUILD_TAG };
export default App;
