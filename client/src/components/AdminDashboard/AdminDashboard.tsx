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

  return (
      <div className="admin-page-wrapper">

        <AdminNavbar />

        <div className="admin-dashboard">
          <aside className="sidebar">
            <div className="sidebar-header"><h2>Cabinet Medical</h2></div>
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
              {activeSection === 'pacienti' && (
                  <>
                    <div className="filters">
                      <input type="text" className="search-input" placeholder={t.adminSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      <div className="custom-dropdown">
                        <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                          {statusFilter === 'All' ? t.adminAllPatients : statusFilter === 'Active' ? t.adminActive : t.adminInactive}
                          <span className="dropdown-arrow">▾</span>
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                              {(['All', 'Active', 'Inactive'] as const).map((option) => (
                                  <div key={option} className={`dropdown-item ${statusFilter === option ? 'selected' : ''}`} onClick={() => { setStatusFilter(option); setDropdownOpen(false); }}>
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
                          <th>{t.adminName}</th><th>{t.adminAge}</th><th>{t.adminPhone}</th>
                          <th>{t.adminEmail}</th><th>{t.adminLastVisit}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.id}>
                              <td><div className="patient-info"><div className="patient-avatar">{getAvatar(patient.name)}</div><span>{patient.name}</span></div></td>
                              <td>{patient.age}</td><td>{patient.phone}</td><td>{patient.email}</td><td>{patient.lastVisit}</td>
                              <td><span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status === 'Active' ? t.adminActive : t.adminInactive}</span></td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action btn-edit" onClick={() => handleEditPatient(patient)} title={t.adminEdit}>{t.adminEdit}</button>
                                  <button className="btn-action btn-delete" onClick={() => handleDeletePatient(patient.id)} title={t.adminDelete}>{t.adminDelete}</button>
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </>
              )}

              {activeSection === 'statistici' && (
                  <div className="section-content">
                    <div className="stats-grid">
                      <div className="stat-card"><div className="stat-details"><h3>{t.adminTotalPatients}</h3><p className="stat-number">{patients.length}</p></div></div>
                      <div className="stat-card"><div className="stat-details"><h3>{t.adminActivePatients}</h3><p className="stat-number">{patients.filter(p => p.status === 'Active').length}</p></div></div>
                      <div className="stat-card"><div className="stat-details"><h3>{t.adminTodayAppts}</h3><p className="stat-number">3</p></div></div>
                      <div className="stat-card"><div className="stat-details"><h3>{t.adminActiveDoctors}</h3><p className="stat-number">3</p></div></div>
                    </div>
                  </div>
              )}

              {activeSection === 'programari' && (
                  <div className="section-content">
                    <div className="table-container">
                      <table className="patients-table">
                        <thead><tr><th>{t.adminApptDate}</th><th>{t.adminApptTime}</th><th>{t.adminName}</th><th>{t.adminDoctors}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                        <tbody>
                        <tr><td>2026-02-19</td><td>10:00</td><td>Maria Popescu</td><td>Dr. Ionescu</td><td><span className="status-badge active">{t.adminApptConfirmed}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td>2026-02-19</td><td>11:30</td><td>Ion Ionescu</td><td>Dr. Vasilescu</td><td><span className="status-badge active">{t.adminApptConfirmed}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td>2026-02-19</td><td>14:00</td><td>Ana Vasilescu</td><td>Dr. Popescu</td><td><span className="status-badge inactive">{t.adminApptPending}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {activeSection === 'medici' && (
                  <div className="section-content">
                    <div className="table-container">
                      <table className="patients-table">
                        <thead><tr><th>{t.adminDoctors}</th><th>{t.apptSpecialization ? t.apptSpecialization.replace(' *','') : t.adminSpecCardio}</th><th>{t.adminPhone}</th><th>{t.adminEmail}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                        <tbody>
                        <tr><td><div className="patient-info"><div className="patient-avatar">II</div><span>Dr. Ion Ionescu</span></div></td><td>{t.adminSpecCardio}</td><td>0721111111</td><td>dr.ionescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td><div className="patient-info"><div className="patient-avatar">AV</div><span>Dr. Ana Vasilescu</span></div></td><td>{t.adminSpecPediatrie}</td><td>0722222222</td><td>dr.vasilescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        <tr><td><div className="patient-info"><div className="patient-avatar">GP</div><span>Dr. George Popescu</span></div></td><td>{t.adminSpecMedGen}</td><td>0723333333</td><td>dr.popescu@cabinet.ro</td><td><span className="status-badge active">{t.adminActive}</span></td><td><div className="action-buttons"><button className="btn-action btn-edit">{t.adminEdit}</button></div></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

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
                                <div key={option} className={`dropdown-item ${formData.status === option ? 'selected' : ''}`} onClick={() => { setFormData({ ...formData, status: option }); setStatusDropdownOpen(false); }}>
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