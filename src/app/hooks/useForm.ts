import { ChangeEvent, useState } from 'react';

type FormState<T> = T;

interface UseFormProps<T extends Record<string, unknown>> {
    initialForm?: FormState<T>
}

export const useForm =  <T extends Record<string, unknown>>({ initialForm = {} as T } : UseFormProps<T> = {} as UseFormProps<T>) => {
  
    const [ formState, setFormState ] = useState<FormState<T>>( initialForm );

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}