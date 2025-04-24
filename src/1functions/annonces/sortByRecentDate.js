export function sortByRecentDate(dataArray) {
    return [...dataArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
