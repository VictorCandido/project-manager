"use client";

import { NavigateContext } from "@/contexts/navigate-context";
import { currentProfile } from "@/lib/current-profile";
import { menuItems } from "@/utils/menu-items";
import { UserButton } from "@clerk/nextjs";
import { Boxes, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Salsa } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Button } from "../ui/button";
import CommandSidebar from "./command-sidebar";
import SidebarItem from "./sidebar-item";

const salsa = Salsa({
    weight: '400',
    subsets: ['latin'],
});

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(NavigateContext);
    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState<{ username: string, mail: string } | null>(null);

    useEffect(() => {
        getCurrentProfileData();

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);

    function getCurrentProfileData() {
        // const { userId } = auth();

        currentProfile().then((data) => {
            if (!data) return;

            setUserData({
                username: data.name,
                mail: data?.email
            });
        }).catch((error) => {
            console.log('Falha ao listardar perfil - ', error);
        });
    }

    return (
        <>
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
                        <Button
                            variant="outline"
                            className="w-full flex justify-between text-zinc-400 items-center"
                            onClick={() => setOpen(true)}
                        >
                            <div className={`flex gap-2`}>
                                <Search size={18} />
                                <span className={`${!isOpenSidebar && 'hidden'}`}>Procurar...</span>
                            </div>
                            <span className={`text-xs ${!isOpenSidebar && 'hidden'}`}>⌘ + K</span>
                        </Button>

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
                                <h4 className="font-semibold">{userData?.username || 'Carregando...'}</h4>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{userData?.mail || 'Carregando...'}</span>
                            </div>

                            <div className={`${!isOpenSidebar && 'hidden'}`}>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {children}
                </div>
            </div >

            <CommandSidebar open={open} setOpen={setOpen} />
        </>
    );
}

export default Sidebar;