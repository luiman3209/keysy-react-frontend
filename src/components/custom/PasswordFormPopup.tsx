
import { Input } from '../ui/input';
import { Label } from '../ui/label';


import { Button } from '../ui/button';
import Modal from './Modal';
import { PasswordEntryResponse } from '@/types/passwordTypes';
import { usePasswordForm } from '@/hooks/usePasswordForm';

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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleSubmit();
        if (success) {
            onSuccess();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{passwordToEdit ? 'Edit Password' : 'Add New Password'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="entryName" className="block font-medium">Entry Name</Label>
                        <Input
                            id="entryName"
                            name="entryName"
                            value={formData.entryName}
                            onChange={handleInputChange}
                            placeholder="Enter entry name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="username" className="block font-medium">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="block font-medium">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">{passwordToEdit ? 'Save Changes' : 'Save'}</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PasswordFormPopup;