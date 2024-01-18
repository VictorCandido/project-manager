import { Laptop, Moon, Settings, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { menuItems } from "@/utils/menuItems";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../ui/command";

interface CommandSidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CommandSidebar = ({ open, setOpen }: CommandSidebarProps) => {
    const router = useRouter();
    const { setTheme } = useTheme();

    const runCommand = (command: () => unknown) => {
        setOpen(false);
        command();
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Insira um comando ou pesquise..." />
            <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Páginas">
                    {menuItems?.map((menu) => (
                        <CommandItem key={menu.key} onSelect={() => runCommand(() => router.push(menu.link))}>
                            <menu.icon className="mr-2 h-4 w-4" />
                            <span>{menu.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Comandos">
                    <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
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