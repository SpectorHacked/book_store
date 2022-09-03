import Cookies from 'universal-cookie';

export const BOOK_STORE_USER = 'bookStoreUser'
export function setCookieLogin(userId) {
    const cookies = new Cookies();
    return cookies.set(BOOK_STORE_USER, userId, { path: '/' });
}

export function getCookieLogin() {
    const cookies = new Cookies();
    return cookies.get(BOOK_STORE_USER)
}