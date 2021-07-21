//Saves an item to local storage
export const setLocalItem = (key, value) => {
    localStorage.setItem(key, value);
};

//retrives an item from local storage
export const getLocalItem = (key) => {
    return localStorage.getItem(key);
};

//Removes an item from local storage
export const removeLocalItem = (key) => {
    return localStorage.removeItem(key);
};

//Saves an item to session storage
export const setSessionItem = (key, data) => {
    sessionStorage.setItem(key, data);
};

//retrives an item from session storage
export const getSessionItem = (key) => {
    return sessionStorage.getItem(key);
};

//Removes an item from session storage
export const removeSessionItem = (key) => {
    return sessionStorage.removeItem(key);
};