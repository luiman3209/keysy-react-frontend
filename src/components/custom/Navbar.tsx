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
        <nav className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Logo</h1>

                <Button className="mt-4" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
