import { Laptop, Moon, PlusCircle, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { controlPanelMenuItems, menuItems } from "@/utils/menu-items";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../ui/command";
import { useModal } from "@/hooks/use-modal-store";
import { useCallback, useEffect } from "react";

interface CommandSidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CommandSidebar = ({ open, setOpen }: CommandSidebarProps) => {
    const router = useRouter();
    const { setTheme } = useTheme();
    const { onOpen } = useModal();

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [setOpen]);

    const redirectToApponintmentsAndOpenNewAppointmentModal = useCallback(() => {
        router.push('/appointments');
        onOpen('newAppointment');
    }, [router, onOpen]);

    const redirectToCustomersAndOpenNewCustomerModal = useCallback(() => {
        router.push('/controlpanel/customers');
        onOpen('newCustomer');
    }, [router, onOpen]);

    // Quando Command estiver aberto e estiver na página de apontamentos
    // e usuário digitar command + n
    // Abre o modal de novo apontamento
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "n" && (e.metaKey || e.ctrlKey) && open) {
                e.preventDefault();
                runCommand(() => redirectToApponintmentsAndOpenNewAppointmentModal());
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, [onOpen, open, redirectToApponintmentsAndOpenNewAppointmentModal, runCommand]);


    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Insira um comando ou pesquise..." />
            <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Páginas">
                    {menuItems?.map((menu) => (
                        // não exibir se for painel de controle
                        menu.key !== 'controlpanel' && (
                            <CommandItem key={menu.key} onSelect={() => runCommand(() => router.push(menu.link))}>
                                <menu.icon className="mr-2 h-4 w-4" />
                                <span>{menu.name}</span>
                            </CommandItem>
                        )
                    ))}
                </CommandGroup>

                <CommandSeparator />

                {/* Lista as opções do menu do painel de controle */}
                <CommandGroup heading="Painel de controle">
                    {controlPanelMenuItems?.map((menu) => (
                        <CommandItem key={menu.key} onSelect={() => runCommand(() => router.push(menu.link))}>
                            <menu.icon className="mr-2 h-4 w-4" />
                            <span>{menu.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandGroup heading="Apontamentos">
                    <CommandItem onSelect={() => runCommand(() => redirectToApponintmentsAndOpenNewAppointmentModal())}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Novo apontamento</span>

                        <CommandShortcut>⌘ + N</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Clientes">
                    <CommandItem onSelect={() => runCommand(() => redirectToCustomersAndOpenNewCustomerModal())}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Novo cliente</span>

                        <CommandShortcut>⌘ + N</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Tema">
                    <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                        <Laptop className="mr-2 h-4 w-4" />
                        System
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

export default CommandSidebar;