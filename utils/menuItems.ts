import MenuItemInterface from "@/interfaces/MenuItemInterface";
import { CalendarDays, ClipboardPenLine, FolderGit2, LayoutDashboard, Settings } from "lucide-react";

export const menuItems: Array<MenuItemInterface> = [
    { key: 'home', name: 'Home', link: '/home', icon: LayoutDashboard },
    { key: 'appointments', name: 'Apontamentos', link: '/appointments', icon: ClipboardPenLine },
    { key: 'schedule', name: 'Agenda', link: '/schedule', icon: CalendarDays },
    { key: 'projects', name: 'Projetos', link: '/projects', icon: FolderGit2 },
    { key: 'controlpanel', name: 'Painel de Controle', link: '/controlpanel', icon: Settings },
];