import Sidebar from "@/components/sidebar/sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: MainLayoutProps) => {
    return (
        <section className="">
            <Sidebar>
                <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto px-5 pt-5">
                    {children}
                </div>
            </Sidebar>
        </section>
    );
}

export default AuthLayout;