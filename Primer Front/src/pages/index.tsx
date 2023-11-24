import Head from 'next/head'
import {Hero} from "@/components/landing-sections/hero";
import {HowItWorks} from "@/components/landing-sections/how-it-works";
import {FeaturedNFTs} from "@/components/landing-sections/featured-nfts";
import {MoreAboutUs} from "@/components/landing-sections/more-about-us";
import {NftBestConditions} from "@/components/landing-sections/nft-best-conditions";
import {GotQuestions} from "@/components/landing-sections/got-questions";
import {NotableArticles} from "@/components/landing-sections/notable-articles";
import {CheckAuthentication} from "@/components/check-authentication";
import {BuyButtonPopup} from "@/components/explore/buy-button-popup";


export default function LandingPage() {

    return (
        <>
            <Head>
                <title>Crypto hedge fund</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Hero/>
            <HowItWorks/>
            <FeaturedNFTs/>
            <MoreAboutUs/>
            <NftBestConditions/>
            <GotQuestions/>
            <NotableArticles/>
            <CheckAuthentication/>
            <BuyButtonPopup count={1}/>
        </>
    )
}

// export const getStaticProps: GetStaticProps =  () => {
//
// }
