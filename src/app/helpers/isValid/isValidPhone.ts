export const isValidPhone = (phone: string)=>{
    const phoneRegex = /^\+?(\d{9,15})$/;
    return phoneRegex.test(phone);
}