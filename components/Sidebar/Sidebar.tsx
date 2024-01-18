"use client";

import { Boxes, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext } from "react";
import SidebarItem from "./SidebarItem";
import { NavigateContext } from "@/contexts/NavigateContext";
import { Salsa } from "next/font/google";
import { menuItems } from "@/utils/menuItems";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { UserButton } from "@clerk/nextjs";

const salsa = Salsa({
    weight: '400',
    subsets: ['latin'],
});

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(NavigateContext);

    return (
        <div className="flex">
            <div className='bg-background flex flex-col min-h-screen border-r relative shadow-sm'>
                {/* LOGO */}
                <div className="p-5 flex justify-center items-center">
                    <button
                        className="bg-secondary text-3xl rounded-full absolute -right-3 top-9 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    >
                        {isOpenSidebar ? <ChevronLeft /> : <ChevronRight />}
                    </button>

                    <Boxes size={30} /> <span className={`${salsa.className} ${isOpenSidebar ? 'w-36 ml-4' : 'w-0 h-0'} overflow-hidden transition-all`}>PROJECT MANAGER</span>
                </div>

                {/* MENU */}
                <div className="flex-1 px-3">
                    {menuItems?.map((menu, index) => (
                        <SidebarItem
                            key={index}
                            menu={menu}
                            index={index}
                            open={isOpenSidebar}
                        />
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex border-t p-4">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: 'h-10 w-10 rounded-md',
                                userButtonTrigger: 'rounded-md'
                            }
                        }}
                    />

                    <div className={`
                        flex justify-between items-center 
                        overflow-hidden transition-all 
                        ${isOpenSidebar ? 'w-52 ml-3' : 'w-0'}
                    `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Víctor Cândido</h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400">victorev@outlook.com</span>
                        </div>

                        <div className={`${!isOpenSidebar && 'hidden'}`}>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {children}
            </div>
        </div>
    );
}

export default Sidebar;