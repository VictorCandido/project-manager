"use client";

import { useContext } from "react";
import { ModeToggle } from "../ModeToggle";
import { UserNav } from "./UserNav";
import { NavigateContext } from "@/contexts/NavigateContext";

const Navbar = ({ children }: { children: React.ReactNode }) => {
    const { page } = useContext(NavigateContext);

    return (
        <div className="">
            <div 
                className="h-16 flex w-full items-center p-5 justify-between border-b bg-[#f2f3f5] dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            >
                { page.title }

                <div className="flex gap-5">
                    <ModeToggle />
                    <UserNav />
                </div>
                
            </div>

            <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto p-5">
                { children }
            </div>
        </div>
    );
}
 
export default Navbar;