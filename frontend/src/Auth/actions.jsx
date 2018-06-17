export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';


export function login(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    return {
        type: LOGGED_IN,
        user: user,
        token: token,
        isAuthenticated: true,
    }
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    return {
        type: LOGGED_OUT,
        isAuthenticated: false
    }
}