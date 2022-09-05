export const CART_KEY = 'cart'
export const FAVORITES_KEY = 'favorites'

export async function updateLocalItems(key, newArray) {
    return localStorage.setItem(key, JSON.stringify(newArray))
}

export async function removeLocalByKey(key) {
    return localStorage.removeItem(key)
}

export async function getLocalByKey(key) {
    try{
        const res = await localStorage.getItem(key)
        if(res) return JSON.parse(res);
        return []
    } catch(e) {
        console.log(e)
        return []
    }
}