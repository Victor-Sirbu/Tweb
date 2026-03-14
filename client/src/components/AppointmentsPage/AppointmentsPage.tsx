import React, { useState } from 'react';
import './AppointmentsPage.css';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

interface Doctor {
  id: number;
  name: string;
  specializationKey: string;
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
  status: 'confirmed' | 'pending' | 'canceled';
}

const AppointmentsPage: React.FC = () => {
  const { t } = useLanguage();

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
    { id: 1, name: 'Dr. Ion Ionescu', specializationKey: 'apptSpecCardio' },
    { id: 2, name: 'Dr. Ana Vasilescu', specializationKey: 'apptSpecPediatrie' },
    { id: 3, name: 'Dr. George Popescu', specializationKey: 'apptSpecMedGen' },
    { id: 4, name: 'Dr. Maria Gheorghiu', specializationKey: 'apptSpecDerma' },
    { id: 5, name: 'Dr. Andrei Munteanu', specializationKey: 'apptSpecNeuro' }
  ];

  const specializationKeys: (keyof typeof t)[] = [
    'apptSpecCardio', 'apptSpecPediatrie', 'apptSpecMedGen',
    'apptSpecDerma', 'apptSpecNeuro', 'apptSpecOrtoped',
    'apptSpecOrl', 'apptSpecOftalmologie'
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(d => d.id === parseInt(doctorId));
    setFormData(prev => ({
      ...prev,
      doctorId,
      specialization: selectedDoctor ? t[selectedDoctor.specializationKey as keyof typeof t] as string : ''
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.patientName.trim()) { alert(t.apptPatientName); return false; }
    if (!formData.phone.trim()) { alert(t.apptPhone); return false; }
    if (!formData.email.trim() || !formData.email.includes('@')) { alert(t.apptEmail); return false; }
    if (!formData.doctorId) { alert(t.apptSelectDoctor); return false; }
    if (!formData.specialization) { alert(t.apptSpecialization); return false; }
    if (!formData.date) { alert(t.apptDate); return false; }
    if (!formData.time) { alert(t.apptTime); return false; }
    if (!formData.reason.trim()) { alert(t.apptReason); return false; }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      status: 'pending'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setFormData({ patientName: '', phone: '', email: '', doctorId: '', specialization: '', date: '', time: '', reason: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusLabel = (status: string) => {
    if (status === 'confirmed') return t.apptConfirmed;
    if (status === 'pending') return t.apptPending;
    if (status === 'canceled') return t.apptCanceled;
    return status;
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => { const d = new Date(); d.setMonth(d.getMonth() + 3); return d.toISOString().split('T')[0]; };

  const handleCancelAppointment = (id: number) => {
    if (window.confirm(t.apptCancelConfirm)) {
      setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: 'canceled' as const } : apt));
    }
  };

  return (
    <div className="appointments-page">
      <Navbar />
      <div className="appointments-container">
        <h1 className="page-title">{t.apptTitle}</h1>

        {showSuccess && (
          <div className="success-message">{t.apptSuccess}</div>
        )}

        <div className="form-card">
          <h2 className="section-title">{t.apptFormTitle}</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientName">{t.apptPatientName}</label>
                <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t.apptPhone}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.apptEmail}</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctorId">{t.apptSelectDoctor}</label>
                <select id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleDoctorChange} required>
                  <option value="">-- {t.apptSelectDoctor} --</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {t[doctor.specializationKey as keyof typeof t]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialization">{t.apptSpecialization}</label>
                <select id="specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} required>
                  <option value="">-- {t.apptSpecialization} --</option>
                  {specializationKeys.map(key => (
                    <option key={key} value={t[key] as string}>{t[key] as string}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">{t.apptDate}</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} min={getMinDate()} max={getMaxDate()} required />
              </div>
              <div className="form-group">
                <label htmlFor="time">{t.apptTime}</label>
                <select id="time" name="time" value={formData.time} onChange={handleInputChange} required>
                  <option value="">-- {t.apptTime} --</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">{t.apptReason}</label>
              <textarea id="reason" name="reason" value={formData.reason} onChange={handleInputChange} rows={4} required />
            </div>

            <button type="submit" className="submit-btn">{t.apptSubmit}</button>
          </form>
        </div>

        {appointments.length > 0 && (
          <div className="appointments-list-card">
            <h2 className="section-title">{t.apptMyList}</h2>
            <div className="appointments-grid">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-header">
                    <h3>{appointment.patientName}</h3>
                    <span className={`status-badge status-${appointment.status}`}>{getStatusLabel(appointment.status)}</span>
                  </div>
                  <div className="appointment-details">
                    <div className="detail-row"><span className="detail-label">{t.apptPhone}:</span><span className="detail-value">{appointment.phone}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.apptEmail}:</span><span className="detail-value">{appointment.email}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.adminDoctors}:</span><span className="detail-value">{appointment.doctor}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.apptSpecialization}:</span><span className="detail-value">{appointment.specialization}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.apptDate}:</span><span className="detail-value">{appointment.date}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.apptTime}:</span><span className="detail-value">{appointment.time}</span></div>
                    <div className="detail-row"><span className="detail-label">{t.apptReason}:</span><span className="detail-value">{appointment.reason}</span></div>
                  </div>
                  {appointment.status !== 'canceled' && (
                    <button className="cancel-btn" onClick={() => handleCancelAppointment(appointment.id)}>
                      {t.apptCancel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
