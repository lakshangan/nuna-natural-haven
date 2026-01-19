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
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                if (data.session) {
                    await handleToken(data.session.access_token);
                    // Persist refresh token if available for smoother re-auth
                    if (data.session.refresh_token) {
                        localStorage.setItem("refresh_token", data.session.refresh_token);
                    }
                    toast.success("Successfully logged in!");
                    navigate("/dashboard");
                } else {
                    // Graceful Fallback: Wait briefly for internal state or redirect
                    setTimeout(() => {
                        const token = localStorage.getItem("token");
                        if (token) {
                            navigate("/dashboard");
                        } else {
                            // If no session is found, check if we are stuck in a hash fragment
                            const hash = window.location.hash;
                            if (!hash || hash.length < 10) {
                                // Only redirect to auth if we clearly failed
                                navigate("/auth");
                            }
                        }
                    }, 1000);
                }
            } catch (err: any) {
                console.error("Auth callback error:", err.message);
                toast.error(`Login failed: Please try again.`);
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
