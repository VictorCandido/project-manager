"use client";

import { AlignRight, CalendarDays, FolderGit2, LayoutDashboard, Settings, Users2 } from "lucide-react";
import { useContext } from "react";
import SidebarItem from "./SidebarItem";
import MenuItemInterface from "@/interfaces/MenuItemInterface";
import { NavigateContext } from "@/contexts/NavigateContext";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(NavigateContext);

    const menus: Array<MenuItemInterface> = [
        { key: 'home', name: 'Home', link: '/', icon: LayoutDashboard},
        { key: 'schedule', name: 'Agenda', link: '/schedule', icon: CalendarDays },
        { key: 'projects', name: 'Projetos', link: '/projects', icon: FolderGit2 },
        { key: 'controlpanel', name: 'Painel de Controle', link: '/controlpanel', icon: Settings },
    ];

    return (
        <div className="flex">
            <div 
                className={`${isOpenSidebar ? 'w-72' : 'w-16'} duration-300 bg-[#f2f3f5] dark:bg-zinc-800 min-h-screen px-4 border-r border-zinc-300 dark:border-zinc-700`}
            >
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className={`my-7 ${!isOpenSidebar && 'hidden'}`}>
                            PROJECT MANAGER (LOGO)
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

                    <div className="py-3 flex justify-end border border-t-zinc-400 dark:border-t-zinc-500">
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