import React, { useState } from 'react';
import './AdminDashboard.css';

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
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Maria Popescu',
      age: 34,
      phone: '0721234567',
      email: 'maria.popescu@email.com',
      lastVisit: '2024-02-15',
      status: 'Active',
      avatar: 'MP'
    },
    {
      id: 2,
      name: 'Ion Ionescu',
      age: 45,
      phone: '0732345678',
      email: 'ion.ionescu@email.com',
      lastVisit: '2024-02-10',
      status: 'Active',
      avatar: 'II'
    },
    {
      id: 3,
      name: 'Ana Vasilescu',
      age: 28,
      phone: '0743456789',
      email: 'ana.vasilescu@email.com',
      lastVisit: '2024-01-20',
      status: 'Inactive',
      avatar: 'AV'
    },
    {
      id: 4,
      name: 'George Mihai',
      age: 52,
      phone: '0754567890',
      email: 'george.mihai@email.com',
      lastVisit: '2024-02-18',
      status: 'Active',
      avatar: 'GM'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormData({ name: '', age: '', phone: '', email: '', status: 'Active' });
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      phone: patient.phone,
      email: patient.email,
      status: patient.status
    });
    setShowModal(true);
  };

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Sigur doriti sa stergeti acest pacient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPatient) {
      setPatients(patients.map(p =>
        p.id === editingPatient.id
          ? {
              ...p,
              name: formData.name,
              age: parseInt(formData.age),
              phone: formData.phone,
              email: formData.email,
              status: formData.status
            }
          : p
      ));
    } else {
      const newPatient: Patient = {
        id: Math.max(...patients.map(p => p.id)) + 1,
        name: formData.name,
        age: parseInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        lastVisit: new Date().toISOString().split('T')[0],
        status: formData.status,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setPatients([...patients, newPatient]);
    }

    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Cabinet Medical</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span className="nav-icon">&#x1F4CA;</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">&#x1F4C5;</span>
            Programari
          </a>
          <a href="#" className="nav-item active">
            <span className="nav-icon">&#x1F464;</span>
            Pacienti
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">&#x1F468;&#x200D;&#x2695;&#xFE0F;</span>
            Medici
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">&#x2699;&#xFE0F;</span>
            Setari
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Patients</h1>
          <div className="header-actions">
            <button className="btn-primary" onClick={handleAddPatient}>
              Add Patient
            </button>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="filters">
            <input
              type="text"
              className="search-input"
              placeholder="Cauta pacient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive')}
            >
              <option value="All">Toti pacientii</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="table-container">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Pacient</th>
                  <th>Varsta</th>
                  <th>Telefon</th>
                  <th>Email</th>
                  <th>Ultima Vizita</th>
                  <th>Status</th>
                  <th>Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patient-info">
                        <div className="patient-avatar">{patient.avatar}</div>
                        <span>{patient.name}</span>
                      </div>
                    </td>
                    <td>{patient.age}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>{patient.lastVisit}</td>
                    <td>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-view" title="View">View</button>
                        <button className="btn-action btn-edit" onClick={() => handleEditPatient(patient)} title="Edit">Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeletePatient(patient.id)} title="Delete">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPatient ? 'Edit Patient' : 'Add Patient'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nume</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Varsta</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingPatient ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
