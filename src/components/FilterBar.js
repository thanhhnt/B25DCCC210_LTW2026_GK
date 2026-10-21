import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filter-bar">
    <label htmlFor="search">Tìm kiếm</label>
    <input id="search" type="text" value={query} onChange={onQueryChange} />
    <label htmlFor="filter-category">Danh mục</label>
    <select id="filter-category" value={category} onChange={onCategoryChange}>
      <option value="Tất cả">Tất cả</option>
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;
