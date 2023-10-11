import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: MainLayoutProps) => {
    return (
        // <section className="flex h-full">
        <section className="">
            <Sidebar>
                <Navbar>
                    { children }
                </Navbar>
            </Sidebar> 










            {/* <div className="h-full">

                <div className="h-full ml-60 mt-16 p-5">
                    { children }
                </div>
            </div> */}

        </section>
    );
}

export default AuthLayout;