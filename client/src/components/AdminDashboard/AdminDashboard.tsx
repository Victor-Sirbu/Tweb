import React, { useState } from 'react';
import './AdminDashboard.css';
import { useLanguage } from '../../context/LanguageContext';
import AdminNavbar from '../../shared/AdminNavbar/AdminNavbar';
import Footer from '../../shared/Footer/Footer';
import { getSpecializationLabel, translateSpecialization } from '../../utils/translateSpecialization';
import { useNotifications } from '../../context/NotificationContext';
import type { Notification } from '../../context/NotificationContext';

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  lastVisit: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  patientName: string;
  doctorName: string;
  status: 'Confirmed' | 'Pending';
}

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { notifications, setNotifications } = useNotifications();
  const [activeSection, setActiveSection] = useState<'statistici' | 'programari' | 'pacienti' | 'medici' | 'notificari'>('pacienti');
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'Maria Popescu', age: 34, phone: '0721234567', email: 'maria.popescu@email.com', lastVisit: '2024-02-15', status: 'Active', avatar: 'MP' },
    { id: 2, name: 'Ion Ionescu', age: 45, phone: '0732345678', email: 'ion.ionescu@email.com', lastVisit: '2024-02-10', status: 'Active', avatar: 'II' },
    { id: 3, name: 'Ana Vasilescu', age: 28, phone: '0743456789', email: 'ana.vasilescu@email.com', lastVisit: '2024-01-20', status: 'Inactive', avatar: 'AV' },
    { id: 4, name: 'Victor Gudima', age: 21, phone: '067759305', email: 'victor.gudima@isa.utm.md', lastVisit: '2026-02-18', status: 'Active', avatar: 'VG' },
    { id: 5, name: 'George Mihai', age: 52, phone: '0754567890', email: 'george.mihai@email.com', lastVisit: '2024-02-18', status: 'Active', avatar: 'GM' },
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: 'Dr. Ion Ionescu', specialization: 'Cardiologie', phone: '0721111111', email: 'dr.ionescu@cabinet.ro', status: 'Active', avatar: 'II' },
    { id: 2, name: 'Dr. Ana Vasilescu', specialization: 'Pediatrie', phone: '0722222222', email: 'dr.vasilescu@cabinet.ro', status: 'Active', avatar: 'AV' },
    { id: 3, name: 'Dr. George Popescu', specialization: 'Medicină Generală', phone: '0723333333', email: 'dr.popescu@cabinet.ro', status: 'Active', avatar: 'GP' },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: '2026-02-19', time: '10:00', patientName: 'Maria Popescu', doctorName: 'Dr. Ionescu', status: 'Confirmed' },
    { id: 2, date: '2026-02-19', time: '11:30', patientName: 'Ion Ionescu', doctorName: 'Dr. Vasilescu', status: 'Confirmed' },
    { id: 3, date: '2026-02-19', time: '14:00', patientName: 'Ana Vasilescu', doctorName: 'Dr. Popescu', status: 'Pending' },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  // Patient modal
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [patientFormData, setPatientFormData] = useState({ name: '', age: '', phone: '', email: '', status: 'Active' as 'Active' | 'Inactive' });

  // Doctor modal
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [doctorFormData, setDoctorFormData] = useState({ name: '', specialization: '', phone: '', email: '', status: 'Active' as 'Active' | 'Inactive' });

  // Appointment modal
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [appointmentFormData, setAppointmentFormData] = useState({ date: '', time: '', patientName: '', doctorName: '', status: 'Confirmed' as 'Confirmed' | 'Pending' });

  // Notification state
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [notificationFormData, setNotificationFormData] = useState({
    title: '',
    message: ''
  });
  const [notificationHistory, setNotificationHistory] = useState<Array<{
    id: number;
    adminName: string;
    patientNames: string[];
    title: string;
    message: string;
    timestamp: string;
  }>>([]);
  const [expandedHistoryIds, setExpandedHistoryIds] = useState<number[]>([]);

  const getAvatar = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Patient handlers
  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setPatientFormData({ name: patient.name, age: patient.age.toString(), phone: patient.phone, email: patient.email, status: patient.status });
    setShowPatientModal(true);
  };
  const handleDeletePatient = (id: number) => {
    if (window.confirm('Sigur doriți să ștergeți acest pacient?'))
      setPatients(patients.filter(p => p.id !== id));
  };
  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? { ...p, name: patientFormData.name, age: parseInt(patientFormData.age), phone: patientFormData.phone, email: patientFormData.email, status: patientFormData.status, avatar: getAvatar(patientFormData.name) } : p));
    } else {
      const newPatient: Patient = { id: Math.max(...patients.map(p => p.id)) + 1, name: patientFormData.name, age: parseInt(patientFormData.age), phone: patientFormData.phone, email: patientFormData.email, lastVisit: new Date().toISOString().split('T')[0], status: patientFormData.status, avatar: getAvatar(patientFormData.name) };
      setPatients([...patients, newPatient]);
    }
    setShowPatientModal(false);
    setEditingPatient(null);
  };

  // Doctor handlers
  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorFormData({ name: doctor.name, specialization: doctor.specialization, phone: doctor.phone, email: doctor.email, status: doctor.status });
    setShowDoctorModal(true);
  };
  const handleDeleteDoctor = (id: number) => {
    if (window.confirm('Sigur doriți să ștergeți acest medic?'))
      setDoctors(doctors.filter(d => d.id !== id));
  };
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...d, name: doctorFormData.name, specialization: doctorFormData.specialization, phone: doctorFormData.phone, email: doctorFormData.email, status: doctorFormData.status, avatar: getAvatar(doctorFormData.name) } : d));
    } else {
      const newDoctor: Doctor = { id: Math.max(...doctors.map(d => d.id)) + 1, name: doctorFormData.name, specialization: doctorFormData.specialization, phone: doctorFormData.phone, email: doctorFormData.email, status: doctorFormData.status, avatar: getAvatar(doctorFormData.name) };
      setDoctors([...doctors, newDoctor]);
    }
    setShowDoctorModal(false);
    setEditingDoctor(null);
  };

  // Appointment handlers
  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setAppointmentFormData({ date: appointment.date, time: appointment.time, patientName: appointment.patientName, doctorName: appointment.doctorName, status: appointment.status });
    setShowAppointmentModal(true);
  };
  const handleDeleteAppointment = (id: number) => {
    if (window.confirm('Sigur doriți să ștergeți această programare?'))
      setAppointments(appointments.filter(a => a.id !== id));
  };
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      setAppointments(appointments.map(a => a.id === editingAppointment.id ? { ...a, date: appointmentFormData.date, time: appointmentFormData.time, patientName: appointmentFormData.patientName, doctorName: appointmentFormData.doctorName, status: appointmentFormData.status } : a));
    } else {
      const newAppointment: Appointment = { id: Math.max(...appointments.map(a => a.id)) + 1, date: appointmentFormData.date, time: appointmentFormData.time, patientName: appointmentFormData.patientName, doctorName: appointmentFormData.doctorName, status: appointmentFormData.status };
      setAppointments([...appointments, newAppointment]);
    }
    setShowAppointmentModal(false);
    setEditingAppointment(null);
  };

  // Notification handlers
  const togglePatientSelection = (patientId: number) => {
    setSelectedPatients(prev =>
      prev.includes(patientId) ? prev.filter(id => id !== patientId) : [...prev, patientId]
    );
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatients.length === 0) {
      alert(language === 'ru' ? 'Выберите хотя бы одного пациента' : language === 'en' ? 'Select at least one patient' : 'Selectați cel puțin un pacient');
      return;
    }


    const timeStr = language === 'ru' ? 'Только что' : language === 'en' ? 'Just now' : 'Acum';

    const newNotifications: Notification[] = selectedPatients.map(patientId => {
      return {
        id: Math.max(...notifications.map(n => n.id), 0) + patientId,
        type: 'sistem',
        title: notificationFormData.title,
        message: notificationFormData.message,
        time: timeStr,
        read: false
      };
    });

    setNotifications([...newNotifications, ...notifications]);

    // Add to history
    const selectedPatientNames = patients
      .filter(p => selectedPatients.includes(p.id))
      .map(p => p.name);

    const historyEntry = {
      id: Date.now(),
      adminName: 'Admin',
      patientNames: selectedPatientNames,
      title: notificationFormData.title,
      message: notificationFormData.message,
      timestamp: new Date().toLocaleString(language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'ro-RO')
    };

    setNotificationHistory([historyEntry, ...notificationHistory]);

    // Reset form
    setNotificationFormData({ title: '', message: '' });
    setSelectedPatients([]);

    alert(language === 'ru' ? `Уведомление отправлено ${selectedPatients.length} пациентам` :
          language === 'en' ? `Notification sent to ${selectedPatients.length} patients` :
          `Notificare trimisă la ${selectedPatients.length} pacienți`);
  };

  const filteredPatientsForNotification = patients.filter(patient => {
    if (patient.status !== 'Active') return false;
    const searchLower = patientSearchTerm.toLowerCase();
    return patient.name.toLowerCase().includes(searchLower) ||
           patient.email.toLowerCase().includes(searchLower);
  });

  const toggleHistoryDetails = (id: number) => {
    setExpandedHistoryIds(prev =>
      prev.includes(id) ? prev.filter(historyId => historyId !== id) : [...prev, id]
    );
  };



  const statCards = [
    {
      label: t.adminTotalPatients,
      value: patients.length,
      badge: '+12%',
      color: '#3b82f6',
      bg: 'rgba(59,130,246,0.1)',
      bars: [40, 55, 45, 70, 60, 80, 100],
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
      ),
    },
    {
      label: t.adminActivePatients,
      value: patients.filter(p => p.status === 'Active').length,
      badge: `${Math.round((patients.filter(p => p.status === 'Active').length / patients.length) * 100)}%`,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.1)',
      bars: [50, 65, 55, 75, 90, 80, 100],
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
      ),
    },
    {
      label: t.adminTodayAppts,
      value: 3,
      badge: 'Azi',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.1)',
      bars: [30, 80, 50, 40, 70, 60, 100],
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
      ),
    },
    {
      label: t.adminActiveDoctors,
      value: 3,
      badge: 'Activi',
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.1)',
      bars: [60, 60, 80, 80, 100, 100, 100],
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
      ),
    },
  ];

  return (
      <div className="admin-page-wrapper">
        <AdminNavbar />

        <div className="admin-dashboard">
          <aside className="sidebar">
            <div className="sidebar-header"></div>
            <nav className="sidebar-nav">
              <a href="#" className={`nav-item ${activeSection === 'statistici' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('statistici'); }}>{t.adminStats}</a>
              <a href="#" className={`nav-item ${activeSection === 'programari' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('programari'); }}>{t.adminAppts}</a>
              <a href="#" className={`nav-item ${activeSection === 'pacienti' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('pacienti'); }}>{t.adminPatients}</a>
              <a href="#" className={`nav-item ${activeSection === 'medici' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('medici'); }}>{t.adminDoctors}</a>
              <a href="#" className={`nav-item ${activeSection === 'notificari' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('notificari'); }}>
                {language === 'ru' ? 'Уведомления' : language === 'en' ? 'Notifications' : 'Notificări'}
              </a>
            </nav>
          </aside>

          <main className="main-content">

            <div className="content-wrapper">


              {activeSection === 'statistici' && (
                  <div className="section-content">
                    <div className="stats-grid">
                      {statCards.map((card, i) => (
                          <div className="stat-card" key={i}>
                            <div className="stat-card-top">
                              <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                                {card.icon}
                              </div>
                              <span className="stat-badge">{card.badge}</span>
                            </div>
                            <p className="stat-number">{card.value}</p>
                            <p className="stat-label">{card.label}</p>
                            <div className="mini-bar">
                              {card.bars.map((h, j) => (
                                  <span
                                      key={j}
                                      style={{ height: `${h}%`, background: card.color, opacity: j === card.bars.length - 1 ? 1 : 0.5 + j * 0.07 }}
                                  />
                              ))}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}


              {activeSection === 'programari' && (
                  <div className="section-content">
                    <div className="table-container">
                      <table className="patients-table">
                        <thead>
                        <tr>
                          <th>{t.adminApptDate}</th>
                          <th>{t.adminApptTime}</th>
                          <th>{t.adminName}</th>
                          <th>{t.adminDoctors}</th>
                          <th>{t.adminStatus}</th>
                          <th>{t.adminActions}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                              <td>{appointment.date}</td>
                              <td>{appointment.time}</td>
                              <td>{appointment.patientName}</td>
                              <td>{appointment.doctorName}</td>
                              <td>
                                <span className={`status-badge ${appointment.status === 'Confirmed' ? 'active' : 'inactive'}`}>
                                  {appointment.status === 'Confirmed' ? t.adminApptConfirmed : t.adminApptPending}
                                </span>
                              </td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action btn-edit" onClick={() => handleEditAppointment(appointment)}>{t.adminEdit}</button>
                                  <button className="btn-action btn-delete" onClick={() => handleDeleteAppointment(appointment.id)}>{t.adminDelete}</button>
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}


              {activeSection === 'pacienti' && (
                  <>
                    <div className="filters">
                      <input
                          type="text"
                          className="search-input"
                          placeholder={t.adminSearch}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="custom-dropdown">
                        <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                          {statusFilter === 'All' ? t.adminAllPatients : statusFilter === 'Active' ? t.adminActive : t.adminInactive}
                          <span className="dropdown-arrow">▾</span>
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                              {(['All', 'Active', 'Inactive'] as const).map((option) => (
                                  <div
                                      key={option}
                                      className={`dropdown-item ${statusFilter === option ? 'selected' : ''}`}
                                      onClick={() => { setStatusFilter(option); setDropdownOpen(false); }}
                                  >
                                    {option === 'All' ? t.adminAllPatients : option === 'Active' ? t.adminActive : t.adminInactive}
                                  </div>
                              ))}
                            </div>
                        )}
                      </div>
                    </div>
                    <div className="table-container">
                      <table className="patients-table">
                        <thead>
                        <tr>
                          <th>{t.adminName}</th>
                          <th>{t.adminAge}</th>
                          <th>{t.adminPhone}</th>
                          <th>{t.adminEmail}</th>
                          <th>{t.adminLastVisit}</th>
                          <th>{t.adminStatus}</th>
                          <th>{t.adminActions}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.id}>
                              <td>
                                <div className="patient-info">
                                  <div className="patient-avatar">{getAvatar(patient.name)}</div>
                                  <span>{patient.name}</span>
                                </div>
                              </td>
                              <td>{patient.age}</td>
                              <td>{patient.phone}</td>
                              <td>{patient.email}</td>
                              <td>{patient.lastVisit}</td>
                              <td><span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status === 'Active' ? t.adminActive : t.adminInactive}</span></td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action btn-edit" onClick={() => handleEditPatient(patient)}>{t.adminEdit}</button>
                                  <button className="btn-action btn-delete" onClick={() => handleDeletePatient(patient.id)}>{t.adminDelete}</button>
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </>
              )}


              {activeSection === 'medici' && (
                  <div className="section-content">
                    <div className="table-container">
                      <table className="patients-table">
                        <thead>
                        <tr>
                          <th>{t.adminDoctors}</th>
                          <th>{t.apptSpecialization ? t.apptSpecialization.replace(' *', '') : t.adminSpecCardio}</th>
                          <th>{t.adminPhone}</th>
                          <th>{t.adminEmail}</th>
                          <th>{t.adminStatus}</th>
                          <th>{t.adminActions}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctors.map(doctor => (
                            <tr key={doctor.id}>
                              <td>
                                <div className="patient-info">
                                  <div className="patient-avatar">{doctor.avatar}</div>
                                  <span>{doctor.name}</span>
                                </div>
                              </td>
                              <td>{translateSpecialization(doctor.specialization, language)}</td>
                              <td>{doctor.phone}</td>
                              <td>{doctor.email}</td>
                              <td><span className={`status-badge ${doctor.status.toLowerCase()}`}>{doctor.status === 'Active' ? t.adminActive : t.adminInactive}</span></td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action btn-edit" onClick={() => handleEditDoctor(doctor)}>{t.adminEdit}</button>
                                  <button className="btn-action btn-delete" onClick={() => handleDeleteDoctor(doctor.id)}>{t.adminDelete}</button>
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {activeSection === 'notificari' && (
                  <div className="section-content">
                    <div className="notifications-section">
                      <div className="notification-content-grid">
                        {/* Left side - Patient selection */}
                        <div className="patients-selection-panel">
                          <div className="panel-header">
                            <h3>{language === 'ru' ? 'Пациенты' : language === 'en' ? 'Patients' : 'Pacienți'}</h3>
                            <span className="selected-count">
                              {selectedPatients.length} {language === 'ru' ? 'выбрано' : language === 'en' ? 'selected' : 'selectați'}
                            </span>
                          </div>

                          <div className="search-patient-box">
                            <input
                                type="text"
                                className="search-patient-input"
                                placeholder={language === 'ru' ? 'Поиск по имени или email...' : language === 'en' ? 'Search by name or email...' : 'Caută după nume sau email...'}
                                value={patientSearchTerm}
                                onChange={(e) => setPatientSearchTerm(e.target.value)}
                            />
                          </div>

                          <div className="patients-list">
                            {filteredPatientsForNotification.map(patient => (
                                <div
                                    key={patient.id}
                                    className={`patient-select-card ${selectedPatients.includes(patient.id) ? 'selected' : ''}`}
                                    onClick={() => togglePatientSelection(patient.id)}
                                >
                                  <input
                                      type="checkbox"
                                      checked={selectedPatients.includes(patient.id)}
                                      onChange={() => {}}
                                  />
                                  <div className="patient-avatar">{patient.avatar}</div>
                                  <div className="patient-details">
                                    <span className="patient-name">{patient.name}</span>
                                    <span className="patient-email">{patient.email}</span>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>

                        {/* Right side - Notification form */}
                        <div className="notification-form-panel">
                          <form onSubmit={handleSendNotification}>
                            <div className="form-group">
                              <label>
                                {language === 'ru' ? 'Заголовок' : language === 'en' ? 'Title' : 'Titlu'} *
                                <span className="char-counter">
                                  {notificationFormData.title.length}/50
                                </span>
                              </label>
                              <input
                                  type="text"
                                  className="form-input"
                                  required
                                  maxLength={50}
                                  placeholder={language === 'ru' ? 'Введите заголовок уведомления' : language === 'en' ? 'Enter notification title' : 'Introduceți titlul notificării'}
                                  value={notificationFormData.title}
                                  onChange={(e) => setNotificationFormData({ ...notificationFormData, title: e.target.value })}
                              />
                            </div>

                            <div className="form-group">
                              <label>
                                {language === 'ru' ? 'Сообщение' : language === 'en' ? 'Message' : 'Mesaj'} *
                                <span className="char-counter">
                                  {notificationFormData.message.length}/200
                                </span>
                              </label>
                              <textarea
                                  className="form-textarea"
                                  rows={6}
                                  required
                                  maxLength={200}
                                  placeholder={language === 'ru' ? 'Введите текст уведомления' : language === 'en' ? 'Enter notification message' : 'Introduceți mesajul notificării'}
                                  value={notificationFormData.message}
                                  onChange={(e) => setNotificationFormData({ ...notificationFormData, message: e.target.value })}
                              />
                            </div>

                            <div className="form-actions">
                              <button type="submit" className="btn-send-notification">
                                {language === 'ru' ? 'Отправить' : language === 'en' ? 'Send' : 'Trimite'}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>

                      {/* Notification History */}
                      <div className="notification-history-section">
                        <h3 className="history-title">
                          {language === 'ru' ? 'История уведомлений' : language === 'en' ? 'Notification History' : 'Istoric Notificări'}
                        </h3>

                        {notificationHistory.length === 0 ? (
                          <div className="history-empty">
                            <p>{language === 'ru' ? 'История пуста' : language === 'en' ? 'No history yet' : 'Niciun istoric încă'}</p>
                          </div>
                        ) : (
                          <div className="history-list">
                            {notificationHistory.map(entry => {
                              const isExpanded = expandedHistoryIds.includes(entry.id);
                              return (
                                <div key={entry.id} className="history-card">
                                  <div className="history-header">
                                    <div className="history-meta">
                                      <span className="history-admin">
                                        {language === 'ru' ? 'От' : language === 'en' ? 'From' : 'De la'}: <strong>{entry.adminName}</strong>
                                      </span>
                                      <span className="history-timestamp">{entry.timestamp}</span>
                                    </div>
                                  </div>

                                  <div className="history-recipients">
                                    <span className="recipients-label">
                                      {language === 'ru' ? 'Кому' : language === 'en' ? 'To' : 'Către'}:
                                    </span>
                                    <div className="recipients-tags">
                                      {entry.patientNames.map((name, idx) => (
                                        <span key={idx} className="recipient-tag">{name}</span>
                                      ))}
                                    </div>
                                  </div>

                                  {isExpanded && (
                                    <div className="history-content">
                                      <h4 className="history-subject">{entry.title}</h4>
                                      <p className="history-message">{entry.message}</p>
                                    </div>
                                  )}

                                  <button
                                    className="btn-toggle-details"
                                    onClick={() => toggleHistoryDetails(entry.id)}
                                  >
                                    {isExpanded
                                      ? (language === 'ru' ? 'Скрыть' : language === 'en' ? 'Hide' : 'Ascunde')
                                      : (language === 'ru' ? 'Детали' : language === 'en' ? 'Details' : 'Detalii')
                                    }
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
              )}

            </div>
          </main>
        </div>

        <Footer />

        {/* ── MODAL PACIENT ── */}
        {showPatientModal && (
            <div className="modal-overlay" onClick={() => setShowPatientModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingPatient ? t.adminEditPatient : t.adminAddPatient}</h2>
                  <button className="modal-close" onClick={() => setShowPatientModal(false)}>&times;</button>
                </div>
                <form onSubmit={handlePatientSubmit}>
                  <div className="form-group"><label>{t.adminName}</label><input type="text" required value={patientFormData.name} onChange={(e) => setPatientFormData({ ...patientFormData, name: e.target.value })} /></div>
                  <div className="form-row">
                    <div className="form-group"><label>{t.adminAge}</label><input type="number" required value={patientFormData.age} onChange={(e) => setPatientFormData({ ...patientFormData, age: e.target.value })} /></div>
                    <div className="form-group"><label>{t.adminPhone}</label><input type="tel" required value={patientFormData.phone} onChange={(e) => setPatientFormData({ ...patientFormData, phone: e.target.value })} /></div>
                  </div>
                  <div className="form-group"><label>{t.adminEmail}</label><input type="email" required value={patientFormData.email} onChange={(e) => setPatientFormData({ ...patientFormData, email: e.target.value })} /></div>
                  <div className="form-group">
                    <label>{t.adminStatus}</label>
                    <div className="custom-dropdown">
                      <button type="button" className="dropdown-toggle" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
                        {patientFormData.status === 'Active' ? t.adminActive : t.adminInactive}
                        <span className="dropdown-arrow">▾</span>
                      </button>
                      {statusDropdownOpen && (
                          <div className="dropdown-menu">
                            {(['Active', 'Inactive'] as const).map((option) => (
                                <div
                                    key={option}
                                    className={`dropdown-item ${patientFormData.status === option ? 'selected' : ''}`}
                                    onClick={() => { setPatientFormData({ ...patientFormData, status: option }); setStatusDropdownOpen(false); }}
                                >
                                  {option === 'Active' ? t.adminActive : t.adminInactive}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowPatientModal(false)}>{t.adminCancel}</button>
                    <button type="submit" className="btn-submit">{editingPatient ? t.adminUpdate : t.adminAdd}</button>
                  </div>
                </form>
              </div>
            </div>
        )}

        {/* ── MODAL MEDIC ── */}
        {showDoctorModal && (
            <div className="modal-overlay" onClick={() => setShowDoctorModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingDoctor ? (language === 'ru' ? 'Редактировать врача' : language === 'en' ? 'Edit Doctor' : 'Editează Medic') : (language === 'ru' ? 'Добавить врача' : language === 'en' ? 'Add Doctor' : 'Adaugă Medic')}</h2>
                  <button className="modal-close" onClick={() => setShowDoctorModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleDoctorSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>{t.adminName}</label><input type="text" required value={doctorFormData.name} onChange={(e) => setDoctorFormData({ ...doctorFormData, name: e.target.value })} /></div>
                    <div className="form-group"><label>{getSpecializationLabel(language)}</label><input type="text" required value={doctorFormData.specialization} onChange={(e) => setDoctorFormData({ ...doctorFormData, specialization: e.target.value })} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{t.adminPhone}</label><input type="tel" required value={doctorFormData.phone} onChange={(e) => setDoctorFormData({ ...doctorFormData, phone: e.target.value })} /></div>
                    <div className="form-group"><label>{t.adminEmail}</label><input type="email" required value={doctorFormData.email} onChange={(e) => setDoctorFormData({ ...doctorFormData, email: e.target.value })} /></div>
                  </div>
                  <div className="form-group">
                    <label>{t.adminStatus}</label>
                    <div className="custom-dropdown">
                      <button type="button" className="dropdown-toggle" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
                        {doctorFormData.status === 'Active' ? t.adminActive : t.adminInactive}
                        <span className="dropdown-arrow">▾</span>
                      </button>
                      {statusDropdownOpen && (
                          <div className="dropdown-menu">
                            {(['Active', 'Inactive'] as const).map((option) => (
                                <div
                                    key={option}
                                    className={`dropdown-item ${doctorFormData.status === option ? 'selected' : ''}`}
                                    onClick={() => { setDoctorFormData({ ...doctorFormData, status: option }); setStatusDropdownOpen(false); }}
                                >
                                  {option === 'Active' ? t.adminActive : t.adminInactive}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowDoctorModal(false)}>{t.adminCancel}</button>
                    <button type="submit" className="btn-submit">{editingDoctor ? t.adminUpdate : t.adminAdd}</button>
                  </div>
                </form>
              </div>
            </div>
        )}

        {/* ── MODAL PROGRAMARE ── */}
        {showAppointmentModal && (
            <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingAppointment ? (language === 'ru' ? 'Редактировать запись' : language === 'en' ? 'Edit Appointment' : 'Editează Programare') : (language === 'ru' ? 'Добавить запись' : language === 'en' ? 'Add Appointment' : 'Adaugă Programare')}</h2>
                  <button className="modal-close" onClick={() => setShowAppointmentModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleAppointmentSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>{language === 'ru' ? 'Дата' : language === 'en' ? 'Date' : 'Data'}</label><input type="date" required value={appointmentFormData.date} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, date: e.target.value })} /></div>
                    <div className="form-group"><label>{language === 'ru' ? 'Время' : language === 'en' ? 'Time' : 'Ora'}</label><input type="time" required value={appointmentFormData.time} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, time: e.target.value })} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{language === 'ru' ? 'Пациент' : language === 'en' ? 'Patient' : 'Pacient'}</label><input type="text" required value={appointmentFormData.patientName} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, patientName: e.target.value })} /></div>
                    <div className="form-group"><label>{language === 'ru' ? 'Врач' : language === 'en' ? 'Doctor' : 'Medic'}</label><input type="text" required value={appointmentFormData.doctorName} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, doctorName: e.target.value })} /></div>
                  </div>
                  <div className="form-group">
                    <label>{t.adminStatus}</label>
                    <div className="custom-dropdown">
                      <button type="button" className="dropdown-toggle" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
                        {appointmentFormData.status === 'Confirmed' ? t.adminApptConfirmed : t.adminApptPending}
                        <span className="dropdown-arrow">▾</span>
                      </button>
                      {statusDropdownOpen && (
                          <div className="dropdown-menu">
                            {(['Confirmed', 'Pending'] as const).map((option) => (
                                <div
                                    key={option}
                                    className={`dropdown-item ${appointmentFormData.status === option ? 'selected' : ''}`}
                                    onClick={() => { setAppointmentFormData({ ...appointmentFormData, status: option }); setStatusDropdownOpen(false); }}
                                >
                                  {option === 'Confirmed' ? t.adminApptConfirmed : t.adminApptPending}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowAppointmentModal(false)}>{t.adminCancel}</button>
                    <button type="submit" className="btn-submit">{editingAppointment ? t.adminUpdate : t.adminAdd}</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default AdminDashboard;
