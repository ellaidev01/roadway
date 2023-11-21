// Helper function to format dates
export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Function to set a token in local storage
export const setTokenInLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
};

// Function to get a token from local storage
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

// Function to remove a token from local storage
export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
};
