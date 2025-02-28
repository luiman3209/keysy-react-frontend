// Navbar.tsx
import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/");

    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Password Manager</h1>

                <Button className="w-full mt-4" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
