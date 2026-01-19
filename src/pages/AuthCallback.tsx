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
                // 1. Manually Extract Token from Hash
                // Supabase redirects to /auth/callback#access_token=...
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get("access_token");
                const refreshToken = hashParams.get("refresh_token");

                if (accessToken) {
                    console.log("Token found in hash. Verifying directly...");

                    // 2. Verify validity by fetching the user
                    // This bypasses 'getSession' issues by directly asking "Is this token valid?"
                    const { data, error } = await supabase.auth.getUser(accessToken);

                    if (error) {
                        console.error("Token verification failed:", error);
                        // If verification fails, we fall through to other methods or error out
                    } else if (data.user) {
                        console.log("User verified:", data.user.email);

                        // 3. Login Successful - Set Token manually
                        await handleToken(accessToken);

                        // Optional: Save refresh token if available
                        if (refreshToken) {
                            localStorage.setItem("refresh_token", refreshToken);
                        }

                        // Force session set (best effort) to sync client state
                        supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken || ""
                        }).catch(() => { });

                        toast.success(`Welcome back!`);
                        navigate("/dashboard");
                        return;
                    }
                }

                // 3. Fallback: Check if Supabase already has a session
                // (e.g. if we navigated here with a session cookie)
                const { data } = await supabase.auth.getSession();
                if (data.session) {
                    console.log("Existing session found");
                    await handleToken(data.session.access_token);
                    navigate("/dashboard");
                    return;
                }

                // 4. Fallback for Error params in URL
                const queryParams = new URLSearchParams(window.location.search);
                const errorDescription = queryParams.get("error_description");
                if (errorDescription) {
                    toast.error(errorDescription);
                    navigate("/auth");
                    return;
                }

                // 5. If truly nothing found
                console.warn("No authentication data found in URL.");
                // wait brief moment to ensure we didn't miss a race condition, then redirect
                setTimeout(() => {
                    if (localStorage.getItem("token")) {
                        navigate("/dashboard");
                    } else {
                        // Only redirect to auth if we are truly sure we failed
                        console.log("Redirecting to login...");
                        navigate("/auth");
                    }
                }, 1500);

            } catch (err: any) {
                console.error("Auth callback error:", err);
                toast.error("Authentication failed. Please try again.");
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
