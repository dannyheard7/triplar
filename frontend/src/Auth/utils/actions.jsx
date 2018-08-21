export function login(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}