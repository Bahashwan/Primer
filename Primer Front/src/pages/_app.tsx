import '@/styles/globals.css'
import "keen-slider/keen-slider.min.css";
import type {AppProps} from 'next/app'
import {Layout} from "@/components/layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import { ThirdwebProvider, walletConnect } from '@thirdweb-dev/react';
import { Mumbai } from '@thirdweb-dev/chains';
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        router.events.on("routeChangeStart", handleRouteStart);
        router.events.on("routeChangeComplete", handleRouteDone);
        router.events.on("routeChangeError", handleRouteDone);

        return () => {
            router.events.off("routeChangeStart", handleRouteStart);
            router.events.off("routeChangeComplete", handleRouteDone);
            router.events.off("routeChangeError", handleRouteDone);
        };
    }, [router]);

    return (
        
            <ThirdwebProvider
                activeChain={Mumbai}
                supportedWallets={[walletConnect()]}
                autoConnect={false}
            >
                <Layout>
                <Component {...pageProps} />
                </Layout>
            </ThirdwebProvider>  

    )
}
