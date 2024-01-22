import { Boxes } from "lucide-react";
import { Salsa } from "next/font/google";
import Image from "next/image";
interface AuthLayoutProps {
    children: React.ReactNode;
}

const salsa = Salsa({
    weight: '400',
    subsets: ['latin'],
});

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 flex">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <Image
                        src='/login-background.jpg'
                        width={5304}
                        height={7952}
                        alt="background image"
                        className="absolute inset-0 max-h-screen"
                    />

                    <div className="absolute inset-0 bg-zinc-900/60" />

                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Boxes size={40} />
                        <span className={`${salsa.className} ml-4 text-2xl`}>PROJECT MANAGER</span>
                    </div>

                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Supere desafios e alcance resultados extraordinários com <span className={`${salsa.className}`}>PROJECT MANAGER</span>. Planeje, execute e colabore de forma eficiente. Faça login para impulsionar seus projetos agora!
                            </p>
                        </blockquote>
                    </div>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="h-full w-full flex items-center justify-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;