"use client";

import { AlignRight, CalendarDays, LayoutDashboard, User } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import MenuItemInterface from "@/interfaces/MenuItemInterface";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(true);

    const menus: Array<MenuItemInterface> = [
        { name: 'Home', link: '/', icon: LayoutDashboard },
        { name: 'Calendar', link: '/calendar', icon: CalendarDays },
    ];

    return (
        <div className="flex">
            <div 
                className={`${open ? 'w-72' : 'w-16'} duration-300 bg-[#f2f3f5] dark:bg-zinc-800 min-h-screen px-4 border-r border-zinc-300 dark:border-zinc-700`}
            >
                <div>
                    <div className="py-3 flex justify-end">
                        <AlignRight 
                            size={26} 
                            className="cursor-pointer" 
                            onClick={() => setOpen(!open)} 
                        />
                    </div>

                    <div className={`my-7 ${!open && 'hidden'}`}>
                        PROJECT MANAGER (LOGO)
                    </div>

                    <div className="mt-4 flex flex-col gap-4 relative">
                        { menus?.map((menu, index) => (
                            <SidebarItem 
                                key={index} 
                                menu={menu}
                                index={index}
                                open={open}
                            />     
                        )) }

                    </div>








                    {/* <div className="my-3">
                        PROJECT MANAGER (LOGO)
                    </div> */}
                </div>
                
            </div>

            <div className="w-full">
                { children }            
            </div>
        </div>
    );
}
 
export default Sidebar;