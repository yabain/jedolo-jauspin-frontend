export function formatDate(isoDateString) {
    if (!isoDateString) return '';
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};