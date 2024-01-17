import { MenuItemInterface } from "@/types/MenuItemInterface";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
interface SidebarItemProps {
    menu: MenuItemInterface;
    index: number;
    open: boolean;
}

const SidebarItem = ({ menu, index, open }: SidebarItemProps) => {
    const segment = useSelectedLayoutSegment();
    
    return (
        <Link
            href={menu?.link} 
            className={`
                group flex items-center text-sm py-2 px-3
                font-medium hover:bg-secondary rounded-md mt-4
                ${menu.key === segment && 'font-bold bg-secondary dark:text-zinc-50'} 
                ${!open && 'justify-center'}`}
        >
            {<menu.icon size={20}/>}

            <h2 className={`${open ? 'w-52 ml-3' : 'w-0 h-0'} overflow-hidden transition-all`}>
                { menu?.name }
            </h2>


            {!open && (
                <h2 className={`absolute left-28 bg-white font-semibold whitespace-pre text-zinc-900 rounded-md drop-shadow-lg group-hover:px-2 w-0 overflow-hidden group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}>
                    { menu?.name }
                </h2>
            )}
        </Link> 
    );
}
 
export default SidebarItem;