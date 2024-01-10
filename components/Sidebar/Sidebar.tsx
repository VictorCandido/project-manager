"use client";

import { AlignRight, Boxes, CalendarDays, ClipboardPenLine, FolderGit2, LayoutDashboard, Settings, Users2 } from "lucide-react";
import { useContext } from "react";
import SidebarItem from "./SidebarItem";
import MenuItemInterface from "@/interfaces/MenuItemInterface";
import { NavigateContext } from "@/contexts/NavigateContext";
import { Salsa } from "next/font/google";

const salsa = Salsa({
    weight: '400',
    subsets: ['latin'],
  });

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(NavigateContext);

    const menus: Array<MenuItemInterface> = [
        { key: 'home', name: 'Home', link: '/', icon: LayoutDashboard},
        { key: 'appointments', name: 'Apontamentos', link: '/appointments', icon: ClipboardPenLine },
        { key: 'schedule', name: 'Agenda', link: '/schedule', icon: CalendarDays },
        { key: 'projects', name: 'Projetos', link: '/projects', icon: FolderGit2 },
        { key: 'controlpanel', name: 'Painel de Controle', link: '/controlpanel', icon: Settings },
    ];

    return (
        <div className="flex">
            <div 
                className={`${isOpenSidebar ? 'w-72' : 'w-16'} duration-300 bg-background min-h-screen px-4 border-r border-zinc-300 dark:border-zinc-700`}
            >
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className={`my-7 flex gap-4 justify-center items-center`}>
                            <Boxes size={30}/> <span className={`${salsa.className}  ${!isOpenSidebar && 'hidden'}`}>PROJECT MANAGER</span>
                        </div>

                        <div className="mt-4 flex flex-col gap-4 relative">
                            { menus?.map((menu, index) => (
                                <SidebarItem 
                                    key={index} 
                                    menu={menu}
                                    index={index}
                                    open={isOpenSidebar}
                                />     
                            )) }
                        </div>
                    </div>

                    <div className="py-3 flex justify-end border-t">
                        <AlignRight 
                            size={26} 
                            className="cursor-pointer" 
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)} 
                        />
                    </div>
                </div>
                
            </div>

            <div className="w-full">
                { children }            
            </div>
        </div>
    );
}
 
export default Sidebar;