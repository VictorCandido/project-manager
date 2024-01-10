import { NavigateContext } from "@/contexts/NavigateContext";
import MenuItemInterface from "@/interfaces/MenuItemInterface";
import Link from "next/link";
import { useContext } from "react";

interface SidebarItemProps {
    menu: MenuItemInterface;
    index: number;
    open: boolean;
}


const SidebarItem = ({ menu, index, open }: SidebarItemProps) => {
    const { page } = useContext(NavigateContext);
    
    return (
        <Link
            href={menu?.link} 
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-secondary dark:hover:bg-primary rounded-md ${menu.key === page.key && 'font-bold bg-secondary/30 dark:text-zinc-50 dark:bg-primary/50'}`}
        >
            <div>
                {<menu.icon 
                    size={20}
                />}
            </div>
            <h2 
                style={{ transitionDelay: `${index + 1}00ms` }}
                className={`whitespace-pre duration-300 ${!open && 'opacity-0 translate-x-14 overflow-hidden'}`}
            >
                { menu?.name }
            </h2>

            <h2 className={`${open && 'hidden'} absolute left-28 bg-white font-semibold whitespace-pre text-zinc-900 rounded-md drop-shadow-lg group-hover:px-2 w-0 overflow-hidden group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                { menu?.name }
            </h2>
        </Link> 
    );
}
 
export default SidebarItem;