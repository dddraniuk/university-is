import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import StudentSearch from '../components/Students/StudentSearch';
import StudentTable from '../components/Students/StudentTable';
import StudentForm from '../components/Students/StudentForm';
import { groupsData, specialtiesData } from '../data/mockData';

function StudentsPage({ students, onAdd, onDelete }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesGroup = !filterGroup || student.group === filterGroup;

    return matchesSearch && matchesGroup;
  });

  const handleAddStudent = (newStudent) => {
    onAdd(newStudent);
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ flex: 1, minWidth: '260px' }}>
            <StudentSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterGroup={filterGroup}
              onFilterChange={setFilterGroup}
              groups={groupsData}
            />
          </div>

          <Button
            text={showForm ? 'Сховати форму' : '+ Додати студента'}
            type={showForm ? 'secondary' : 'primary'}
            onClick={() => setShowForm(prev => !prev)}
          />
        </div>
      </Card>

      {showForm && (
        <Card title="Новий студент">
          <StudentForm
            onAdd={handleAddStudent}
            onCancel={() => setShowForm(false)}
            groups={groupsData}
            specialties={specialtiesData}
          />
        </Card>
      )}

      <Card title="Список студентів">
        <StudentTable
          students={filteredStudents}
          onDelete={onDelete}
        />
      </Card>
    </div>
  );
}

export default StudentsPage;