import Navbar from "@/components/custom/Navbar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPasswords } from "@/services/passwordService";
import { PasswordEntryResponse } from "@/types/passwordTypes";
import React, { useEffect, useState } from "react";


const PasswordsPage: React.FC = () => {
    const [passwords, setPasswords] = useState<PasswordEntryResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Call getPasswords from the passwordService
        getPasswords()
            .then(response => {
                setPasswords(response.passwords); // Ensure you're using the correct structure
            })
            .catch(err => {
                setError("Failed to fetch passwords"); // Set an error message
                console.error("Failed to fetch passwords", err);
            });
    }, []);

    return (
        <div>
            <Navbar />

            <div className="max-w-lg mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Your Passwords</h1>
                <Separator className="mb-4" />

                {error && <p className="text-red-500">{error}</p>} {/* Show error message if there's an error */}

                <div className="space-y-3">
                    {passwords.length > 0 ? passwords.map((password) => (
                        <Card key={password.id} className="p-4 shadow-md">
                            <p className="font-medium">{password.entryName}</p> {/* Use the correct property name */}
                            <p className="text-sm text-gray-500">{password.username}</p>
                        </Card>
                    )) : <div>
                        <p>
                            No passwords saved.
                        </p>
                    </div>}
                </div>
            </div>
        </div>

    );
};

export default PasswordsPage;
