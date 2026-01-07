import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-6">
                    <div className="max-w-md w-full bg-card p-10 rounded-3xl shadow-2xl border border-border text-center space-y-8 animate-reveal">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl font-bold">!</span>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight text-primary">Something went wrong</h1>
                            <p className="text-muted-foreground leading-relaxed">
                                We've encountered an unexpected botanical error. Our gardeners are looking into it.
                            </p>
                            {process.env.NODE_ENV === 'development' && (
                                <pre className="text-xs text-left bg-slate-100 p-4 rounded-xl overflow-auto max-h-32 text-red-600">
                                    {this.state.error?.message}
                                </pre>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={() => window.location.reload()}
                                className="flex-1 gap-2 py-6 text-lg"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                                className="flex-1 gap-2 py-6 text-lg"
                            >
                                <Home className="w-5 h-5" />
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
