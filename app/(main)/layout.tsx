import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: MainLayoutProps) => {
    return (
        <section className="">
            <Sidebar>
                <Navbar>
                    { children }
                </Navbar>
            </Sidebar> 
        </section>
    );
}

export default AuthLayout;