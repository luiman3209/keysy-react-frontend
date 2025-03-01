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

    // Store the original data to compare later and avoid useless api calls
    const [originalData, setOriginalData] = useState<PasswordFormState | null>(null);

    useEffect(() => {
        if (passwordToEdit) {
            const original = {
                entryName: passwordToEdit.entryName,
                username: passwordToEdit.username,
                password: passwordToEdit.password,
            };
            setFormData(original);
            setOriginalData(original);
        }
    }, [passwordToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Check if there are changes compared to the original data
    const hasChanges = () => {
        if (!originalData) return false;
        return (
            formData.entryName !== originalData.entryName ||
            formData.username !== originalData.username ||
            formData.password !== originalData.password
        );
    };

    const handleSubmit = async () => {
        try {
            if (passwordToEdit) {
                if (hasChanges()) {
                    await updatePassword(passwordToEdit.id, formData.entryName, formData.username, formData.password);
                }
            } else {
                await addPassword(formData.entryName, formData.username, formData.password);
            }
            return true;
        } catch {
            setError('Failed to save password. Please try again.');
            return false;
        }
    };

    return {
        formData,
        error,
        handleInputChange,
        handleSubmit,
    };
};
