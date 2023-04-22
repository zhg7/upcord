import { ToastSeverity } from 'primevue/api';
import { toast } from '@/main';

const DEFAULT_LIFETIME_IN_MILLISECONDS = 3000;

export function showError(title: string, body: string, lifetime: number = DEFAULT_LIFETIME_IN_MILLISECONDS): void {
    toast.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: lifetime });
};

export function showWarning(title: string, body: string, lifetime: number = DEFAULT_LIFETIME_IN_MILLISECONDS): void {
    toast.add({ severity: ToastSeverity.WARN, summary: title, detail: body, life: lifetime });
};