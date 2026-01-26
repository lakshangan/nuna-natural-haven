import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, Sparkles, Sprout, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleRedirect = () => {
        loginWithGoogle();
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(email, password, fullName);
            toast.success("Welcome to the Nuna Family!");
            navigate("/dashboard");
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
            toast.success("Successfully logged in!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFBFA] selection:bg-emerald-200 overflow-x-hidden flex flex-col">
            <Navbar />

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
            </div>

            <main className="relative z-10 flex-grow pt-32 pb-24 container mx-auto px-6 flex justify-center items-center">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 xl:gap-32 items-center">

                    {/* Brand Story (Desktop) */}
                    <div className="hidden lg:flex flex-col space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 text-emerald-800 text-[10px] font-black tracking-[0.2em] uppercase border border-emerald-200/30"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Nuna Origin Collective
                            </motion.div>
                            <h1 className="text-6xl xl:text-7xl font-heading font-extrabold text-emerald-950 leading-[0.95] tracking-tight">
                                Pure Rituals <br />
                                <span className="text-accent italic font-serif serif">For Your Soul</span>
                            </h1>
                            <p className="text-lg xl:text-xl text-emerald-900/60 max-w-md leading-relaxed font-medium">
                                Join our collective of botanical enthusiasts and discover nature's most potent transformations.
                            </p>
                        </div>

                        <div className="grid gap-4 max-w-md">
                            {[
                                { icon: Leaf, title: "Pure Ingredients", desc: "100% Organic & Certified" },
                                { icon: Sprout, title: "Sustainable Living", desc: "Eco-conscious packaging" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-6 p-4 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-emerald-950 text-base">{item.title}</h4>
                                        <p className="text-sm text-emerald-900/50 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Auth Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-[440px] mx-auto lg:ml-auto"
                    >
                        <Card className="w-full bg-white/95 backdrop-blur-3xl border border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] rounded-[3rem] overflow-hidden">
                            <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                                <div className="p-8 pb-4 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-[2rem] bg-emerald-950 mb-8 flex items-center justify-center text-white shadow-2xl shadow-emerald-950/20 translate-y-[-10px]">
                                        <Leaf className="w-7 h-7" />
                                    </div>
                                    <CardHeader className="text-center space-y-2 p-0 mb-10">
                                        <CardTitle className="text-4xl font-heading font-extrabold text-emerald-950 tracking-tight">
                                            {activeTab === "login" ? "Welcome Home" : "Join Nuna"}
                                        </CardTitle>
                                        <CardDescription className="text-emerald-900/50 text-base font-medium px-6">
                                            {activeTab === "login"
                                                ? "Enter your details to access your Nuna profile"
                                                : "Create your free account and start your journey"}
                                        </CardDescription>
                                    </CardHeader>

                                    <TabsList className="grid w-full h-12 grid-cols-2 bg-emerald-100/30 p-1.5 rounded-2xl border border-emerald-200/40">
                                        <TabsTrigger
                                            value="login"
                                            className="h-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=inactive]:text-emerald-950/50 data-[state=active]:shadow-sm transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                                        >
                                            Sign In
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="register"
                                            className="h-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=inactive]:text-emerald-950/50 data-[state=active]:shadow-sm transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                                        >
                                            Register
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <TabsContent value="login" className="m-0">
                                            <form onSubmit={handleLogin} className="px-8 pb-10 space-y-8 mt-4">
                                                <SocialLogin onGoogleClick={handleGoogleRedirect} isLogin />

                                                <div className="space-y-6">
                                                    <CustomField
                                                        id="email"
                                                        label="Botanical Email"
                                                        type="email"
                                                        placeholder="name@nature.com"
                                                        icon={Mail}
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center px-1">
                                                            <Label htmlFor="password" text="Security Password">Security Password</Label>
                                                            <button type="button" className="text-[10px] font-black text-emerald-600 hover:text-accent tracking-widest uppercase transition-colors">Forgot?</button>
                                                        </div>
                                                        <div className="relative group/pass">
                                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-200 group-focus-within/pass:text-emerald-600 transition-colors" />
                                                            <Input
                                                                id="password"
                                                                type={showPassword ? "text" : "password"}
                                                                className="pl-14 pr-12 h-14 rounded-[1.25rem] bg-emerald-50/40 border-emerald-100/50 focus:border-emerald-300 focus:bg-white transition-all text-emerald-950 font-medium placeholder:text-emerald-200 shadow-none ring-0"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-200 hover:text-emerald-600 transition-colors"
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full bg-emerald-950 hover:bg-emerald-900 text-white h-14 rounded-[1.25rem] text-lg font-bold shadow-xl shadow-emerald-950/10 active:scale-[0.98] transition-all group"
                                                    disabled={loading}
                                                >
                                                    <span className="flex items-center justify-center gap-3">
                                                        {loading ? "Verifying..." : "Sign In to Profile"}
                                                        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
                                                    </span>
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="register" className="m-0">
                                            <form onSubmit={handleSignUp} className="px-8 pb-10 space-y-8 mt-4">
                                                <SocialLogin onGoogleClick={handleGoogleRedirect} />

                                                <div className="space-y-6">
                                                    <CustomField
                                                        id="reg-name"
                                                        label="Your Lovely Name"
                                                        type="text"
                                                        placeholder="Full Name"
                                                        icon={UserIcon}
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                                    <CustomField
                                                        id="reg-email"
                                                        label="Botanical Email"
                                                        type="email"
                                                        placeholder="name@nature.com"
                                                        icon={Mail}
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <div className="space-y-2">
                                                        <Label htmlFor="reg-password">Security Password</Label>
                                                        <div className="relative group/pass">
                                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-200 group-focus-within/pass:text-emerald-600 transition-colors" />
                                                            <Input
                                                                id="reg-password"
                                                                type={showPassword ? "text" : "password"}
                                                                className="pl-14 pr-12 h-14 rounded-[1.25rem] bg-emerald-50/40 border-emerald-100/50 text-emerald-950 font-medium placeholder:text-emerald-200"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-200"
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full bg-accent hover:bg-accent/90 text-white h-14 rounded-[1.25rem] text-lg font-bold shadow-xl shadow-accent/20 active:scale-[0.98] transition-all"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Planting Seeds..." : "Create Free Account"}
                                                </Button>
                                            </form>
                                        </TabsContent>
                                    </motion.div>
                                </AnimatePresence>
                            </Tabs>
                        </Card>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

// Sub-components
const CustomField = ({ id, label, type, placeholder, icon: Icon, value, onChange }: any) => (
    <div className="space-y-2 group">
        <Label htmlFor={id} className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950/30 px-1">{label}</Label>
        <div className="relative">
            <Icon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-200 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                className="pl-14 h-14 rounded-[1.25rem] bg-emerald-50/40 border-emerald-100/50 focus:border-emerald-300 focus:bg-white transition-all text-emerald-950 font-medium placeholder:text-emerald-200 shadow-none ring-0"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    </div>
);

const SocialLogin = ({ onGoogleClick, isLogin }: { onGoogleClick: () => void, isLogin?: boolean }) => (
    <div className="space-y-6">
        <Button
            type="button"
            variant="outline"
            className="w-full rounded-[1.25rem] h-14 border-emerald-100/60 gap-4 font-bold text-emerald-950 hover:bg-emerald-50 hover:border-emerald-200 transition-all bg-white shadow-sm text-base"
            onClick={onGoogleClick}
        >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.305 2.722 1.34 6.707l3.926 3.058z" />
                <path fill="#FBBC05" d="M1.34 6.707L5.266 9.765A7.062 7.062 0 0 0 4.909 12c0 .782.127 1.536.357 2.235L1.31 17.282A11.993 11.993 0 0 1 0 12c0-1.873.34-3.665.962-5.322l.378.029z" />
                <path fill="#4285F4" d="M12 24c3.155 0 5.8-1.045 7.732-2.836l-3.778-3.091c-1.045.7-2.382 1.118-3.954 1.118-3.045 0-5.618-2.054-6.541-4.818L1.31 17.282C3.255 21.218 7.314 24 12 24z" />
                <path fill="#34A853" d="M24 12c0-.855-.077-1.682-.218-2.482H12v4.691h6.727c-.29 1.564-1.173 2.891-2.491 3.773l3.778 3.091C22.31 19.1 24 15.827 24 12z" />
            </svg>
            {isLogin ? "Sign in with Google" : "Join with Google"}
        </Button>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-emerald-100/50"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em] overflow-hidden">
                <span className="bg-white px-6 text-emerald-950/20">or use your email</span>
            </div>
        </div>
    </div>
);

const BotanicalElement = ({ position, delay }: { position: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.1, 0.2, 0.1],
            y: [0, -15, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, delay }}
        className={`absolute ${position}`}
    >
        <Sprout className="w-10 h-10 text-emerald-300/30" />
    </motion.div>
);


export default Auth;
