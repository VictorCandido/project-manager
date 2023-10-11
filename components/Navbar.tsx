import { ModeToggle } from "./ModeToggle";
import { UserNav } from "./UserNav";

const Navbar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <div 
                className="h-16 bg-blue-500 flex w-full items-center p-5 justify-between"
            >
                Page Title

                <div className="flex">
                    <ModeToggle />
                    <UserNav />
                </div>
                
            </div>

            <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto p-5">
                { children }
            </div>
        </div>
    );
}
 
export default Navbar;