import {HeroAnimationImages} from "@/components/hero-animation-images";
import Link from 'next/link';
import {AnimationTitle} from "@/components/animation-title";
import {ConnectWalletButton} from "@/components/buttons/connect-wallet-button";
import {StatusAuthentication, useAuthorizationStore} from "@/store/authorization-store";
import {LoadingButton} from "@/components/buttons/loading-button";

export function Hero() {
    return (
        <section className="hero-block relative overflow-hidden pt-[372px] pb-[382px] lg:pt-[334px] lg:pb-[278px] sm:pt-[250px] sm:pb-[140px]">
            <div className="absolute inset-0 w-full h-full bg-hero-gr"/>
            <HeroAnimationImages/>
            <div className="relative z-10 flex items-center flex-col max-w-container mx-auto px-8 lg:px-4">
                <AnimationTitle/>
                <p className="text-dark-purplish-blue uppercase text-2xl mb-16 xl:text-xl lg:text-lg md:text-base sm:mb-8 m:text-center">
                    Brand new way to invest in NFT
                </p>
                <div className="flex space-x-6 items-center sm:flex-col sm:space-x-0 sm:space-y-6">
                    <Link href="/explore" className="w-[180px] text-center bg-white text-black font-semibold rounded-3xl py-3 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 lg:text-sm sm:w-[260px]">
                        Explore
                    </Link>
                    <StatusButton/>
                </div>
            </div>
        </section>
    )
}


function StatusButton() {
    const status = useAuthorizationStore(state => state.status)

    return (
        <>
            {status === StatusAuthentication.LOADING && (
                <LoadingButton
                    btnClasses="w-[180px] flex items-center justify-center bg-dark-purplish-blue text-white font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 lg:text-sm lg:py-3 sm:w-[260px]"
                    svgClasses="animate-spin w-5 h-5"
                />
            )}
            {status === StatusAuthentication.NOT_AUTHENTICATION && (
                <ConnectWalletButton classes="w-[180px] bg-dark-purplish-blue text-white font-semibold rounded-3xl py-3 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 lg:text-sm sm:w-[260px]"/>
            )}
            {status === StatusAuthentication.AUTHENTICATION && (
                <Link href="/profile" className="w-[180px] text-center bg-dark-purplish-blue text-white font-semibold rounded-3xl py-3 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 lg:text-sm sm:w-[260px]">
                    Account
                </Link>
            )}
        </>
    )
}