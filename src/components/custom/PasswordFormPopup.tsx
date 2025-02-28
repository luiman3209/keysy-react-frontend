import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { addPassword } from '@/services/passwordService';
import { Button } from '../ui/button';
import Modal from './Modal';

interface PasswordFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback to refresh the passwords list
}

const PasswordFormPopup: React.FC<PasswordFormPopupProps> = ({ isOpen, onClose, onSuccess }) => {
    const [entryName, setEntryName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addPassword(entryName, username, password); // Add password via service
            onSuccess(); // Refresh password list on success
            onClose(); // Close the modal after successful submission
        } catch {
            setError("Failed to save password. Please try again.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Add New Password</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="entryName" className="block font-medium">Entry Name</Label>
                        <Input
                            id="entryName"
                            value={entryName}
                            onChange={(e) => setEntryName(e.target.value)}
                            placeholder="Enter entry name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="username" className="block font-medium">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="block font-medium">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PasswordFormPopup;
