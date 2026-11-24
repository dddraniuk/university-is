import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import { studentsData } from './data/mockData';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [students, setStudents] = useState(studentsData);

  const handleAdd = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div
      className="app"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px'
        }}
      >
        {activePage === 'dashboard' ? (
          <DashboardPage />
        ) : (
          <StudentsPage
            students={students}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;