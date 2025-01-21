export const validateForm = (form) => {
    if (!form.firstName || !form.lastName || !form.email || !form.department) {
        return 'All fields are required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        return 'Invalid email address';
    }
    return '';  // No errors
};