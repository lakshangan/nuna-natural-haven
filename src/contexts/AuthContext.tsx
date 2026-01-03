import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: any | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Mock authentication check
        // In the future, this should call your backend API
        setUser(null);
        setLoading(false);
    }, []);

    const signOut = async () => {
        // Mock sign out
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
