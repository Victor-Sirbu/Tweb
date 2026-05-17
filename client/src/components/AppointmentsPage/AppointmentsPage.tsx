import React, { useState, useRef, useEffect } from 'react';
import './AppointmentsPage.css';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import ReactDOM from 'react-dom';
import { useApi } from '../../api/context';
import { useAuth } from '../../context/AuthContext';

type BackendStatus = 0 | 1 | 2;
type FrontendStatus = 'pending' | 'confirmed' | 'canceled';

interface MedicInfoDto {
  id: number;
  lastName: string;
  firstName: string;
  specialty: number;
}

interface AppointmentInfoDto {
  id: number;
  patientName: string;
  phone: string;
  email: string;
  doctorName: string;
  serviceName: string;
  reasonForVisit: string;
  appointmentTime: string; // "HH:MM:SS"
  appointmentDate: string; // "YYYY-MM-DD"
  status: BackendStatus;
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
  status: FrontendStatus;
}

interface CustomSelectProps {
  options: { value: string; label: string; disabled?: boolean }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const MEDIC_SPECIALITY_LABELS: Record<number, string> = {
  0: 'Cardiologie',
  1: 'Pediatrie',
  2: 'Neurologie',
  3: 'Dermatologie',
  4: 'Oftalmologie',
  5: 'Stomatologie',
  6: 'Chirurgie',
  7: 'Ortopedie',
  8: 'Ginecologie',
  9: 'Urologie',
  10: 'Psihiatrie',
  11: 'Medicina Generala',
};

const ALL_TIMES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

function mapStatus(s: BackendStatus): FrontendStatus {
  if (s === 1) return 'confirmed';
  if (s === 2) return 'canceled';
  return 'pending';
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                     options,
                                                     value,
                                                     onChange,
                                                     placeholder,
                                                     disabled = false,
                                                   }) => {
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
    if (disabled) return;
    if (!open) calculatePosition();
    setOpen(!open);
  };

  const selected = options.find((o) => o.value === value);

  return (
      <div className="custom-select-wrapper" ref={ref} style={disabled ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
        <div
            className={`custom-select-toggle ${open ? 'open' : ''}`}
            onClick={handleToggle}
            ref={toggleRef}
        >
        <span className={selected ? '' : 'placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
          <span className="custom-select-arrow">▾</span>
        </div>
        {open &&
            ReactDOM.createPortal(
                <div style={menuStyle} ref={menuRef}>
                  {options.map((option) => (
                      <div
                          key={option.value}
                          className={`custom-select-item ${value === option.value ? 'selected' : ''}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (option.disabled) return;
                            onChange(option.value);
                            setOpen(false);
                          }}
                          style={option.disabled ? {
                            cursor: 'not-allowed',
                            background: '#fef2f2',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          } : {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                      >
                <span style={{ color: option.disabled ? '#9ca3af' : 'inherit' }}>
                  {option.label}
                </span>
                        {option.disabled && (
                            <span style={{
                              fontSize: '0.8rem',
                              color: '#ef4444',
                              fontWeight: 600,
                              marginLeft: '8px',
                            }}>
                    Ocupat
                  </span>
                        )}
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
  const { userEmail, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    doctorId: '',
    specialization: '',
    date: '',
    time: '',
    reason: '',
  });

  const [medici, setMedici] = useState<MedicInfoDto[]>([]);
  const [loadingMedici, setLoadingMedici] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  useEffect(() => {
    const fetchMedici = async () => {
      try {
        const data = await api.get<MedicInfoDto[]>('/api/medic/list');
        setMedici(data);
      } catch {
        setApiError('Nu s-au putut încărca medicii. Încearcă să reîmprospătezi pagina.');
      } finally {
        setLoadingMedici(false);
      }
    };
    void fetchMedici();
  }, [api]);

  useEffect(() => {
    if (isAuthenticated && userEmail) {
      setFormData((prev) => ({ ...prev, email: userEmail }));
      void fetchAppointmentsByEmail(userEmail);
    }
  }, [isAuthenticated, userEmail]);

  useEffect(() => {
    const fetchOccupiedTimes = async () => {
      if (!formData.doctorId || !formData.date) {
        setOccupiedTimes([]);
        return;
      }

      const medic = medici.find((m) => String(m.id) === formData.doctorId);
      if (!medic) return;

      const doctorName = `${medic.firstName} ${medic.lastName}`;

      const normDr = (n: string) => n.toLowerCase().replace('dr.', '').trim().split(/\s+/).sort().join(' ');

      setLoadingTimes(true);
      try {
        const allAppointments = await api.get<AppointmentInfoDto[]>('/api/appointment/list');

        const occupied = allAppointments
            .filter(
                (a) =>
                    normDr(a.doctorName) === normDr(doctorName) &&
                    a.appointmentDate === formData.date &&
                    a.status !== 2
            )
            .map((a) => a.appointmentTime?.substring(0, 5) ?? '');

        setOccupiedTimes(occupied);

        if (formData.time && occupied.includes(formData.time)) {
          setFormData((prev) => ({ ...prev, time: '' }));
        }
      } catch {
        setOccupiedTimes([]);
      } finally {
        setLoadingTimes(false);
      }
    };

    void fetchOccupiedTimes();
  }, [formData.doctorId, formData.date, medici]);

  const mapDto = (dto: AppointmentInfoDto): Appointment => ({
    id: dto.id,
    patientName: dto.patientName,
    phone: dto.phone,
    email: dto.email,
    doctor: dto.doctorName,
    specialization: dto.serviceName,
    time: dto.appointmentTime?.substring(0, 5) ?? '',
    date: dto.appointmentDate ?? '',
    reason: dto.reasonForVisit,
    status: mapStatus(dto.status),
  });

  const fetchAppointmentsByEmail = async (email: string) => {
    if (!email || !email.includes('@')) return;
    setLoadingAppointments(true);
    setApiError(null);
    try {
      const data = await api.get<AppointmentInfoDto[]>(
          `/api/appointment/byEmail/${encodeURIComponent(email)}`
      );
      setAppointments(data.map(mapDto));
    } catch {
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailBlur = () => {
    void fetchAppointmentsByEmail(formData.email);
  };

  const handleDoctorChange = (doctorId: string) => {
    const medic = medici.find((m) => String(m.id) === doctorId);
    const specialization = medic
        ? MEDIC_SPECIALITY_LABELS[medic.specialty] ?? ''
        : '';
    setFormData((prev) => ({
      ...prev,
      doctorId,
      specialization,
      time: '',
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
      time: '',
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.patientName.trim()) { alert(t.apptPatientName); return false; }
    if (!formData.phone.trim()) { alert(t.apptPhone); return false; }
    if (!formData.email.trim() || !formData.email.includes('@')) { alert(t.apptEmail); return false; }
    if (!formData.doctorId) { alert(t.apptSelectDoctor); return false; }
    if (!formData.date) { alert(t.apptDate); return false; }
    if (!formData.time) { alert(t.apptTime); return false; }
    if (!formData.reason.trim()) { alert(t.apptReason); return false; }
    return true;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const medic = medici.find((m) => String(m.id) === formData.doctorId);

    const payload = {
      patientName: formData.patientName,
      phone: formData.phone,
      email: formData.email,
      doctorName: medic ? `${medic.firstName} ${medic.lastName}` : '',
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
      setFormData({
        patientName: '',
        phone: '',
        email: isAuthenticated && userEmail ? userEmail : '',
        doctorId: '',
        specialization: '',
        date: '',
        time: '',
        reason: '',
      });
      setOccupiedTimes([]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setApiError('A apărut o eroare la salvarea programării. Încearcă din nou.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusLabel = (status: FrontendStatus) => {
    if (status === 'confirmed') return t.apptConfirmed;
    if (status === 'pending') return t.apptPending;
    if (status === 'canceled') return t.apptCanceled;
    return status;
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  };

  const handleCancelAppointment = async (id: number) => {
    if (!window.confirm(t.apptCancelConfirm)) return;
    try {
      await api.patch(`/api/appointment/${id}/status`, { status: 2 });
      setAppointments((prev) =>
          prev.map((apt) =>
              apt.id === id ? { ...apt, status: 'canceled' as const } : apt
          )
      );
    } catch {
      setApiError('Nu s-a putut anula programarea. Încearcă din nou.');
    }
  };

  const doctorOptions = medici.map((m) => ({
    value: String(m.id),
    label: `${m.firstName} ${m.lastName} — ${MEDIC_SPECIALITY_LABELS[m.specialty] ?? ''}`,
  }));

  const timeOptions = ALL_TIMES.map((time) => ({
    value: time,
    label: time,
    disabled: occupiedTimes.includes(time),
  }));

  const canSelectTime = !!formData.doctorId && !!formData.date;

  return (
      <>
        <div className="appointments-page">
          <Navbar />
          <div className="appointments-container">
            <h1 className="page-title">{t.apptTitle}</h1>

            {showSuccess && <div className="success-message">{t.apptSuccess}</div>}

            {apiError && (
                <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                  {apiError}
                </div>
            )}

            <div className="form-card">
              <h2 className="section-title">{t.apptFormTitle}</h2>
              <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptPatientName}</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.apptPhone}</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
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
                      readOnly={isAuthenticated && !!userEmail}
                      style={isAuthenticated && userEmail ? { background: '#f1f5f9' } : {}}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptSelectDoctor}</label>
                    <CustomSelect
                        options={doctorOptions}
                        value={formData.doctorId}
                        onChange={handleDoctorChange}
                        placeholder={
                          loadingMedici ? 'Se încarcă medicii...' : `-- ${t.apptSelectDoctor} --`
                        }
                        disabled={loadingMedici}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.apptSpecialization}</label>
                    <input
                        type="text"
                        value={formData.specialization}
                        readOnly
                        style={{ background: '#f1f5f9' }}
                        placeholder={`-- ${t.apptSpecialization} --`}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.apptDate}</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        min={getMinDate()}
                        max={getMaxDate()}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      {t.apptTime}
                      {loadingTimes && (
                          <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '8px' }}>
                        Se verifică orele...
                      </span>
                      )}
                    </label>
                    <CustomSelect
                        options={timeOptions}
                        value={formData.time}
                        onChange={(val) => setFormData((prev) => ({ ...prev, time: val }))}
                        placeholder={
                          !canSelectTime
                              ? 'Selectează mai întâi medicul și data'
                              : `-- ${t.apptTime} --`
                        }
                        disabled={!canSelectTime || loadingTimes}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.apptReason}</label>
                  <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={4}
                      required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Se trimite...' : t.apptSubmit}
                </button>
              </form>
            </div>

            {loadingAppointments && (
                <p style={{ textAlign: 'center', margin: '1rem 0' }}>
                  Se încarcă programările...
                </p>
            )}

            {!loadingAppointments && appointments.length > 0 && (
                <div className="appointments-list-card">
                  <h2 className="section-title">{t.apptMyList}</h2>
                  <div className="appointments-grid">
                    {appointments.map((appointment) => (
                        <div key={appointment.id} className="appointment-item">
                          <div className="appointment-header">
                            <h3>{appointment.patientName}</h3>
                            <span className={`status-badge status-${appointment.status}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                          </div>
                          <div className="appointment-details">
                            <div className="detail-row">
                              <span className="detail-label">{t.apptPhone}:</span>
                              <span className="detail-value">{appointment.phone}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.apptEmail}:</span>
                              <span className="detail-value">{appointment.email}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.adminDoctors}:</span>
                              <span className="detail-value">{appointment.doctor}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.apptSpecialization}:</span>
                              <span className="detail-value">{appointment.specialization}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.apptDate}:</span>
                              <span className="detail-value">{appointment.date}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.apptTime}:</span>
                              <span className="detail-value">{appointment.time}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">{t.apptReason}:</span>
                              <span className="detail-value">{appointment.reason}</span>
                            </div>
                          </div>
                          {appointment.status !== 'canceled' && (
                              <button
                                  className="cancel-btn"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                              >
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
