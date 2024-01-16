"use client";

import { ModeToggle } from "../ModeToggle";
import { UserNav } from "./UserNav";
import { useSelectedLayoutSegment } from "next/navigation";
import { menuItems } from "@/utils/menuItems";

const Navbar = ({ children }: { children: React.ReactNode }) => {
    const segment = useSelectedLayoutSegment();

    const title = menuItems.find(item => item.key === segment)?.name;

    return (
        <div className="">
            <div 
                className="h-16 flex w-full items-center p-5 justify-between border-b bg-background"
            >
                <span className="font-bold text-xl">{ title }</span>

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