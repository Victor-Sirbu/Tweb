/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export type ActionType = 'edit' | 'delete' | 'modify' | 'create' | 'login';
export type TargetType = 'patient' | 'appointment' | 'record' | 'user' | 'system' | 'medic' | 'service' | 'review' | 'notification' | 'news';

export interface AuditEntry {
    id: number;
    adminName: string;
    adminRole: string;
    action: string;
    actionType: ActionType;
    target: string;
    targetType: TargetType;
    details: string;
    date: string;
    time: string;
    ip: string;
    timestamp: number; // ms pentru filtrare 7 zile
}

interface AuditContextType {
    entries: AuditEntry[];
    logAction: (params: {
        action: string;
        actionType: ActionType;
        target: string;
        targetType: TargetType;
        details: string;
        adminName: string;
        adminRole: string;
    }) => void;
}

const STORAGE_KEY = 'audit_entries';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function loadEntries(): AuditEntry[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed: AuditEntry[] = JSON.parse(raw);
        const cutoff = Date.now() - SEVEN_DAYS;
        return parsed.filter(e => e.timestamp > cutoff);
    } catch {
        return [];
    }
}

function saveEntries(entries: AuditEntry[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch { /* storage full */ }
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
    const [entries, setEntries] = useState<AuditEntry[]>(() => loadEntries());
    const ipRef = useRef<string>('—');

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(r => r.json())
            .then(data => { ipRef.current = data.ip ?? '—'; })
            .catch(() => { ipRef.current = '—'; });
    }, []);

    const logAction = useCallback((params: {
        action: string;
        actionType: ActionType;
        target: string;
        targetType: TargetType;
        details: string;
        adminName: string;
        adminRole: string;
    }) => {
        const now = new Date();
        const date = now.toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' });
        const time = now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
        const timestamp = now.getTime();

        const newEntry: AuditEntry = {
            id: timestamp,
            adminName: params.adminName,
            adminRole: params.adminRole,
            action: params.action,
            actionType: params.actionType,
            target: params.target,
            targetType: params.targetType,
            details: params.details,
            date,
            time,
            ip: ipRef.current,
            timestamp,
        };

        setEntries(prev => {
            const cutoff = Date.now() - SEVEN_DAYS;
            const updated = [newEntry, ...prev.filter(e => e.timestamp > cutoff)];
            saveEntries(updated);
            return updated;
        });
    }, []);

    return (
        <AuditContext.Provider value={{ entries, logAction }}>
            {children}
        </AuditContext.Provider>
    );
}

export function useAudit() {
    const context = useContext(AuditContext);
    if (!context) throw new Error('useAudit must be used within AuditProvider');
    return context;
}

