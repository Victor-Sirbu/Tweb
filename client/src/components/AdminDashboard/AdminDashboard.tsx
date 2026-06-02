import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './AdminDashboard.css';
import { useLanguage } from '../../context/LanguageContext';
import AdminNavbar from '../../shared/AdminNavbar/AdminNavbar';
import Footer from '../../shared/Footer/Footer';
import { translateSpecialization } from '../../utils/translateSpecialization';
import { useApi } from '../../api/context';
import { useAuth } from '../../context/AuthContext';
import { useAudit } from '../../context/AuditContext';

interface PatientAPI {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  userAccountId?: number;
}

interface DoctorAPI {
  id: number;
  firstName: string;
  lastName: string;
  specialty: number;
  isDeleted: boolean;
}

interface AppointmentAPI {
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  doctorName: string;
  status: number;
  phone?: string;
  email?: string;
  serviceName?: string;
  reasonForVisit?: string;
}

interface ReviewAPI {
  id: number;
  authorName: string;
  reviewText: string;
  rating: number;
  createdAt: string;
}

interface NewsAPI {
  id: number;
  name: string;
  description: string;
  type: number;
  date: string;
}

interface ServiceAPI {
  id: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDuration: number;
  category: number;
  isDeleted: boolean;
}

const SPECIALITY_MAP: Record<number, string> = {
  0: 'Cardiologie', 1: 'Pediatrie', 2: 'Neurologie', 3: 'Dermatologie',
  4: 'Oftalmologie', 5: 'Stomatologie', 6: 'Chirurgie', 7: 'Ortopedie',
  8: 'Ginecologie', 9: 'Urologie', 10: 'Psihiatrie', 11: 'Medicina Generala',
};

const ALL_TIMES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

type NewsType = 'ServiciuNou' | 'Promotie' | 'MedicNou' | 'ActualizarePret';

const NEWS_TYPE_NUM: Record<NewsType, number> = {
  ServiciuNou: 0, Promotie: 1, MedicNou: 2, ActualizarePret: 3,
};

const NEWS_TYPE_LABELS: Record<NewsType, { ro: string; ru: string; en: string }> = {
  ServiciuNou:     { ro: 'Serviciu nou',    ru: 'Новая услуга',    en: 'New service'   },
  Promotie:        { ro: 'Promoție',         ru: 'Акция',           en: 'Promotion'     },
  MedicNou:        { ro: 'Medic nou',        ru: 'Новый врач',      en: 'New doctor'    },
  ActualizarePret: { ro: 'Actualizare preț', ru: 'Обновление цены', en: 'Price update'  },
};

interface PatientPickerProps {
  filtered: PatientAPI[];
  selected: number[];
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  allSel: boolean;
  search: string;
  onSearch: (v: string) => void;
  title: string;
  count: number;
  language: string;
  getAvatar: (firstName: string, lastName: string) => string;
}

const PatientPicker: React.FC<PatientPickerProps> = ({
                                                       filtered, selected, onToggle, onToggleAll, allSel,
                                                       search, onSearch, title, count, language, getAvatar,
                                                     }) => {
  const lbl = (ro: string, ru: string, en: string) =>
      language === 'ru' ? ru : language === 'en' ? en : ro;

  return (
      <div className="patients-selection-panel">
        <div className="panel-header">
          <h3>{title}</h3>
          <span className="selected-count">
          {count} {lbl('selectați', 'выбрано', 'selected')}
        </span>
        </div>
        <div className="search-patient-box">
          <input
              type="text"
              className="search-patient-input"
              placeholder={lbl('Caută după nume...', 'Поиск...', 'Search...')}
              value={search}
              onChange={e => onSearch(e.target.value)}
          />
        </div>
        <button
            type="button"
            className={`btn-select-all ${allSel ? 'btn-select-all--active' : ''}`}
            onClick={onToggleAll}
        >
          {allSel
              ? lbl('✓ Deselectează toți', '✓ Снять все', '✓ Deselect all')
              : lbl('Selectează toți', 'Выбрать всех', 'Select all')}
        </button>
        <div className="patients-list">
          {filtered.map(p => (
              <div
                  key={p.id}
                  className={`patient-select-card ${selected.includes(p.id) ? 'selected' : ''}`}
                  onClick={() => onToggle(p.id)}
              >
                <input type="checkbox" checked={selected.includes(p.id)} onChange={() => {}} />
                <div className="patient-avatar">{getAvatar(p.firstName, p.lastName)}</div>
                <div className="patient-details">
                  <span className="patient-name">{p.firstName} {p.lastName}</span>
                  <span className="patient-email">{p.email}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

interface SelectOption { value: string; label: string; disabled?: boolean; }

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, required, disabled }) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const ref = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) return;
      if (menuRef.current && menuRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuMaxH = 260;
    if (spaceBelow >= menuMaxH) {
      setMenuStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 999999, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', maxHeight: `${menuMaxH}px`, overflowY: 'auto' });
    } else {
      setMenuStyle({ position: 'fixed', bottom: window.innerHeight - rect.top + 4, left: rect.left, width: rect.width, zIndex: 999999, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', maxHeight: `${menuMaxH}px`, overflowY: 'auto' });
    }
    setOpen(v => !v);
  };

  const selected = options.find(o => o.value === value);

  return (
      <div className="modal-custom-dropdown" ref={ref} style={disabled ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
        <button type="button" ref={btnRef} className={`modal-custom-toggle ${open ? 'open' : ''} ${required && !value ? 'required-empty' : ''}`} onClick={handleToggle}>
          <span className={selected ? '' : 'placeholder-text'}>{selected ? selected.label : (placeholder ?? '-- Alege --')}</span>
          <span className="modal-dropdown-arrow">▾</span>
        </button>
        {open && ReactDOM.createPortal(
            <div style={menuStyle} ref={menuRef}>
              {options.map(opt => (
                  <div
                      key={opt.value}
                      className={`modal-custom-item ${opt.value === value ? 'selected' : ''}`}
                      onClick={() => {
                        if (opt.disabled) return;
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      style={opt.disabled ? {
                        color: '#9ca3af',
                        cursor: 'not-allowed',
                        background: '#fef2f2',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      } : { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{opt.label}</span>
                    {opt.disabled && <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, marginLeft: '8px' }}>Ocupat</span>}
                  </div>
              ))}
            </div>,
            document.body
        )}
      </div>
  );
};

type Section = 'statistici' | 'programari' | 'pacienti' | 'medici' | 'notificari' | 'noutati' | 'recenzii' | 'servicii';

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const api = useApi();
  const { user } = useAuth();
  const { logAction } = useAudit();

  const adminName = user?.name ?? 'Admin';
  const adminRole = 'Administrator';

  const log = useCallback((
      action: string,
      actionType: 'edit' | 'delete' | 'modify' | 'create' | 'login',
      target: string,
      targetType: 'patient' | 'appointment' | 'record' | 'user' | 'system' | 'medic' | 'service' | 'review' | 'notification' | 'news',
      details: string
  ) => {
    logAction({ action, actionType, target, targetType, details, adminName, adminRole });
  }, [logAction, adminName, adminRole]);

  const lbl = (ro: string, ru: string, en: string) =>
      language === 'ru' ? ru : language === 'en' ? en : ro;

  const newsTypeLabel = (type: NewsType) =>
      NEWS_TYPE_LABELS[type][language as 'ro' | 'ru' | 'en'] ?? NEWS_TYPE_LABELS[type].ro;

  const getAvatar = (firstName: string, lastName: string) =>
      `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  const [activeSection, setActiveSection] = useState<Section>('statistici');

  const [patients, setPatients] = useState<PatientAPI[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientAPI | null>(null);
  const [patientFormData, setPatientFormData] = useState({ firstName: '', lastName: '', dateOfBirth: '', sex: '', email: '', phone: '' });

  const fetchPatients = useCallback(async () => {
    setLoadingPatients(true);
    try {
      const d = await api.get<PatientAPI[]>('/api/patients/list');
      setPatients(d ?? []);
    } catch {
      setPatients([]);
    } finally {
      setLoadingPatients(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'pacienti' || activeSection === 'statistici') void fetchPatients();
  }, [activeSection, fetchPatients]);

  const filteredPatients = patients.filter(p => {
    const name = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchSearch = name.includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || (statusFilter === 'Active' ? !p.isDeleted : p.isDeleted);
    return matchSearch && matchStatus;
  });

  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        await api.put(`/api/patients/Update/${editingPatient.id}`, patientFormData);
        log('Editare pacient', 'edit', `${patientFormData.firstName} ${patientFormData.lastName}`, 'patient', `Datele pacientului au fost actualizate.`);
      } else {
        await api.post('/api/patients/Create', patientFormData);
        log('Creare pacient', 'create', `${patientFormData.firstName} ${patientFormData.lastName}`, 'patient', `Pacient nou adăugat în sistem.`);
      }
      setShowPatientModal(false);
      setEditingPatient(null);
      await fetchPatients();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const handleDeletePatient = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți?', 'Удалить?', 'Delete?'))) return;
    const patient = patients.find(p => p.id === id);
    try {
      await api.delete(`/api/patients/${id}`);
      setPatients(prev => prev.map(p => p.id === id ? { ...p, isDeleted: true } : p));
      log('Ștergere pacient', 'delete', `${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`, 'patient', `Pacientul a fost marcat ca șters.`);
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const [doctors, setDoctors] = useState<DoctorAPI[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorAPI | null>(null);
  const [doctorFormData, setDoctorFormData] = useState({ firstName: '', lastName: '', specialty: 0 });
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [doctorStatusFilter, setDoctorStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [doctorDropdownOpen, setDoctorDropdownOpen] = useState(false);

  const fetchDoctors = useCallback(async () => {
    setLoadingDoctors(true);
    try {
      const d = await api.get<DoctorAPI[]>('/api/medic/list');
      setDoctors(d ?? []);
    } catch {
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'medici' || activeSection === 'statistici' || activeSection === 'programari') void fetchDoctors();
  }, [activeSection, fetchDoctors]);

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { firstName: doctorFormData.firstName, lastName: doctorFormData.lastName, speciality: doctorFormData.specialty };
      if (editingDoctor) {
        await api.put(`/api/medic/update/${editingDoctor.id}`, payload);
        log('Editare medic', 'edit', `${doctorFormData.firstName} ${doctorFormData.lastName}`, 'medic', `Datele medicului au fost actualizate.`);
      } else {
        await api.post('/api/medic/Create', payload);
        log('Creare medic', 'create', `${doctorFormData.firstName} ${doctorFormData.lastName}`, 'medic', `Medic nou adăugat în sistem.`);
      }
      setShowDoctorModal(false);
      setEditingDoctor(null);
      await fetchDoctors();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți?', 'Удалить?', 'Delete?'))) return;
    const doctor = doctors.find(d => d.id === id);
    try {
      await api.delete(`/api/medic/${id}`);
      setDoctors(prev => prev.filter(d => d.id !== id));
      log('Ștergere medic', 'delete', `${doctor?.firstName ?? ''} ${doctor?.lastName ?? ''}`, 'medic', `Medicul a fost șters din sistem.`);
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const [appointments, setAppointments] = useState<AppointmentAPI[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [showApptModal, setShowApptModal] = useState(false);
  const [editingAppt, setEditingAppt] = useState<AppointmentAPI | null>(null);
  const [apptFormData, setApptFormData] = useState({ patientName: '', phone: '', email: '', doctorName: '', serviceName: '', reasonForVisit: '', appointmentTime: '', appointmentDate: '', status: 0 });
  const [apptSpecialityFilter, setApptSpecialityFilter] = useState<number | ''>('');

  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoadingAppts(true);
    try {
      const d = await api.get<AppointmentAPI[]>('/api/appointment/list');
      setAppointments(d ?? []);
    } catch {
      setAppointments([]);
    } finally {
      setLoadingAppts(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'programari' || activeSection === 'statistici') void fetchAppointments();
  }, [activeSection, fetchAppointments]);

  useEffect(() => {
    if (!apptFormData.doctorName || !apptFormData.appointmentDate) {
      setOccupiedTimes([]);
      return;
    }
    setLoadingTimes(true);
    const occupied = appointments
        .filter(a =>
            a.doctorName === apptFormData.doctorName &&
            a.appointmentDate === apptFormData.appointmentDate &&
            a.status !== 2 &&
            (!editingAppt || a.id !== editingAppt.id)
        )
        .map(a => a.appointmentTime?.substring(0, 5) ?? '');
    setOccupiedTimes(occupied);
    if (apptFormData.appointmentTime && occupied.includes(apptFormData.appointmentTime)) {
      setApptFormData(prev => ({ ...prev, appointmentTime: '' }));
    }
    setLoadingTimes(false);
  }, [apptFormData.doctorName, apptFormData.appointmentDate, appointments, editingAppt]);

  const handleSaveAppt = async (e: React.FormEvent) => {
    e.preventDefault();
    const timeValue = apptFormData.appointmentTime.length === 5 ? `${apptFormData.appointmentTime}:00` : apptFormData.appointmentTime;
    const payload = { patientName: apptFormData.patientName, phone: apptFormData.phone, email: apptFormData.email, doctorName: apptFormData.doctorName, serviceName: apptFormData.serviceName, reasonForVisit: apptFormData.reasonForVisit, appointmentTime: timeValue, appointmentDate: apptFormData.appointmentDate };
    try {
      if (editingAppt) {
        await api.put(`/api/appointment/update/${editingAppt.id}`, payload);
        if (apptFormData.status !== editingAppt.status) await api.patch(`/api/appointment/${editingAppt.id}/status`, { status: apptFormData.status });
        log('Editare programare', 'edit', `${apptFormData.patientName} — ${apptFormData.doctorName}`, 'appointment', `Programarea din ${apptFormData.appointmentDate} a fost actualizată.`);
      } else {
        await api.post('/api/appointment/create', payload);
        log('Creare programare', 'create', `${apptFormData.patientName} — ${apptFormData.doctorName}`, 'appointment', `Programare nouă creată pentru ${apptFormData.appointmentDate}.`);
      }
      setShowApptModal(false);
      setEditingAppt(null);
      setOccupiedTimes([]);
      await fetchAppointments();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const handleDeleteAppt = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți?', 'Удалить?', 'Delete?'))) return;
    const appt = appointments.find(a => a.id === id);
    try {
      await api.delete(`/api/appointment/${id}`);
      setAppointments(prev => prev.filter(a => a.id !== id));
      log('Ștergere programare', 'delete', `${appt?.patientName ?? ''} — ${appt?.doctorName ?? ''}`, 'appointment', `Programarea a fost ștearsă.`);
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const apptStatusLabel = (s: number) => {
    if (s === 0) return lbl('În așteptare', 'В ожидании', 'Pending');
    if (s === 1) return lbl('Confirmat', 'Подтверждён', 'Confirmed');
    return lbl('Anulat', 'Отменён', 'Cancelled');
  };

  const canSelectTime = !!apptFormData.doctorName && !!apptFormData.appointmentDate;
  const timeOptions: SelectOption[] = ALL_TIMES.map(time => ({
    value: time,
    label: time,
    disabled: occupiedTimes.includes(time),
  }));

  const [reviews, setReviews] = useState<ReviewAPI[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewAPI | null>(null);
  const [reviewFormData, setReviewFormData] = useState({ reviewText: '', rating: 5 });

  const fetchReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const d = await api.get<ReviewAPI[]>('/api/reviews/list');
      setReviews(d ?? []);
    } catch {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'recenzii') void fetchReviews();
  }, [activeSection, fetchReviews]);

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    const payload = { authorName: editingReview.authorName, reviewText: reviewFormData.reviewText, rating: reviewFormData.rating };
    try {
      await api.put(`/api/reviews/update/${editingReview.id}`, payload);
      log('Editare recenzie', 'edit', editingReview.authorName, 'review', `Rating actualizat la ${reviewFormData.rating}/5.`);
      setShowReviewModal(false);
      setEditingReview(null);
      await fetchReviews();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți?', 'Удалить?', 'Delete?'))) return;
    const review = reviews.find(r => r.id === id);
    try {
      await api.delete(`/api/reviews/${id}`);
      setReviews(prev => prev.filter(r => r.id !== id));
      log('Ștergere recenzie', 'delete', review?.authorName ?? '', 'review', `Recenzia a fost ștearsă.`);
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const [services, setServices] = useState<ServiceAPI[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceAPI | null>(null);
  const [serviceFormData, setServiceFormData] = useState({ serviceName: '', serviceDescription: '', servicePrice: '', serviceDuration: '', category: 0 });

  const fetchServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const d = await api.get<ServiceAPI[]>('/api/service/list');
      setServices(d ?? []);
    } catch {
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'servicii') void fetchServices();
  }, [activeSection, fetchServices]);

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { serviceName: serviceFormData.serviceName, serviceDescription: serviceFormData.serviceDescription, servicePrice: parseFloat(serviceFormData.servicePrice), serviceDuration: parseInt(serviceFormData.serviceDuration), category: serviceFormData.category };
    try {
      if (editingService) {
        await api.put(`/api/service/update/${editingService.id}`, payload);
        log('Editare serviciu', 'edit', serviceFormData.serviceName, 'service', `Serviciul medical a fost actualizat.`);
      } else {
        await api.post('/api/service/create', payload);
        log('Creare serviciu', 'create', serviceFormData.serviceName, 'service', `Serviciu medical nou adăugat.`);
      }
      setShowServiceModal(false);
      setEditingService(null);
      await fetchServices();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți?', 'Удалить?', 'Delete?'))) return;
    const service = services.find(s => s.id === id);
    try {
      await api.delete(`/api/service/${id}`);
      setServices(prev => prev.map(s => s.id === id ? { ...s, isDeleted: true } : s));
      log('Ștergere serviciu', 'delete', service?.serviceName ?? '', 'service', `Serviciul medical a fost șters.`);
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const [notifPatients, setNotifPatients] = useState<PatientAPI[]>([]);
  const [selectedPatientIds, setSelectedPatientIds] = useState<number[]>([]);
  const [notifPatientSearch, setNotifPatientSearch] = useState('');
  const [notifFormData, setNotifFormData] = useState({ title: '', message: '' });
  const [notifHistory, setNotifHistory] = useState<Array<{
    id: number; patientNames: string[]; title: string; message: string; timestamp: string; ts: number;
  }>>(() => {
    try {
      const raw = localStorage.getItem('notif_history');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return parsed.filter((e: { ts: number }) => e.ts > cutoff);
    } catch { return []; }
  });
  const [expandedNotifIds, setExpandedNotifIds] = useState<number[]>([]);

  useEffect(() => {
    if (activeSection !== 'notificari') return;
    api.get<PatientAPI[]>('/api/patients/list')
        .then(d => setNotifPatients((d ?? []).filter(p => !p.isDeleted)))
        .catch(() => setNotifPatients([]));
  }, [activeSection, api]);

  const filteredNotifPatients = notifPatients.filter(p => {
    const name = `${p.firstName} ${p.lastName}`.toLowerCase();
    return name.includes(notifPatientSearch.toLowerCase()) || p.email.toLowerCase().includes(notifPatientSearch.toLowerCase());
  });

  const allNotifSelected = filteredNotifPatients.length > 0 && filteredNotifPatients.every(p => selectedPatientIds.includes(p.id));

  const toggleSelectAllNotif = () => {
    if (allNotifSelected) {
      setSelectedPatientIds(prev => prev.filter(id => !filteredNotifPatients.some(p => p.id === id)));
    } else {
      setSelectedPatientIds(prev => [...new Set([...prev, ...filteredNotifPatients.map(p => p.id)])]);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatientIds.length === 0) {
      alert(lbl('Selectați cel puțin un pacient', 'Выберите пациента', 'Select a patient'));
      return;
    }
    const patientsWithoutAccount = notifPatients.filter(p => selectedPatientIds.includes(p.id) && !p.userAccountId);
    if (patientsWithoutAccount.length > 0) {
      const names = patientsWithoutAccount.map(p => `${p.firstName} ${p.lastName}`).join(', ');
      alert(lbl(`Acești pacienți nu au cont de utilizator și nu pot primi notificări: ${names}`, `Эти пациенты не имеют аккаунта: ${names}`, `These patients have no account: ${names}`));
      return;
    }
    try {
      await Promise.all(
          selectedPatientIds.map(patientId => {
            const patient = notifPatients.find(p => p.id === patientId);
            const userId = patient?.userAccountId ?? patientId;
            return api.post('/api/notification/create', { userId, title: notifFormData.title, message: notifFormData.message });
          })
      );
      const names = notifPatients.filter(p => selectedPatientIds.includes(p.id)).map(p => `${p.firstName} ${p.lastName}`);
      const newNotifEntry = { id: Date.now(), patientNames: names, title: notifFormData.title, message: notifFormData.message, timestamp: new Date().toLocaleString(), ts: Date.now() };
      setNotifHistory(prev => {
        const updated = [newNotifEntry, ...prev];
        try { localStorage.setItem('notif_history', JSON.stringify(updated)); } catch { /* storage full */ }
        return updated;
      });
      log('Trimitere notificare', 'create', names.join(', '), 'notification', `Notificare "${notifFormData.title}" trimisă la ${names.length} pacienți.`);
      setNotifFormData({ title: '', message: '' });
      setSelectedPatientIds([]);
      alert(lbl(`Trimis la ${names.length} pacienți`, `Отправлено ${names.length} пациентам`, `Sent to ${names.length} patients`));
    } catch {
      alert(lbl('Eroare la trimitere', 'Ошибка отправки', 'Send error'));
    }
  };

  const [newsFormData, setNewsFormData] = useState({ name: '', description: '', type: 'ServiciuNou' as NewsType });
  const [publishedNews, setPublishedNews] = useState<NewsAPI[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [expandedNewsIds, setExpandedNewsIds] = useState<number[]>([]);
  const [editingNews, setEditingNews] = useState<NewsAPI | null>(null);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsEditForm, setNewsEditForm] = useState({ name: '', description: '', type: 'ServiciuNou' as NewsType });

  const NUM_TO_NEWS_TYPE: Record<number, NewsType> = { 0: 'ServiciuNou', 1: 'Promotie', 2: 'MedicNou', 3: 'ActualizarePret' };

  const fetchPublishedNews = useCallback(async () => {
    setLoadingNews(true);
    try {
      const d = await api.get<NewsAPI[]>('/api/news/list');
      setPublishedNews((d ?? []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch {
      setPublishedNews([]);
    } finally {
      setLoadingNews(false);
    }
  }, [api]);

  useEffect(() => {
    if (activeSection === 'noutati') void fetchPublishedNews();
  }, [activeSection, fetchPublishedNews]);

  const handleSendNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/news/create', { name: newsFormData.name, description: newsFormData.description, type: NEWS_TYPE_NUM[newsFormData.type] });
      log('Publicare noutate', 'create', newsFormData.name, 'news', `Noutate de tip "${newsTypeLabel(newsFormData.type)}" publicată pentru toți pacienții.`);
      setNewsFormData({ name: '', description: '', type: 'ServiciuNou' });
      alert(lbl('Noutate publicată pentru toți pacienții!', 'Новость опубликована для всех пациентов!', 'News published for all patients!'));
      void fetchPublishedNews();
    } catch {
      alert(lbl('Eroare la publicare', 'Ошибка публикации', 'Publish error'));
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!window.confirm(lbl('Sigur doriți să ștergeți noutatea?', 'Удалить новость?', 'Delete this news?'))) return;
    try {
      await api.delete(`/api/news/${id}`);
      log('Ștergere noutate', 'delete', String(id), 'news', 'Noutatea a fost ștearsă.');
      void fetchPublishedNews();
    } catch {
      alert(lbl('Eroare la ștergere', 'Ошибка удаления', 'Delete error'));
    }
  };

  const handleEditNews = (news: NewsAPI) => {
    setEditingNews(news);
    setNewsEditForm({ name: news.name, description: news.description, type: NUM_TO_NEWS_TYPE[news.type] ?? 'ServiciuNou' });
    setShowNewsModal(true);
  };

  const handleSaveEditNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    try {
      await api.put(`/api/news/update/${editingNews.id}`, { name: newsEditForm.name, description: newsEditForm.description, type: NEWS_TYPE_NUM[newsEditForm.type] });
      log('Editare noutate', 'edit', newsEditForm.name, 'news', 'Noutatea a fost actualizată.');
      setShowNewsModal(false);
      setEditingNews(null);
      void fetchPublishedNews();
    } catch {
      alert(lbl('Eroare la salvare', 'Ошибка', 'Error saving'));
    }
  };

  const filteredDoctors = doctors.filter(d => {
    const name = `${d.firstName} ${d.lastName}`.toLowerCase();
    const matchSearch = name.includes(doctorSearchTerm.toLowerCase());
    const matchStatus = doctorStatusFilter === 'All' || (doctorStatusFilter === 'Active' ? !d.isDeleted : d.isDeleted);
    return matchSearch && matchStatus;
  });

  const statCards = [
    { label: t.adminTotalPatients, value: patients.length, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', bars: [40,55,45,70,60,80,100], icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
    { label: t.adminActivePatients, value: patients.filter(p => !p.isDeleted).length, color: '#10b981', bg: 'rgba(16,185,129,0.1)', bars: [50,65,55,75,90,80,100], icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>) },
    { label: t.adminTodayAppts, value: appointments.length, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', bars: [30,80,50,40,70,60,100], icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>) },
    { label: t.adminActiveDoctors, value: doctors.filter(d => !d.isDeleted).length, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', bars: [60,60,80,80,100,100,100], icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>) },
  ];

  const navItems: [Section, string][] = [
    ['statistici', t.adminStats], ['programari', t.adminAppts], ['pacienti', t.adminPatients], ['medici', t.adminDoctors],
    ['notificari', lbl('Notificări', 'Уведомления', 'Notifications')],
    ['noutati', lbl('Noutăți', 'Новости', 'News')],
    ['recenzii', lbl('Recenzii', 'Отзывы', 'Reviews')],
    ['servicii', lbl('Servicii Medicale', 'Медицинские услуги', 'Medical Services')],
  ];

  return (
      <div className="admin-page-wrapper">
        <AdminNavbar />
        <div className="admin-dashboard">
          <aside className="sidebar">
            <div className="sidebar-header"></div>
            <nav className="sidebar-nav">
              {navItems.map(([key, label]) => (
                  <a key={key} href="#" className={`nav-item ${activeSection === key ? 'active' : ''}`} onClick={e => { e.preventDefault(); setActiveSection(key); }}>
                    {label}
                  </a>
              ))}
            </nav>
          </aside>

          <main className="main-content">
            <div className="content-wrapper">

              {activeSection === 'statistici' && (
                  <div className="section-content">
                    <div className="stats-grid">
                      {statCards.map((card, i) => (
                          <div className="stat-card" key={i}>
                            <div className="stat-card-top"><div className="stat-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div></div>
                            <p className="stat-number">{card.value}</p>
                            <p className="stat-label">{card.label}</p>
                            <div className="mini-bar">{card.bars.map((h, j) => (<span key={j} style={{ height: `${h}%`, background: card.color, opacity: j === card.bars.length - 1 ? 1 : 0.5 + j * 0.07 }} />))}</div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {activeSection === 'programari' && (
                  <div className="section-content">
                    <div className="section-top-bar">
                      <h2 className="section-top-title">{t.adminAppts}</h2>
                      <button className="btn-action btn-create" onClick={() => { setEditingAppt(null); setApptSpecialityFilter(''); setOccupiedTimes([]); setApptFormData({ patientName: '', phone: '', email: '', doctorName: '', serviceName: '', reasonForVisit: '', appointmentTime: '', appointmentDate: '', status: 0 }); setShowApptModal(true); }}>
                        + {lbl('Adaugă Programare', 'Добавить запись', 'Add Appointment')}
                      </button>
                    </div>
                    {loadingAppts ? <p>{lbl('Se încarcă...', 'Загрузка...', 'Loading...')}</p> : (
                        <div className="table-container">
                          <table className="patients-table">
                            <thead><tr><th>{lbl('Data','Дата','Date')}</th><th>{lbl('Ora','Время','Time')}</th><th>{lbl('Pacient','Пациент','Patient')}</th><th>{lbl('Medic','Врач','Doctor')}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                            <tbody>
                            {appointments.map(a => (
                                <tr key={a.id}>
                                  <td>{a.appointmentDate}</td><td>{a.appointmentTime?.substring(0,5)}</td><td>{a.patientName}</td><td>{a.doctorName}</td>
                                  <td><span className={`status-badge ${a.status === 1 ? 'active' : 'inactive'}`}>{apptStatusLabel(a.status)}</span></td>
                                  <td><div className="action-buttons">
                                    <button className="btn-action btn-edit" onClick={() => { setEditingAppt(a); setApptSpecialityFilter(''); setOccupiedTimes([]); setApptFormData({ patientName: a.patientName, phone: a.phone??'', email: a.email??'', doctorName: a.doctorName, serviceName: a.serviceName??'', reasonForVisit: a.reasonForVisit??'', appointmentTime: a.appointmentTime?.substring(0,5)??'', appointmentDate: a.appointmentDate, status: a.status }); setShowApptModal(true); }}>{t.adminEdit}</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeleteAppt(a.id)}>{t.adminDelete}</button>
                                  </div></td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                    )}
                  </div>
              )}

              {activeSection === 'pacienti' && (
                  <>
                    <div className="section-top-bar">
                      <div className="filters">
                        <input type="text" className="search-input" placeholder={t.adminSearch} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <div className="custom-dropdown">
                          <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {statusFilter === 'All' ? t.adminAllPatients : statusFilter === 'Active' ? t.adminActive : t.adminInactive}
                            <span className="dropdown-arrow">▾</span>
                          </button>
                          {dropdownOpen && (
                              <div className="dropdown-menu">
                                {(['All','Active','Inactive'] as const).map(opt => (
                                    <div key={opt} className={`dropdown-item ${statusFilter === opt ? 'selected' : ''}`} onClick={() => { setStatusFilter(opt); setDropdownOpen(false); }}>
                                      {opt === 'All' ? t.adminAllPatients : opt === 'Active' ? t.adminActive : t.adminInactive}
                                    </div>
                                ))}
                              </div>
                          )}
                        </div>
                      </div>
                      <button className="btn-action btn-create" onClick={() => { setEditingPatient(null); setPatientFormData({ firstName:'',lastName:'',dateOfBirth:'',sex:'',email:'',phone:'' }); setShowPatientModal(true); }}>
                        + {lbl('Adaugă Pacient','Добавить пациента','Add Patient')}
                      </button>
                    </div>
                    {loadingPatients ? <p>{lbl('Se încarcă...','Загрузка...','Loading...')}</p> : (
                        <div className="table-container">
                          <table className="patients-table">
                            <thead><tr><th>{t.adminName}</th><th>{t.adminPhone}</th><th>{t.adminEmail}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                            <tbody>
                            {filteredPatients.map(p => (
                                <tr key={p.id}>
                                  <td><div className="patient-info"><div className="patient-avatar">{getAvatar(p.firstName,p.lastName)}</div><span>{p.firstName} {p.lastName}</span></div></td>
                                  <td>{p.phone}</td><td>{p.email}</td>
                                  <td><span className={`status-badge ${p.isDeleted?'inactive':'active'}`}>{p.isDeleted?t.adminInactive:t.adminActive}</span></td>
                                  <td><div className="action-buttons">
                                    <button className="btn-action btn-edit" onClick={() => { setEditingPatient(p); setPatientFormData({ firstName:p.firstName,lastName:p.lastName,dateOfBirth:p.dateOfBirth,sex:p.sex,email:p.email,phone:p.phone }); setShowPatientModal(true); }}>{t.adminEdit}</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeletePatient(p.id)}>{t.adminDelete}</button>
                                  </div></td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                    )}
                  </>
              )}

              {activeSection === 'medici' && (
                  <>
                    <div className="section-top-bar">
                      <div className="filters">
                        <input type="text" className="search-input" placeholder={t.adminSearch} value={doctorSearchTerm} onChange={e => setDoctorSearchTerm(e.target.value)} />
                        <div className="custom-dropdown">
                          <button className="dropdown-toggle" onClick={() => setDoctorDropdownOpen(!doctorDropdownOpen)}>
                            {doctorStatusFilter === 'All' ? lbl('Toți medicii','Все врачи','All Doctors') : doctorStatusFilter === 'Active' ? t.adminActive : t.adminInactive}
                            <span className="dropdown-arrow">▾</span>
                          </button>
                          {doctorDropdownOpen && (
                              <div className="dropdown-menu">
                                {(['All','Active','Inactive'] as const).map(opt => (
                                    <div key={opt} className={`dropdown-item ${doctorStatusFilter === opt ? 'selected' : ''}`} onClick={() => { setDoctorStatusFilter(opt); setDoctorDropdownOpen(false); }}>
                                      {opt === 'All' ? lbl('Toți medicii','Все врачи','All Doctors') : opt === 'Active' ? t.adminActive : t.adminInactive}
                                    </div>
                                ))}
                              </div>
                          )}
                        </div>
                      </div>
                      <button className="btn-action btn-create" onClick={() => { setEditingDoctor(null); setDoctorFormData({ firstName:'',lastName:'',specialty:0 }); setShowDoctorModal(true); }}>
                        + {lbl('Adaugă Medic','Добавить врача','Add Doctor')}
                      </button>
                    </div>
                    {loadingDoctors ? <p>{lbl('Se încarcă...','Загрузка...','Loading...')}</p> : (
                        <div className="table-container">
                          <table className="patients-table">
                            <thead><tr><th>{lbl('Medic','Врач','Doctor')}</th><th>{lbl('Specialitate','Специальность','Speciality')}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                            <tbody>
                            {filteredDoctors.map(d => (
                                <tr key={d.id}>
                                  <td><div className="patient-info"><div className="patient-avatar">{getAvatar(d.firstName,d.lastName)}</div><span>{d.firstName} {d.lastName}</span></div></td>
                                  <td>{translateSpecialization(SPECIALITY_MAP[d.specialty]??String(d.specialty),language)}</td>
                                  <td><span className={`status-badge ${d.isDeleted?'inactive':'active'}`}>{d.isDeleted?t.adminInactive:t.adminActive}</span></td>
                                  <td><div className="action-buttons">
                                    <button className="btn-action btn-edit" onClick={() => { setEditingDoctor(d); setDoctorFormData({ firstName:d.firstName,lastName:d.lastName,specialty:d.specialty }); setShowDoctorModal(true); }}>{t.adminEdit}</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeleteDoctor(d.id)}>{t.adminDelete}</button>
                                  </div></td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                    )}
                  </>
              )}

              {activeSection === 'notificari' && (
                  <div className="section-content">
                    <div className="notifications-section">
                      <div className="notification-content-grid">
                        <PatientPicker filtered={filteredNotifPatients} selected={selectedPatientIds} onToggle={id => setSelectedPatientIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])} onToggleAll={toggleSelectAllNotif} allSel={allNotifSelected} search={notifPatientSearch} onSearch={setNotifPatientSearch} title={lbl('Pacienți','Пациенты','Patients')} count={selectedPatientIds.length} language={language} getAvatar={getAvatar} />
                        <div className="notification-form-panel">
                          <form onSubmit={handleSendNotification}>
                            <div className="form-group">
                              <label>{lbl('Titlu','Заголовок','Title')} * <span className="char-counter">{notifFormData.title.length}/50</span></label>
                              <input type="text" className="form-input" required maxLength={50} value={notifFormData.title} onChange={e => setNotifFormData({ ...notifFormData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                              <label>{lbl('Mesaj','Сообщение','Message')} * <span className="char-counter">{notifFormData.message.length}/200</span></label>
                              <textarea className="form-textarea" rows={6} required maxLength={200} value={notifFormData.message} onChange={e => setNotifFormData({ ...notifFormData, message: e.target.value })} />
                            </div>
                            <div className="form-actions">
                              <button type="submit" className="btn-send-notification">{lbl('Trimite','Отправить','Send')}</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="notification-history-section">
                        <h3 className="history-title">{lbl('Istoric Notificări','История уведомлений','Notification History')}</h3>
                        {notifHistory.length === 0 ? (
                            <div className="history-empty"><p>{lbl('Niciun istoric','История пуста','No history')}</p></div>
                        ) : (
                            <div className="history-list">
                              {notifHistory.map(entry => {
                                const isExp = expandedNotifIds.includes(entry.id);
                                return (
                                    <div key={entry.id} className="history-card">
                                      <div className="history-header"><div className="history-meta"><strong>{entry.title}</strong><span className="history-timestamp">{entry.timestamp}</span></div></div>
                                      <div className="history-recipients"><span className="recipients-label">{lbl('Către','Кому','To')}:</span><div className="recipients-tags">{entry.patientNames.map((n,i) => (<span key={i} className="recipient-tag">{n}</span>))}</div></div>
                                      {isExp && <div className="history-content"><p className="history-message">{entry.message}</p></div>}
                                      <button className="btn-toggle-details" onClick={() => setExpandedNotifIds(prev => prev.includes(entry.id) ? prev.filter(x => x !== entry.id) : [...prev, entry.id])}>
                                        {isExp ? lbl('Ascunde','Скрыть','Hide') : lbl('Detalii','Детали','Details')}
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

              {activeSection === 'noutati' && (
                  <div className="section-content">
                    <div className="news-page-layout">

                      <div className="news-form-card">
                        <div className="news-form-header">
                          <div className="news-form-header-icon"></div>
                          <div>
                            <h2 className="news-form-title">{lbl('Publică o Noutate','Опубликовать новость','Publish News')}</h2>
                            <p className="news-form-subtitle">{lbl('Noutatea va fi vizibilă tuturor pacienților','Новость будет видна всем пациентам','News will be visible to all patients')}</p>
                          </div>
                        </div>
                        <form onSubmit={handleSendNews}>
                          <div className="form-group">
                            <label>{lbl('Titlu','Заголовок','Title')} * <span className="char-counter">{newsFormData.name.length}/50</span></label>
                            <input type="text" className="form-input" required maxLength={50} placeholder={lbl('Ex: Reducere 20% la consultații...','Пример: Скидка 20%...','E.g. 20% off consultations...')} value={newsFormData.name} onChange={e => setNewsFormData({ ...newsFormData, name: e.target.value })} />
                          </div>
                          <div className="form-group">
                            <label>{lbl('Descriere','Описание','Description')} * <span className="char-counter">{newsFormData.description.length}/400</span></label>
                            <textarea className="form-textarea" rows={6} required maxLength={400} placeholder={lbl('Descrie noutatea în detaliu...','Опишите новость подробно...','Describe the news in detail...')} value={newsFormData.description} onChange={e => setNewsFormData({ ...newsFormData, description: e.target.value })} />
                          </div>
                          <div className="form-group">
                            <label>{lbl('Tip Noutate','Тип новости','News Type')}</label>
                            <CustomSelect options={(Object.keys(NEWS_TYPE_LABELS) as NewsType[]).map(type => ({ value: type, label: newsTypeLabel(type) }))} value={newsFormData.type} onChange={val => setNewsFormData({ ...newsFormData, type: val as NewsType })} />
                          </div>
                          <div className="news-form-actions">
                            <button type="submit" className="btn-publish-news">
                              <span></span> {lbl('Publică Noutatea','Опубликовать','Publish News')}
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className="news-history-card">
                        <div className="news-history-header">
                          <h3 className="news-history-title">{lbl('Noutăți Publicate','Опубликованные новости','Published News')}</h3>
                          <span className="news-history-count">{publishedNews.length}</span>
                        </div>
                        {loadingNews ? (
                            <div className="news-history-empty"><p>{lbl('Se încarcă...','Загрузка...','Loading...')}</p></div>
                        ) : publishedNews.length === 0 ? (
                            <div className="news-history-empty">
                              <p>{lbl('Nicio noutate publicată încă','Новостей пока нет','No news published yet')}</p>
                            </div>
                        ) : (
                            <div className="news-history-list">
                              {publishedNews.map(entry => {
                                const isExp = expandedNewsIds.includes(entry.id);
                                const typeKey = NUM_TO_NEWS_TYPE[entry.type] ?? 'ServiciuNou';
                                return (
                                    <div key={entry.id} className={`news-history-item ${isExp ? 'expanded' : ''}`}>
                                      <div className="news-item-top">
                                        <span className="news-type-badge">{newsTypeLabel(typeKey)}</span>
                                        <span className="news-item-timestamp">{new Date(entry.date).toLocaleString('ro-RO')}</span>
                                      </div>
                                      <strong className="news-item-title">{entry.name}</strong>
                                      {isExp && <p className="news-item-description">{entry.description}</p>}
                                      <div className="news-item-footer">
                                        <button className="btn-news-toggle" onClick={() => setExpandedNewsIds(prev => prev.includes(entry.id) ? prev.filter(x => x !== entry.id) : [...prev, entry.id])}>
                                          {isExp ? lbl('Ascunde','Скрыть','Hide') : lbl('Vezi descrierea','Подробнее','See description')}
                                        </button>
                                        <div className="news-item-actions">
                                          <button className="btn-news-edit" onClick={() => handleEditNews(entry)}>{lbl('Editează','Редактировать','Edit')}</button>
                                          <button className="btn-news-delete" onClick={() => handleDeleteNews(entry.id)}>{lbl('Șterge','Удалить','Delete')}</button>
                                        </div>
                                      </div>
                                    </div>
                                );
                              })}
                            </div>
                        )}
                      </div>

                    </div>
                  </div>
              )}

              {activeSection === 'recenzii' && (
                  <div className="section-content">
                    <div className="section-top-bar"><h2 className="section-top-title">{lbl('Recenzii Pacienți','Отзывы пациентов','Patient Reviews')}</h2></div>
                    {loadingReviews ? <p>{lbl('Se încarcă...','Загрузка...','Loading...')}</p> : (
                        <div className="table-container">
                          <table className="patients-table">
                            <thead><tr><th>{lbl('Pacient','Пациент','Patient')}</th><th>{lbl('Rating','Рейтинг','Rating')}</th><th>{lbl('Comentariu','Комментарий','Comment')}</th><th>{lbl('Data','Дата','Date')}</th><th>{t.adminActions}</th></tr></thead>
                            <tbody>
                            {reviews.map(r => (
                                <tr key={r.id}>
                                  <td><div className="patient-info"><div className="patient-avatar">{r.authorName?.[0]?.toUpperCase()??'?'}</div><span>{r.authorName}</span></div></td>
                                  <td>{'⭐'.repeat(r.rating)}</td>
                                  <td style={{ maxWidth:'300px' }}>{r.reviewText}</td>
                                  <td>{new Date(r.createdAt).toLocaleDateString('ro-RO')}</td>
                                  <td><div className="action-buttons">
                                    <button className="btn-action btn-edit" onClick={() => { setEditingReview(r); setReviewFormData({ reviewText:r.reviewText,rating:r.rating }); setShowReviewModal(true); }}>{t.adminEdit}</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeleteReview(r.id)}>{t.adminDelete}</button>
                                  </div></td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                    )}
                  </div>
              )}

              {activeSection === 'servicii' && (
                  <div className="section-content">
                    <div className="section-top-bar">
                      <h2 className="section-top-title">{lbl('Servicii Medicale','Медицинские услуги','Medical Services')}</h2>
                      <button className="btn-action btn-create" onClick={() => { setEditingService(null); setServiceFormData({ serviceName:'',serviceDescription:'',servicePrice:'',serviceDuration:'',category:0 }); setShowServiceModal(true); }}>
                        + {lbl('Adaugă Serviciu','Добавить услугу','Add Service')}
                      </button>
                    </div>
                    {loadingServices ? <p>{lbl('Se încarcă...','Загрузка...','Loading...')}</p> : (
                        <div className="table-container">
                          <table className="patients-table">
                            <thead><tr><th>{lbl('Nume','Название','Name')}</th><th>{lbl('Descriere','Описание','Description')}</th><th>{lbl('Preț (MDL)','Цена','Price')}</th><th>{lbl('Durată (min)','Прод.','Duration')}</th><th>{t.adminStatus}</th><th>{t.adminActions}</th></tr></thead>
                            <tbody>
                            {services.map(s => (
                                <tr key={s.id}>
                                  <td>{s.serviceName}</td><td>{s.serviceDescription}</td><td>{s.servicePrice}</td><td>{s.serviceDuration}</td>
                                  <td><span className={`status-badge ${s.isDeleted?'inactive':'active'}`}>{s.isDeleted?t.adminInactive:t.adminActive}</span></td>
                                  <td><div className="action-buttons">
                                    <button className="btn-action btn-edit" onClick={() => { setEditingService(s); setServiceFormData({ serviceName:s.serviceName,serviceDescription:s.serviceDescription,servicePrice:s.servicePrice.toString(),serviceDuration:s.serviceDuration.toString(),category:s.category }); setShowServiceModal(true); }}>{t.adminEdit}</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeleteService(s.id)}>{t.adminDelete}</button>
                                  </div></td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                    )}
                  </div>
              )}

            </div>
          </main>
        </div>
        <Footer />

        {/* MODAL PACIENT */}
        {showPatientModal && (
            <div className="modal-overlay" onClick={() => setShowPatientModal(false)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>{editingPatient ? t.adminEditPatient : t.adminAddPatient}</h2><button className="modal-close" onClick={() => setShowPatientModal(false)}>&times;</button></div>
                <form onSubmit={handleSavePatient}>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Prenume','Имя','First Name')}</label><input type="text" required value={patientFormData.firstName} onChange={e => setPatientFormData({ ...patientFormData, firstName: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Nume','Фамилия','Last Name')}</label><input type="text" required value={patientFormData.lastName} onChange={e => setPatientFormData({ ...patientFormData, lastName: e.target.value })} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Data nașterii','Дата рождения','Date of Birth')}</label><input type="date" required value={patientFormData.dateOfBirth} onChange={e => setPatientFormData({ ...patientFormData, dateOfBirth: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Sex','Пол','Sex')}</label><CustomSelect options={[{ value:'Barbat',label:lbl('Bărbat','Мужчина','Male') },{ value:'Femeie',label:lbl('Femeie','Женщина','Female') }]} value={patientFormData.sex} onChange={val => setPatientFormData({ ...patientFormData, sex: val })} placeholder={lbl('-- Alege --','-- Выбрать --','-- Choose --')} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{t.adminEmail}</label><input type="email" required value={patientFormData.email} onChange={e => setPatientFormData({ ...patientFormData, email: e.target.value })} /></div>
                    <div className="form-group"><label>{t.adminPhone}</label><input type="tel" value={patientFormData.phone} onChange={e => setPatientFormData({ ...patientFormData, phone: e.target.value })} /></div>
                  </div>
                  <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowPatientModal(false)}>{t.adminCancel}</button><button type="submit" className="btn-submit">{editingPatient ? t.adminUpdate : t.adminAdd}</button></div>
                </form>
              </div>
            </div>
        )}

        {/* MODAL MEDIC */}
        {showDoctorModal && (
            <div className="modal-overlay" onClick={() => setShowDoctorModal(false)}>
              <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>{editingDoctor ? lbl('Editează Medic','Редактировать врача','Edit Doctor') : lbl('Adaugă Medic','Добавить врача','Add Doctor')}</h2><button className="modal-close" onClick={() => setShowDoctorModal(false)}>&times;</button></div>
                <form onSubmit={handleSaveDoctor}>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Prenume','Имя','First Name')}</label><input type="text" required value={doctorFormData.firstName} onChange={e => setDoctorFormData({ ...doctorFormData, firstName: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Nume','Фамилия','Last Name')}</label><input type="text" required value={doctorFormData.lastName} onChange={e => setDoctorFormData({ ...doctorFormData, lastName: e.target.value })} /></div>
                  </div>
                  <div className="form-group"><label>{lbl('Specialitate','Специальность','Speciality')}</label><CustomSelect options={Object.entries(SPECIALITY_MAP).map(([k,v]) => ({ value:k,label:translateSpecialization(v,language) }))} value={String(doctorFormData.specialty)} onChange={val => setDoctorFormData({ ...doctorFormData, specialty: parseInt(val) })} /></div>
                  <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowDoctorModal(false)}>{t.adminCancel}</button><button type="submit" className="btn-submit">{editingDoctor ? t.adminUpdate : t.adminAdd}</button></div>
                </form>
              </div>
            </div>
        )}

        {/* MODAL PROGRAMARE - cu ore fixe si ocupate */}
        {showApptModal && (
            <div className="modal-overlay" onClick={() => setShowApptModal(false)}>
              <div className="modal modal-appt" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingAppt ? lbl('Editează Programare','Редактировать запись','Edit Appointment') : lbl('Adaugă Programare','Добавить запись','Add Appointment')}</h2>
                  <button className="modal-close" onClick={() => setShowApptModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveAppt}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{lbl('Data','Дата','Date')}</label>
                      <input type="date" required value={apptFormData.appointmentDate}
                             onChange={e => setApptFormData({ ...apptFormData, appointmentDate: e.target.value, appointmentTime: '' })} />
                    </div>
                    <div className="form-group">
                      <label>
                        {lbl('Ora','Время','Time')}
                        {loadingTimes && <span style={{ fontSize:'0.75rem', color:'#888', marginLeft:'8px' }}>Se verifică...</span>}
                      </label>
                      <CustomSelect
                          options={timeOptions}
                          value={apptFormData.appointmentTime}
                          onChange={val => setApptFormData({ ...apptFormData, appointmentTime: val })}
                          placeholder={!canSelectTime
                              ? lbl('Selectează mai întâi medicul și data','Сначала выберите врача и дату','Select doctor and date first')
                              : lbl('-- Alege ora --','-- Выберите время --','-- Choose time --')}
                          disabled={!canSelectTime || loadingTimes}
                          required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{lbl('Filtrează după specialitate','Фильтр по специальности','Filter by speciality')}</label>
                      <CustomSelect
                          options={[{ value:'',label:lbl('-- Toate specialitățile --','-- Все специальности --','-- All specialities --') },...Object.entries(SPECIALITY_MAP).map(([k,v]) => ({ value:k,label:translateSpecialization(v,language) }))]}
                          value={String(apptSpecialityFilter)}
                          onChange={val => { setApptSpecialityFilter(val===''?'':parseInt(val)); setApptFormData({ ...apptFormData,doctorName:'',serviceName:'',appointmentTime:'' }); }} />
                    </div>
                    <div className="form-group">
                      <label>{lbl('Medic','Врач','Doctor')} *</label>
                      <CustomSelect required
                                    placeholder={lbl('-- Alege medic --','-- Выберите врача --','-- Choose doctor --')}
                                    options={doctors.filter(d => !d.isDeleted&&(apptSpecialityFilter===''||d.specialty===apptSpecialityFilter)).map(d => ({ value:`${d.firstName} ${d.lastName}`,label:`${d.firstName} ${d.lastName} — ${translateSpecialization(SPECIALITY_MAP[d.specialty]??'',language)}` }))}
                                    value={apptFormData.doctorName}
                                    onChange={val => { const sd=doctors.find(d=>`${d.firstName} ${d.lastName}`===val); setApptFormData({ ...apptFormData,doctorName:val,serviceName:sd?translateSpecialization(SPECIALITY_MAP[sd.specialty]??'',language):apptFormData.serviceName,appointmentTime:'' }); }} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Pacient','Пациент','Patient')}</label><input type="text" required value={apptFormData.patientName} onChange={e => setApptFormData({ ...apptFormData, patientName: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Serviciu','Услуга','Service')}</label><input type="text" value={apptFormData.serviceName} onChange={e => setApptFormData({ ...apptFormData, serviceName: e.target.value })} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Telefon','Телефон','Phone')}</label><input type="tel" value={apptFormData.phone} onChange={e => setApptFormData({ ...apptFormData, phone: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Email','Email','Email')}</label><input type="email" value={apptFormData.email} onChange={e => setApptFormData({ ...apptFormData, email: e.target.value })} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Motiv vizită','Причина vizitei','Reason')}</label><input type="text" value={apptFormData.reasonForVisit} onChange={e => setApptFormData({ ...apptFormData, reasonForVisit: e.target.value })} /></div>
                    {editingAppt && (<div className="form-group"><label>{t.adminStatus}</label><CustomSelect options={[{ value:'0',label:lbl('În așteptare','В ожидании','Pending') },{ value:'1',label:lbl('Confirmat','Подтверждён','Confirmed') },{ value:'2',label:lbl('Anulat','Отменён','Cancelled') }]} value={String(apptFormData.status)} onChange={val => setApptFormData({ ...apptFormData, status: parseInt(val) })} /></div>)}
                  </div>
                  <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowApptModal(false)}>{t.adminCancel}</button><button type="submit" className="btn-submit">{editingAppt ? t.adminUpdate : t.adminAdd}</button></div>
                </form>
              </div>
            </div>
        )}

        {/* MODAL RECENZIE */}
        {showReviewModal && editingReview && (
            <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>{lbl('Editează Recenzie','Редактировать отзыв','Edit Review')}</h2><button className="modal-close" onClick={() => setShowReviewModal(false)}>&times;</button></div>
                <form onSubmit={handleSaveReview}>
                  <div className="form-group"><label>{lbl('Rating (1-5)','Рейтинг (1-5)','Rating (1-5)')}</label><input type="number" min="1" max="5" required value={reviewFormData.rating} onChange={e => setReviewFormData({ ...reviewFormData, rating: parseInt(e.target.value) })} /></div>
                  <div className="form-group"><label>{lbl('Comentariu','Комментарий','Comment')}</label><textarea rows={4} required value={reviewFormData.reviewText} onChange={e => setReviewFormData({ ...reviewFormData, reviewText: e.target.value })} /></div>
                  <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowReviewModal(false)}>{t.adminCancel}</button><button type="submit" className="btn-submit">{t.adminUpdate}</button></div>
                </form>
              </div>
            </div>
        )}

        {/* MODAL EDITARE NOUTATE */}
        {showNewsModal && editingNews && (
            <div className="modal-overlay" onClick={() => setShowNewsModal(false)}>
              <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{lbl('Editează Noutatea','Редактировать новость','Edit News')}</h2>
                  <button className="modal-close" onClick={() => setShowNewsModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveEditNews}>
                  <div className="form-group">
                    <label>{lbl('Titlu','Заголовок','Title')} * <span className="char-counter">{newsEditForm.name.length}/50</span></label>
                    <input type="text" className="form-input" required maxLength={50} value={newsEditForm.name} onChange={e => setNewsEditForm({ ...newsEditForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{lbl('Descriere','Описание','Description')} * <span className="char-counter">{newsEditForm.description.length}/400</span></label>
                    <textarea className="form-textarea" rows={5} required maxLength={400} value={newsEditForm.description} onChange={e => setNewsEditForm({ ...newsEditForm, description: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{lbl('Tip','Тип','Type')}</label>
                    <CustomSelect options={(Object.keys(NEWS_TYPE_LABELS) as NewsType[]).map(type => ({ value: type, label: newsTypeLabel(type) }))} value={newsEditForm.type} onChange={val => setNewsEditForm({ ...newsEditForm, type: val as NewsType })} />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowNewsModal(false)}>{lbl('Anulează','Отмена','Cancel')}</button>
                    <button type="submit" className="btn-submit">{lbl('Salvează','Сохранить','Save')}</button>
                  </div>
                </form>
              </div>
            </div>
        )}

        {/* MODAL SERVICIU */}
        {showServiceModal && (
            <div className="modal-overlay" onClick={() => setShowServiceModal(false)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>{editingService ? lbl('Editează Serviciu','Редактировать услугу','Edit Service') : lbl('Adaugă Serviciu','Добавить услугу','Add Service')}</h2><button className="modal-close" onClick={() => setShowServiceModal(false)}>&times;</button></div>
                <form onSubmit={handleSaveService}>
                  <div className="form-group"><label>{lbl('Nume','Название','Name')}</label><input type="text" required value={serviceFormData.serviceName} onChange={e => setServiceFormData({ ...serviceFormData, serviceName: e.target.value })} /></div>
                  <div className="form-group"><label>{lbl('Descriere','Описание','Description')}</label><textarea rows={3} required value={serviceFormData.serviceDescription} onChange={e => setServiceFormData({ ...serviceFormData, serviceDescription: e.target.value })} /></div>
                  <div className="form-row">
                    <div className="form-group"><label>{lbl('Preț (MDL)','Цена (MDL)','Price (MDL)')}</label><input type="number" min="0" step="1" required value={serviceFormData.servicePrice} onChange={e => setServiceFormData({ ...serviceFormData, servicePrice: e.target.value })} /></div>
                    <div className="form-group"><label>{lbl('Durată (min)','Продолжительность (мин)','Duration (min)')}</label><input type="number" min="1" required value={serviceFormData.serviceDuration} onChange={e => setServiceFormData({ ...serviceFormData, serviceDuration: e.target.value })} /></div>
                  </div>
                  <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowServiceModal(false)}>{t.adminCancel}</button><button type="submit" className="btn-submit">{editingService ? t.adminUpdate : t.adminAdd}</button></div>
                </form>
              </div>
            </div>
        )}

      </div>
  );
};

export default AdminDashboard;
