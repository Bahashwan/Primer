import {Header} from "src/components/header";
import {Footer} from "@/components/footer";
import {inter} from "@/styles/fonts";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
}

export function Layout({children}: LayoutProps) {
    return (
        <div className='wrapper'>
            <Header/>
            <main className={`${inter.variable} font-sans`}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}