"use client";

import ModalsProvider from "@/providers/ModalsProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NavigateProvider } from "@/contexts/NavigateContext";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                storageKey='project-manager'
            >
                <NavigateProvider>
                    <ModalsProvider />
                    { children }
                </NavigateProvider>
          </ThemeProvider>
        </>
    );
}