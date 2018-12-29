export default function hashCode(s) {
    let hash = 0,
        i, char;
    let l = s.length;
    if (l === 0) return hash;
    for (i = 0; i < l; i++) {
        char = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}