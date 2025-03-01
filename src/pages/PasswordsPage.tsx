import Navbar from "@/components/custom/Navbar";
import PasswordFormPopup from "@/components/custom/PasswordFormPopup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPasswords } from "@/services/passwordService";
import { PasswordEntryResponse } from "@/types/passwordTypes";
import React, { useEffect, useState } from "react";
import { Plus } from 'lucide-react';


const PasswordsPage: React.FC = () => {
    const [passwords, setPasswords] = useState<PasswordEntryResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [passwordToEdit, setPasswordToEdit] = useState<PasswordEntryResponse | undefined>(undefined);

    const handleNewPasswordWindow = () => {
        setPasswordToEdit(undefined); // Reset for adding a new password
        setShowPopup(true);
    };

    const handleEditPasswordWindow = (password: PasswordEntryResponse) => {
        setPasswordToEdit(password); // Set for editing
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handlePasswordAddedOrUpdated = () => {
        getPasswords()
            .then(response => {
                setPasswords(response.passwords);
            })
            .catch(err => {
                setError("Failed to fetch passwords");
                console.error(err);
            });
    };

    useEffect(() => {
        getPasswords()
            .then(response => setPasswords(response.passwords))
            .catch(err => {
                setError("Failed to fetch passwords");
                console.error(err);
            });
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-lg mx-auto p-6">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl">Your Passwords</h1>
                    <Button onClick={handleNewPasswordWindow}>
                        <Plus fill='currentColor' className="w-4 h-4 " />
                    </Button>
                </div>

                <Separator className="mb-4" />

                {error && <p className="text-red-500">{error}</p>}

                <div className="space-y-3">
                    {passwords && passwords.length ? (
                        passwords.map(password => (
                            <Card key={password.id} onClick={() => handleEditPasswordWindow(password)} className="p-4 shadow-md">
                                <p className="font-medium">{password.entryName}</p>
                                <p className="text-sm text-gray-500">{password.username}</p>
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-gray-700 p-4">No passwords saved.</p>
                            <Button onClick={handleNewPasswordWindow}>
                                <Plus fill='currentColor' className="w-4 h-4 " /> Add new password
                            </Button>
                        </div>

                    )}
                </div>
            </div>

            {showPopup && (
                <PasswordFormPopup
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onSuccess={handlePasswordAddedOrUpdated}
                    passwordToEdit={passwordToEdit}
                />
            )}
        </div>
    );
};

export default PasswordsPage;