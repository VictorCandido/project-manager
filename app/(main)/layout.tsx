import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: MainLayoutProps) => {
    return (
        <section className="">
            <Sidebar>
                <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto p-5">
                    { children }
                </div>
            </Sidebar> 
        </section>
    );
}

export default AuthLayout;