import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="h-full">
            <Navbar />

            <div className="h-full">
                <Sidebar />

                <div className="h-full ml-60 mt-16 p-5">
                    { children }
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;