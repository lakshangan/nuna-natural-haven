import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";

const AuthCallback = () => {
    const navigate = useNavigate();
    const { handleToken } = useAuth();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Standard Supabase Session Recovery
                // The library automatically detects the hash fragment
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                if (data.session) {
                    await handleToken(data.session.access_token);
                    if (data.session.refresh_token) {
                        localStorage.setItem("refresh_token", data.session.refresh_token);
                    }
                    toast.success("Successfully logged in!");
                    navigate("/dashboard");
                } else {
                    // If no session found immediately, check local storage or redirect
                    // Wait a brief moment to handle any race conditions in the library
                    setTimeout(() => {
                        const token = localStorage.getItem("token");
                        if (token) {
                            navigate("/dashboard");
                        } else {
                            // If we are still here and have no session, likely an error or cancelled login
                            // Only redirect if we effectively have no state
                            const hash = window.location.hash;
                            if (!hash || hash.length < 10) {
                                navigate("/auth");
                            }
                        }
                    }, 1000);
                }
            } catch (err: any) {
                console.error("Auth callback error:", err);
                toast.error(`Login failed: ${err.message}`);
                navigate("/auth");
            }
        };

        handleAuthCallback();
    }, [navigate, handleToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Finalizing your botanical access...</p>
            </div>
        </div>
    );
};

export default AuthCallback;
