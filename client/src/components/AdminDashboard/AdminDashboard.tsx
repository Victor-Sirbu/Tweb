import React, { useState } from 'react';
import './AdminDashboard.css';
import { useLanguage } from '../../context/LanguageContext';
import AdminNavbar from '../../shared/AdminNavbar/AdminNavbar';
import Footer from '../../shared/Footer/Footer';

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

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<'statistici' | 'programari' | 'pacienti' | 'medici' | 'setari'>('pacienti');
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'Maria Popescu', age: 34, phone: '0721234567', email: 'maria.popescu@email.com', lastVisit: '2024-02-15', status: 'Active', avatar: 'MP' },
    { id: 2, name: 'Ion Ionescu', age: 45, phone: '0732345678', email: 'ion.ionescu@email.com', lastVisit: '2024-02-10', status: 'Active', avatar: 'II' },
    { id: 3, name: 'Ana Vasilescu', age: 28, phone: '0743456789', email: 'ana.vasilescu@email.com', lastVisit: '2024-01-20', status: 'Inactive', avatar: 'AV' },
    { id: 4, name: 'Victor Gudima', age: 21, phone: '067759305', email: 'victor.gudima@isa.utm.md', lastVisit: '2026-02-18', status: 'Active', avatar: 'VG' },
    { id: 5, name: 'George Mihai', age: 52, phone: '0754567890', email: 'george.mihai@email.com', lastVisit: '2024-02-18', status: 'Active', avatar: 'GM' },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({ name: '', age: '', phone: '', email: '', status: 'Active' as 'Active' | 'Inactive' });

  const getAvatar = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = () => { setEditingPatient(null); setFormData({ name: '', age: '', phone: '', email: '', status: 'Active' }); setShowModal(true); };
  const handleEditPatient = (patient: Patient) => { setEditingPatient(patient); setFormData({ name: patient.name, age: patient.age.toString(), phone: patient.phone, email: patient.email, status: patient.status }); setShowModal(true); };
  const handleDeletePatient = (id: number) => { if (window.confirm(t.adminPatients + '?')) setPatients(patients.filter(p => p.id !== id)); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? { ...p, name: formData.name, age: parseInt(formData.age), phone: formData.phone, email: formData.email, status: formData.status, avatar: getAvatar(formData.name) } : p));
    } else {
      const newPatient: Patient = { id: Math.max(...patients.map(p => p.id)) + 1, name: formData.name, age: parseInt(formData.age), phone: formData.phone, email: formData.email, lastVisit: new Date().toISOString().split('T')[0], status: formData.status, avatar: getAvatar(formData.name) };
      setPatients([...patients, newPatient]);
    }
    setShowModal(false);
  };

  const sectionTitle = () => {
    switch (activeSection) {
      case 'statistici': return t.adminStats;
      case 'programari': return t.adminAppts;
      case 'pacienti': return t.adminPatients;
      case 'medici': return t.adminDoctors;
      case 'setari': return t.adminSettings;
    }
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
            <div className="sidebar-header"><h2></h2></div>
            <nav className="sidebar-nav">
              <a href="#" className={`nav-item ${activeSection === 'statistici' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('statistici'); }}>{t.adminStats}</a>
              <a href="#" className={`nav-item ${activeSection === 'programari' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('programari'); }}>{t.adminAppts}</a>
              <a href="#" className={`nav-item ${activeSection === 'pacienti' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('pacienti'); }}>{t.adminPatients}</a>
              <a href="#" className={`nav-item ${activeSection === 'medici' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('medici'); }}>{t.adminDoctors}</a>
              <a href="#" className={`nav-item ${activeSection === 'setari' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveSection('setari'); }}>{t.adminSettings}</a>
            </nav>
          </aside>

          <main className="main-content">
            <header className="header">
              <h1>{sectionTitle()}</h1>
              <div className="header-actions">
                {activeSection === 'pacienti' && (
                    <button className="admin-btn-primary" onClick={handleAddPatient}>{t.adminAddPatient}</button>
                )}
                <div className="admin-avatar">A</div>
              </div>
            </header>

            <div className="content-wrapper">

              {/* ── STATISTICI ── */}
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

              {/* ── PROGRAMĂRI ── */}
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
                        <tr><td>2026-02-19</td><td>10:00</td><td>Maria Popescu</td><td>Dr. Ionescu</td><td><span className="status-badge active">{t.adminApptConfirmed}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td>2026-02-19</td><td>11:30</td><td>Ion Ionescu</td><td>Dr. Vasilescu</td><td><span className="status-badge active">{t.adminApptConfirmed}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td>2026-02-19</td><td>14:00</td><td>Ana Vasilescu</td><td>Dr. Popescu</td><td><span className="status-badge inactive">{t.adminApptPending}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {/* ── PACIENȚI ── */}
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

              {/* ── MEDICI ── */}
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
                        <tr><td><div className="patient-info"><div className="patient-avatar">II</div><span>Dr. Ion Ionescu</span></div></td><td>{t.adminSpecCardio}</td><td>0721111111</td><td>dr.ionescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td><div className="patient-info"><div className="patient-avatar">AV</div><span>Dr. Ana Vasilescu</span></div></td><td>{t.adminSpecPediatrie}</td><td>0722222222</td><td>dr.vasilescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td><div className="patient-info"><div className="patient-avatar">GP</div><span>Dr. George Popescu</span></div></td><td>{t.adminSpecMedGen}</td><td>0723333333</td><td>dr.popescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {/* ── SETĂRI ── */}
              {activeSection === 'setari' && (
                  <div className="section-content">
                    <div className="settings-container">
                      <div className="settings-section">
                        <h3>{t.adminSettingsTitle}</h3>
                        <div className="setting-item"><label>{t.adminChangePass}</label><input type="password" placeholder="••••••••" /></div>
                        <div className="setting-item"><label>{t.adminNotifEmail}</label><input type="email" defaultValue="admin@cabinet.ro" /></div>
                        <div className="setting-item"><label>{t.adminLanguage}</label><select><option value="ro">Română</option><option value="en">English</option><option value="ru">Русский</option></select></div>
                        <div className="setting-item"><label>{t.adminTheme}</label><select><option value="light">Light</option><option value="dark">Dark</option><option value="auto">Auto</option></select></div>
                      </div>
                      <div className="settings-section">
                        <h3>{t.profNotifications}</h3>
                        <div className="setting-item"><label><input type="checkbox" defaultChecked />Email {t.adminAppts}</label></div>
                        <div className="setting-item"><label><input type="checkbox" defaultChecked />SMS reminder</label></div>
                        <div className="setting-item"><label><input type="checkbox" />{t.profNotifications}</label></div>
                      </div>
                      <button className="btn-primary">{t.adminSave}</button>
                    </div>
                  </div>
              )}

            </div>
          </main>
        </div>

        <Footer />

        {/* ── MODAL ── */}
        {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingPatient ? t.adminEditPatient : t.adminAddPatient}</h2>
                  <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group"><label>{t.adminName}</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="form-group"><label>{t.adminAge}</label><input type="number" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} /></div>
                  <div className="form-group"><label>{t.adminPhone}</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                  <div className="form-group"><label>{t.adminEmail}</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                  <div className="form-group">
                    <label>{t.adminStatus}</label>
                    <div className="custom-dropdown">
                      <button type="button" className="dropdown-toggle" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
                        {formData.status === 'Active' ? t.adminActive : t.adminInactive}
                        <span className="dropdown-arrow">▾</span>
                      </button>
                      {statusDropdownOpen && (
                          <div className="dropdown-menu">
                            {(['Active', 'Inactive'] as const).map((option) => (
                                <div
                                    key={option}
                                    className={`dropdown-item ${formData.status === option ? 'selected' : ''}`}
                                    onClick={() => { setFormData({ ...formData, status: option }); setStatusDropdownOpen(false); }}
                                >
                                  {option === 'Active' ? t.adminActive : t.adminInactive}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>{t.adminCancel}</button>
                    <button type="submit" className="btn-submit">{editingPatient ? t.adminUpdate : t.adminAdd}</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default AdminDashboard;
