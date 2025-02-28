import { useState, useEffect } from 'react';
import { addPassword, updatePassword } from '@/services/passwordService';
import { PasswordEntryResponse } from '@/types/passwordTypes';

interface PasswordFormState {
    entryName: string;
    username: string;
    password: string;
}

export const usePasswordForm = (passwordToEdit?: PasswordEntryResponse) => {
    const [formData, setFormData] = useState<PasswordFormState>({
        entryName: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (passwordToEdit) {
            setFormData({
                entryName: passwordToEdit.entryName,
                username: passwordToEdit.username,
                password: passwordToEdit.password,
            });
        }
    }, [passwordToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (passwordToEdit) {
                await updatePassword(passwordToEdit.id, formData.entryName, formData.username, formData.password);
            } else {
                await addPassword(formData.entryName, formData.username, formData.password);
            }
            return true; // Success
        } catch {
            setError('Failed to save password. Please try again.');
            return false; // Error
        }
    };

    return {
        formData,
        error,
        handleInputChange,
        handleSubmit,
    };
};
