import React, { useState } from 'react';
import './AppointmentsPage.css';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  email: string;
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmată' | 'În așteptare' | 'Anulată';
}

const AppointmentsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    doctorId: '',
    specialization: '',
    date: '',
    time: '',
    reason: ''
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Ion Ionescu', specialization: 'Cardiologie' },
    { id: 2, name: 'Dr. Ana Vasilescu', specialization: 'Pediatrie' },
    { id: 3, name: 'Dr. George Popescu', specialization: 'Medicina Generală' },
    { id: 4, name: 'Dr. Maria Gheorghiu', specialization: 'Dermatologie' },
    { id: 5, name: 'Dr. Andrei Munteanu', specialization: 'Neurologie' }
  ];

  const specializations = [
    'Cardiologie',
    'Pediatrie',
    'Medicina Generală',
    'Dermatologie',
    'Neurologie',
    'Ortopedie',
    'ORL',
    'Oftalmologie'
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(d => d.id === parseInt(doctorId));

    setFormData(prev => ({
      ...prev,
      doctorId,
      specialization: selectedDoctor ? selectedDoctor.specialization : ''
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.patientName.trim()) {
      alert('Vă rugăm introduceți numele pacientului');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Vă rugăm introduceți numărul de telefon');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Vă rugăm introduceți un email valid');
      return false;
    }
    if (!formData.doctorId) {
      alert('Vă rugăm selectați un medic');
      return false;
    }
    if (!formData.specialization) {
      alert('Vă rugăm selectați o specializare');
      return false;
    }
    if (!formData.date) {
      alert('Vă rugăm selectați o dată');
      return false;
    }
    if (!formData.time) {
      alert('Vă rugăm selectați o oră');
      return false;
    }
    if (!formData.reason.trim()) {
      alert('Vă rugăm introduceți motivul programării');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));

    const newAppointment: Appointment = {
      id: Date.now(),
      patientName: formData.patientName,
      phone: formData.phone,
      email: formData.email,
      doctor: selectedDoctor?.name || '',
      specialization: formData.specialization,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'În așteptare'
    };

    setAppointments(prev => [...prev, newAppointment]);

    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      doctorId: '',
      specialization: '',
      date: '',
      time: '',
      reason: ''
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const handleCancelAppointment = (id: number) => {
    if (window.confirm('Sigur doriți să anulați această programare?')) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === id ? { ...apt, status: 'Anulată' as const } : apt
        )
      );
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <h1 className="page-title">Programare Online</h1>

        {showSuccess && (
          <div className="success-message">
            ✅ Programare creată cu succes! Veți primi o confirmare pe email.
          </div>
        )}

        <div className="form-card">
          <h2 className="section-title">Completați formularul de programare</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientName">Nume pacient *</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Ex: Ion Popescu"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: 0721234567"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ex: ion.popescu@email.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctorId">Selectează medicul *</label>
                <select
                  id="doctorId"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleDoctorChange}
                  required
                >
                  <option value="">-- Selectează medicul --</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Specializare *</label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Selectează specializarea --</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Data programării *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Ora disponibilă *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Selectează ora --</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Motivul programării *</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Descrieți pe scurt motivul vizitei..."
                rows={4}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Programează-te
            </button>
          </form>
        </div>

        {appointments.length > 0 && (
          <div className="appointments-list-card">
            <h2 className="section-title">Programările mele</h2>
            <div className="appointments-grid">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-header">
                    <h3>{appointment.patientName}</h3>
                    <span className={`status-badge status-${appointment.status.toLowerCase().replace(' ', '-')}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label"> Telefon:</span>
                      <span className="detail-value">{appointment.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">✉ Email:</span>
                      <span className="detail-value">{appointment.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">️Medic:</span>
                      <span className="detail-value">{appointment.doctor}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"> Specializare:</span>
                      <span className="detail-value">{appointment.specialization}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"> Data:</span>
                      <span className="detail-value">{appointment.date}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"> Ora:</span>
                      <span className="detail-value">{appointment.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"> Motiv:</span>
                      <span className="detail-value">{appointment.reason}</span>
                    </div>
                  </div>
                  {appointment.status !== 'Anulată' && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Anulează programarea
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
