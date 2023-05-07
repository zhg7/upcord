import { formatDistance, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

setDefaultOptions({ locale: es })

export function getTimeAgo(date: Date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true, includeSeconds: true })
}