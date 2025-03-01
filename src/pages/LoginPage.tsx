import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate("/passwords");
        } catch (error) {
            console.log(error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <img src="images/logo_crop.png" alt="Logo" className="" />
                    <CardTitle className="text-center text-2xl ">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="py-2">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="py-2">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className="w-full mt-4" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

