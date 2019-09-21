export function getLocalStorage(key) {
    if (localStorage.getItem(key))
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch(e) {
            return localStorage.getItem(key);
        }
}

export function getSessionStorage(key) {
    if (sessionStorage.getItem(key))
        return sessionStorage.getItem(key);
}
