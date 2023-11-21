import { jwtDecode } from "jwt-decode";

export const setCookie = (name: string, value: string, expiry: number) => {
    // Calculate the expiration date
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expiry * 1000);

    // Set the token in the cookie with the correct expires format
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
};

// for production enable this
// export const setCookie = (token: string, expiry: number) => {
//     // Calculate the expiration date
//     const expirationDate = new Date();
//     expirationDate.setTime(expirationDate.getTime() + expiry * 1000); // Convert seconds to milliseconds

//     // Set the token in the cookie with HttpOnly and Secure attributes
//     document.cookie = `rental_token=${token}; expires=${expirationDate.toUTCString()}; path=/; HttpOnly; Secure`;
// };

// Get the token from the cookie
export const cookieToken = (index: number) => {
    const cookies = document.cookie.split(';');

    if (index < cookies.length) {
        const token = cookies[index].trim().split('=')[1];
        return token || null;
    } else {
        return "Index out of bounds"
    }
};

export const decodedToken = (cookieName: string) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name === cookieName) {
            const decodedValue = jwtDecode(value);
            console.log(decodedValue);
            return decodedValue;
        }
    }
    return null; // Cookie not found or does not have an expiration date
};

export const getCookieExpiration = (cookieName: string) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name === cookieName) {
            const decodedValue = jwtDecode(value);
            const expires_in = decodedValue && decodedValue.exp;
            if (expires_in) {
                const expirationDateString = new Date(expires_in * 1000);
                console.log(expirationDateString);
                
                return expirationDateString;
            } else {
                // Handle the case where decodedValue or decodedValue.exp is undefined
                return null;
            }
        }
    }
    return null; // Cookie not found or does not have an expiration date
};

export const clearTokenCookie = () => {
    const pastDate = new Date(0);
    document.cookie = `rental_access_token=; expires=${pastDate.toUTCString()}; path=/`;
    document.cookie = `rental_refresh_token=; expires=${pastDate.toUTCString()}; path=/`;
};

//Token Authentication
export const tokenAuthenticated = (index: number) => {
    if (cookieToken(index)?.length) {
        return true;
    }
    return false;
};




