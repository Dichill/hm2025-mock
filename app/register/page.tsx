"use client";

import { useState, useEffect } from "react";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[rgb(var(--mesa-warm-red))]">
                        HACKMESA
                    </h1>
                    <p className="text-[rgb(var(--mesa-grey))] mt-2">
                        Register with your LACCD email
                    </p>
                </div>

                {isClient && <RegisterForm />}
            </div>
        </div>
    );
}
