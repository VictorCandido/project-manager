import { ModeToggle } from "./ModeToggle";
import { UserNav } from "./UserNav";

const Navbar = () => {
    return (
        <div className="flex h-16 w-full z-50 items-center px-4 border-b dark:border-zinc-700  dark:bg-zinc-800 bg-[#f2f3f5] fixed top-0">
            PROJECT MANAGER (LOGO)

            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <UserNav />
            </div>
            
        </div>
    );
}
 
export default Navbar;