"use client";

import { NavigateProvider } from "@/contexts/NavigateContext";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavigateProvider>
                { children }
            </NavigateProvider>
        </>
    );
}