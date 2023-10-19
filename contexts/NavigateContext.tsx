import { ReactNode, createContext, useState } from "react";

interface selectedPage {
    key: string;
    title: string;
}

interface NavigateContextProps {
    isOpenSidebar: boolean;
    setIsOpenSidebar: (value: boolean) => void;
    page: selectedPage;
    setPage: (value: selectedPage) => void;
}

export const NavigateContext = createContext({} as NavigateContextProps);

interface ContextProviderProps {
    children: ReactNode;
}

export function NavigateProvider({ children }: ContextProviderProps) {
    const [ isOpenSidebar, setIsOpenSidebar ] = useState(true);
    const [ page, setPage ] = useState<selectedPage>({ key: '', title: '' });

    const value: NavigateContextProps = {
        isOpenSidebar,
        setIsOpenSidebar,
        page,
        setPage
    }

    return (
        <NavigateContext.Provider value={value}>
            { children }
        </NavigateContext.Provider>
    );
}