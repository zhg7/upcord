import { formatDistance, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

setDefaultOptions({ locale: es })

export function getTimeAgo(date: Date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true, includeSeconds: true })
}

export function formatDate(date: Date) {
    const formatter = new Intl.DateTimeFormat("es-ES", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(new Date(date));
}