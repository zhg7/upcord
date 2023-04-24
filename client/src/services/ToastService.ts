import { ToastSeverity } from 'primevue/api';
import { toast } from '@/main';

const LIFETIME_IN_MILLISECONDS = 3000;

export function showError(title: string, body: string): void {
    toast.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: LIFETIME_IN_MILLISECONDS });
};

export function showWarning(title: string, body: string): void {
    toast.add({ severity: ToastSeverity.WARN, summary: title, detail: body, life: LIFETIME_IN_MILLISECONDS });
};

export function showSuccess(title: string, body: string): void {
    toast.add({ severity: ToastSeverity.SUCCESS, summary: title, detail: body, life: LIFETIME_IN_MILLISECONDS });
};

export default toast;

