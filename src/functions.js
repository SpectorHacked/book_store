import axios from 'axios';
import Cookies from 'universal-cookie';

export const BOOK_STORE_USER_COOKIE = 'bookStoreUser'
export function setCookieLogin(userId, shouldReemember) {
    const date = new Date()
    const minutes = shouldReemember ? minutesExpires(60*10) : minutesExpires(30)
    date.setTime(date.getTime() + (minutes * 48 * 10));
    const cookieOptions = { 
        path: '/', 
        expires: date
    }
    const cookies = new Cookies();
    return cookies.set(BOOK_STORE_USER_COOKIE, userId, cookieOptions);
}

function minutesExpires(minutes) {
    return 1000 * 60 * minutes
}
export function getCookieLogin() {
    const cookies = new Cookies();
    const res = cookies.get(BOOK_STORE_USER_COOKIE)
    return res
}

export function removeCookie() {
    const cookies = new Cookies();
    const res = cookies.remove(BOOK_STORE_USER_COOKIE)
    return res
}

export function addLogActivity(type, userId) {
    return axios.get('/log-event', { params: { type, userId } })
}

export function normalizeBook(book) {
    book.authors = valueToArraySplit(book.authors)
    book.categories = valueToArraySplit(book.categories)
    return book
}

function valueToArraySplit(val) {
    if(val && !Array.isArray(val)) {
        return val.split(",")
    } else {
        return []
    }
}