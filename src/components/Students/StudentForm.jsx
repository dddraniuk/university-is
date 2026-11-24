import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './StudentForm.css';

function StudentForm({ onAdd, onCancel, groups, specialties }) {
  const initialFormData = {
    name: '',
    email: '',
    group: '',
    specialty: '',
    year: '',
    gpa: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Ім'я повинно містити щонайменше 3 символи";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введіть коректний email";
    }

    if (!formData.group) {
      newErrors.group = "Виберіть групу";
    }

    if (!formData.specialty) {
      newErrors.specialty = "Виберіть спеціальність";
    }

    if (!formData.year) {
      newErrors.year = "Виберіть курс";
    }

    if (!formData.gpa) {
      newErrors.gpa = "Введіть GPA";
    } else if (
      isNaN(formData.gpa) ||
      Number(formData.gpa) < 0 ||
      Number(formData.gpa) > 5
    ) {
      newErrors.gpa = "GPA повинен бути числом від 0 до 5";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      group: formData.group,
      specialty: formData.specialty,
      year: parseInt(formData.year, 10),
      gpa: parseFloat(formData.gpa),
      status: 'active',
      enrollmentDate: new Date().toISOString().split('T')[0],
      avatar: formData.name
        .trim()
        .split(/\s+/)
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    };

    onAdd(newStudent);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="student-form-grid">
        <Input
          label="Повне ім'я"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Іван Петренко"
          error={errors.name}
          required
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="ivan@university.edu"
          error={errors.email}
          required
        />

        <div className="form-field">
          <label className="form-label">
            Група <span className="form-required">*</span>
          </label>
          <select
            className={`form-select ${errors.group ? 'form-select-error' : ''}`}
            value={formData.group}
            onChange={handleChange('group')}
          >
            <option value="">Виберіть групу</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.group && (
            <span className="form-error">{errors.group}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Спеціальність <span className="form-required">*</span>
          </label>
          <select
            className={`form-select ${errors.specialty ? 'form-select-error' : ''}`}
            value={formData.specialty}
            onChange={handleChange('specialty')}
          >
            <option value="">Виберіть спеціальність</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {errors.specialty && (
            <span className="form-error">{errors.specialty}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Курс <span className="form-required">*</span>
          </label>
          <select
            className={`form-select ${errors.year ? 'form-select-error' : ''}`}
            value={formData.year}
            onChange={handleChange('year')}
          >
            <option value="">Виберіть курс</option>
            <option value="1">1 курс</option>
            <option value="2">2 курс</option>
            <option value="3">3 курс</option>
            <option value="4">4 курс</option>
          </select>
          {errors.year && (
            <span className="form-error">{errors.year}</span>
          )}
        </div>

        <Input
          label="Середній бал (GPA)"
          type="number"
          value={formData.gpa}
          onChange={handleChange('gpa')}
          placeholder="4.5"
          error={errors.gpa}
          required
        />
      </div>

      <div className="student-form-actions">
        <Button text="Додати студента" type="primary" />
        {onCancel && (
          <Button
            text="Скасувати"
            type="secondary"
            onClick={onCancel}
          />
        )}
      </div>
    </form>
  );
}

export default StudentForm;