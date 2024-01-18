import { MenuItemInterface } from "@/types/MenuItemInterface";
import { CalendarDays, ClipboardPenLine, FolderGit2, Globe, LayoutDashboard, Settings, UserRoundCog, Users } from "lucide-react";

export const menuItems: Array<MenuItemInterface> = [
    { key: 'home', name: 'Home', link: '/home', icon: LayoutDashboard },
    { key: 'appointments', name: 'Apontamentos', link: '/appointments', icon: ClipboardPenLine },
    { key: 'schedule', name: 'Agenda', link: '/schedule', icon: CalendarDays },
    { key: 'projects', name: 'Projetos', link: '/projects', icon: FolderGit2 },
    { key: 'controlpanel', name: 'Painel de Controle', link: '/controlpanel', icon: Settings },
];

export const controlPanelMenuItems: MenuItemInterface[] = [
    {
        key: 'users',
        name: "Usuários",
        link: "/controlpanel/users",
        icon: UserRoundCog,
    },
    {
        key: 'companies',
        name: "Empresas",
        link: "/controlpanel/companies",
        icon: Globe,
    },
    {
        key: 'customers',
        name: "Clientes",
        link: "/controlpanel/customers",
        icon: Users,
    },
];