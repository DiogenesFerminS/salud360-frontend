import { FormType } from "../types/form/types"
import { isValidEmail } from "./isValid/isValidEmail";
import { isValidPassword } from "./isValid/isValidPassword";
import { isValidPhone } from "./isValid/isValidPhone";

export const formValidator = ({password, phone, email, lastname, name}:FormType) => {

    if([name, lastname, email, phone, password].includes("")){
      return "All fields are required"
    };

    if(name.length < 3){
      return "The name must have a minimum of 3 letters";
    };

    if(lastname.length < 3){
        return "The lastname must have a minimum of 3 letters";
    };

    const validEmail = isValidEmail(email);
    if(!validEmail){
        return "Email Invalid";
    };

    const validPhone = isValidPhone(phone);
    if(!validPhone){
        return "Number phone Invalid";
    };
    
    const validPassword = isValidPassword(password);
    if(!validPassword){
        return "Invalid password";
    };

    return "";
}