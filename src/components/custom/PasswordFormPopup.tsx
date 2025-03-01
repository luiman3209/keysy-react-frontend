import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Modal from './Modal';
import { PasswordEntryResponse } from '@/types/passwordTypes';
import { usePasswordForm } from '@/hooks/usePasswordForm';
import { deletePassword } from '@/services/passwordService';
import { useState } from 'react';
import { Save } from 'lucide-react';

interface PasswordFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    passwordToEdit?: PasswordEntryResponse;
}

const PasswordFormPopup: React.FC<PasswordFormPopupProps> = ({
    isOpen,
    onClose,
    onSuccess,
    passwordToEdit,
}) => {
    const { formData, error, handleInputChange, handleSubmit } = usePasswordForm(passwordToEdit);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleSubmit();
        if (success) {
            onSuccess();
            onClose();
        }
    };

    const handleDeletePassword = async () => {
        if (passwordToEdit) {
            try {
                await deletePassword(passwordToEdit.id);
                onSuccess(); // Refresh the list
                onClose();    // Close the popup
            } catch (err) {
                setDeleteError("Failed to delete password. Please try again.");
                console.error(err);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-2">
                <h2 className="text-xl mb-4">{passwordToEdit ? 'Edit Password' : 'New Password'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                {deleteError && <p className="text-red-500">{deleteError}</p>}
                <form onSubmit={handleFormSubmit} className="space-y-4 ">
                    <div>
                        <Label htmlFor="entryName" className="block font-medium py-2">Name</Label>
                        <Input
                            id="entryName"
                            name="entryName"
                            value={formData.entryName}
                            onChange={handleInputChange}
                            placeholder="e.g., gmail account"
                        />
                    </div>
                    <div>
                        <Label htmlFor="username" className="block font-medium py-2">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="e.g., john_doe123"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="block font-medium py-2">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="password"
                        />
                    </div>
                    <div className="flex justify-between mt-8 ">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        {passwordToEdit && (
                            <Button
                                type="button"
                                onClick={handleDeletePassword}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Delete
                            </Button>
                        )}
                        <Button type="submit" className=''>
                            <Save />
                            {passwordToEdit ? 'Save Changes' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PasswordFormPopup;
