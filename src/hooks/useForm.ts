import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    const [form, setForm] = useState( initState );

    const onChange = ( value: string, field: keyof T ) => {
        setForm({
            ...form,
            [field]: value,
        });
    }

    const setFormValue = (formulario: T) => {
        setForm(formulario)
    }

    return {
        ...form,
        form,
        onChange,
        setFormValue,
    }

}
