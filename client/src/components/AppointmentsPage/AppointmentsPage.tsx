import React, { useState, useRef, useEffect } from 'react';
import './AppointmentsPage.css';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import ReactDOM from 'react-dom';
import { useApi } from '../../api/context';

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

interface AppointmentDTO {
  id: number;
  patientName: string;
  phone: string;
  email: string;
  doctorName: string;
  serviceName: string;
  reasonForVisit: string;
  appointmentTime: string;
  appointmentDate: string;
  status: 'confirmed' | 'pending' | 'canceled';
}

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'fixed',
        top: rect.bottom - 2,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        background: 'white',
        border: '2px solid #2563eb',
        borderTop: 'none',
        borderRadius: '0 0 20px 20px',
        overflowY: 'auto',
        maxHeight: '220px',
        boxShadow: '0 8px 16px rgba(37, 99, 235, 0.15)',
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideToggle = ref.current && ref.current.contains(target);
      const clickedInsideMenu = menuRef.current && menuRef.current.contains(target);
      if (!clickedInsideToggle && !clickedInsideMenu) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      const handleScroll = (e: Event) => {
        if (menuRef.current && menuRef.current.contains(e.target as Node)) return;
        calculatePosition();
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [open]);

  const handleToggle = () => {
    if (!open) calculatePosition();
    setOpen(!open);
  };

  const selected = options.find(o => o.value === value);

  return (
      <div className="custom-select-wrapper" ref={ref}>
        <div className={`custom-select-toggle ${open ? 'open' : ''}`} onClick={handleToggle} ref={toggleRef}>
          <span className={selected ? '' : 'placeholder'}>{selected ? selected.label : placeholder}</span>
          <span className="custom-select-arrow">▾</span>
        </div>
        {open && ReactDOM.createPortal(
            <div style={menuStyle} ref={menuRef}>
              {options.map((option) => (
                  <div
                      key={option.value}
                      className={`custom-select-item ${value === option.value ? 'selected' : ''}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { onChange(option.value); setOpen(false); }}
                  >
                    {option.label}
                  </div>
              ))}
            </div>,
            document.body
        )}
      </div>
  );
};

const AppointmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const api = useApi();

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
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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

  const mapDtoToAppointment = (dto: AppointmentDTO): Appointment => ({
    id: dto.id,
    patientName: dto.patientName,
    phone: dto.phone,
    email: dto.email,
    doctor: dto.doctorName,
    specialization: dto.serviceName,
    date: dto.appointmentDate,
    time: dto.appointmentTime,
    reason: dto.reasonForVisit,
    status: dto.status,
  });

  const fetchAppointmentsByEmail = async (email: string) => {
    if (!email || !email.includes('@')) return;
    setLoadingAppointments(true);
    setApiError(null);
    try {
      const data = await api.get<AppointmentDTO[]>(`/api/appointment/byEmail/${encodeURIComponent(email)}`);
      setAppointments(data.map(mapDtoToAppointment));
    } catch {
      // erorile globale sunt gestionate in AxiosProvider
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailBlur = () => {
    void fetchAppointmentsByEmail(formData.email);
  };

  const handleDoctorChange = (doctorId: string) => {
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

  // POST /api/appointment/create
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));

    const payload = {
      patientName: formData.patientName,
      phone: formData.phone,
      email: formData.email,
      doctorName: selectedDoctor?.name ?? '',
      serviceName: formData.specialization,
      reasonForVisit: formData.reason,
      appointmentTime: formData.time + ':00',
      appointmentDate: formData.date,
    };

    setSubmitting(true);
    setApiError(null);
    try {
      await api.post<string>('/api/appointment/create', payload);
      await fetchAppointmentsByEmail(formData.email);
      setFormData({ patientName: '', phone: '', email: '', doctorId: '', specialization: '', date: '', time: '', reason: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setApiError('A apărut o eroare la salvarea programării. Încearcă din nou.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === 'confirmed') return t.apptConfirmed;
    if (status === 'pending') return t.apptPending;
    if (status === 'canceled') return t.apptCanceled;
    return status;
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => { const d = new Date(); d.setMonth(d.getMonth() + 3); return d.toISOString().split('T')[0]; };

  // PATCH /api/appointment/{id}/status
  const handleCancelAppointment = async (id: number) => {
    if (!window.confirm(t.apptCancelConfirm)) return;
    try {
      await api.patch(`/api/appointment/${id}/status`, { status: 2 });
      setAppointments(prev =>
          prev.map(apt => apt.id === id ? { ...apt, status: 'canceled' as const } : apt)
      );
    } catch {
      setApiError('Nu s-a putut anula programarea. Încearcă din nou.');
    }
  };

  const doctorOptions = doctors.map(d => ({
    value: String(d.id),
    label: `${d.name} - ${t[d.specializationKey as keyof typeof t]}`
  }));

  const specializationOptions = specializationKeys.map(key => ({
    value: t[key] as string,
    label: t[key] as string
  }));

  const timeOptions = availableTimes.map(time => ({
    value: time,
    label: time
  }));

  return (
      <>
        <div className="appointments-page">
          <Navbar />
          <div className="appointments-container">
            <h1 className="page-title">{t.apptTitle}</h1>

            {showSuccess && (
                <div className="success-message">{t.apptSuccess}</div>
            )}

            {apiError && (
                <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{apiError}</div>
            )}

            <div className="form-card">
              <h2 className="section-title">{t.apptFormTitle}</h2>
              <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptPatientName}</label>
                    <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>{t.apptPhone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.apptEmail}</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleEmailBlur}
                      required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptSelectDoctor}</label>
                    <CustomSelect
                        options={doctorOptions}
                        value={formData.doctorId}
                        onChange={handleDoctorChange}
                        placeholder={`-- ${t.apptSelectDoctor} --`}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.apptSpecialization}</label>
                    <CustomSelect
                        options={specializationOptions}
                        value={formData.specialization}
                        onChange={(val) => setFormData(prev => ({ ...prev, specialization: val }))}
                        placeholder={`-- ${t.apptSpecialization} --`}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptDate}</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} min={getMinDate()} max={getMaxDate()} required />
                  </div>
                  <div className="form-group">
                    <label>{t.apptTime}</label>
                    <CustomSelect
                        options={timeOptions}
                        value={formData.time}
                        onChange={(val) => setFormData(prev => ({ ...prev, time: val }))}
                        placeholder={`-- ${t.apptTime} --`}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.apptReason}</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} rows={4} required />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Se trimite...' : t.apptSubmit}
                </button>
              </form>
            </div>

            {loadingAppointments && (
                <p style={{ textAlign: 'center', margin: '1rem 0' }}>Se încarcă programările...</p>
            )}

            {!loadingAppointments && appointments.length > 0 && (
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
        </div>
        <Footer />
      </>
  );
};

export default AppointmentsPage;