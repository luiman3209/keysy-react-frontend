import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/");
    };

    return (
        <nav className="">
            <div className="flex justify-between items-center">
                <img src="images/logo.png" alt="Logo" className="h-24 ml-4" />


                <Button className="mr-4" onClick={handleLogout}>
                    <LogOut />
                </Button>


            </div>
        </nav>
    );
};

export default Navbar;
