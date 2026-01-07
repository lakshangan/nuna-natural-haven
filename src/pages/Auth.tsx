import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setLoading(true);
        try {
            await loginWithGoogle(credentialResponse.credential);
            toast.success("Welcome to Back!");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Google Sign-In failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(email, password);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-32 pb-16 container mx-auto px-6 flex justify-center items-center">
                <Card className="w-full max-w-md shadow-2xl border-primary/10 animate-reveal">
                    <Tabs defaultValue="login" className="w-full">
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-3xl font-heading font-bold text-primary">Account</CardTitle>
                            <CardDescription>
                                Join the Nuna Origin family for a personalized botanical experience
                            </CardDescription>
                            <TabsList className="grid w-full grid-cols-2 mt-4 bg-muted/50 p-1">
                                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
                                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
                            </TabsList>
                        </CardHeader>

                        <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                <CardContent className="space-y-4">
                                    <div className="w-full mb-6">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => toast.error('Google Sign-In Failed')}
                                            useOneTap
                                            theme="outline"
                                            shape="pill"
                                            text="signin_with"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-slate-500 font-bold tracking-widest">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <button type="button" className="text-xs text-accent hover:underline">Forgot password?</button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="password"
                                                type="password"
                                                className="pl-10"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                                        {loading ? "Loading..." : "Sign In"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>

                        <TabsContent value="register">
                            <form onSubmit={handleSignUp}>
                                <CardContent className="space-y-4">
                                    <div className="w-full mb-6">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => toast.error('Google Sign-In Failed')}
                                            theme="outline"
                                            shape="pill"
                                            text="signup_with"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-slate-500 font-bold tracking-widest">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="name"
                                                placeholder="Your name please"
                                                className="pl-10"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="reg-email"
                                                type="email"
                                                placeholder="m@example.com"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="reg-password"
                                                type="password"
                                                className="pl-10"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg font-bold shadow-lg shadow-accent/20" disabled={loading}>
                                        {loading ? "Processing..." : "Create Account"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default Auth;
