import React, { useState } from 'react';

// 3. StudentItem Component (Hiển thị từng dòng sinh viên)
const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, studentClass } = student; // Destructuring assignment

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{studentClass}</td>
      <td>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

// 2. StudentList Component (Hiển thị danh sách dạng bảng)
const StudentList = ({ students, onDelete }) => {
  return (
    <table border="1" style={{ width: '100%', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm số</th>
          <th>Lớp</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

// 1. App Component (Component cha quản lý state)
const App = () => {
  // Mảng dữ liệu mẫu ban đầu (tối thiểu 3 sinh viên)
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', score: 8.5, studentClass: 'DTCQT01' },
    { id: 2, name: 'Trần Thị B', score: 4.0, studentClass: 'DTCQT01' },
    { id: 3, name: 'Lê Văn C', score: 6.5, studentClass: 'DTCQT02' },
  ]);

  // State cho form thêm sinh viên mới[cite: 1]
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  // State cho bộ lọc (ALL, GOOD, FAIL)
  const [filterType, setFilterType] = useState('ALL');

  // Hàm thêm sinh viên mới có ràng buộc dữ liệu[cite: 1]
  const handleAddStudent = (e) => {
    e.preventDefault();
    
    // Kiểm tra để trống hoặc điểm số không hợp lệ[cite: 1]
    if (!name.trim() || score === '' || !studentClass.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const numScore = parseFloat(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError('Điểm số không hợp lệ (phải từ 0 đến 10)!'); //[cite: 1]
      return;
    }

    setError(''); // Xóa lỗi nếu hợp lệ
    const newStudent = {
      id: Date.now(), // Tạo ID duy nhất
      name,
      score: numScore,
      studentClass,
    };

    // Cập nhật danh sách, không làm mất dữ liệu cũ[cite: 1]
    setStudents((prevStudents) => [...prevStudents, newStudent]);

    // Reset form
    setName('');
    setScore('');
    setStudentClass('');
  };

  // Hàm xóa sinh viên[cite: 2]
  const handleDelete = (id) => {
    const updatedList = students.filter((student) => student.id !== id);
    setStudents(updatedList);
  };

  // Tính năng lọc (Filter) sử dụng .filter()[cite: 2, 3]
  const filteredStudents = students.filter((student) => {
    if (filterType === 'GOOD') return student.score >= 8; // Loại Giỏi[cite: 2]
    if (filterType === 'FAIL') return student.score < 5;  // Trượt môn[cite: 2]
    return true; // ALL
  });

  // Thống kê cơ bản (Tổng số lượng và điểm trung bình) sử dụng .reduce()[cite: 2, 3]
  const totalStudents = students.length;
  const averageScore = totalStudents > 0 
    ? (students.reduce((sum, student) => sum + student.score, 0) / totalStudents).toFixed(2) 
    : 0;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      {/* Form thêm sinh viên mới[cite: 1] */}
      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px' }}>
        <h3>Thêm sinh viên mới</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            placeholder="Điểm số"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lớp"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>

      {/* Thống kê cơ bản[cite: 2] */}
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Tổng số lượng sinh viên:</strong> {totalStudents}</p>
        <p><strong>Điểm trung bình toàn lớp:</strong> {averageScore}</p>
      </div>

      {/* Nút bộ lọc (Filter)[cite: 2] */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setFilterType('ALL')}>Tất cả</button>
        <button onClick={() => setFilterType('GOOD')}>Giỏi (Điểm &gt;= 8)</button>
        <button onClick={() => setFilterType('FAIL')}>Trượt (Điểm &lt; 5)</button>
      </div>

      {/* Component hiển thị danh sách[cite: 2] */}
      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;