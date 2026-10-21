import { formatMoney } from '../data';

const Home = ({ products }) => {
  const total = products.length;
  const lowStock = products.filter((p) => p.stock < 5).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div>
      <h1>Kho hàng</h1>
      <p>Tổng số sản phẩm: {total}</p>
      <p>Số sản phẩm sắp hết hàng: {lowStock}</p>
      <p>Tổng giá trị kho: {formatMoney(totalValue)}</p>
    </div>
  );
};

export default Home;
