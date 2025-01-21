export const validateForms = (form) => {
    if (!form.firstName || !form.lastName || !form.email || !form.department) {
        return 'All fields are required';
    }
    if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(form.email)) {
        return 'Invalid email address';
    }
    return '';  // No errors
};