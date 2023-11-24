import Head from "next/head";
import {AccountOverview} from "@/components/profile/account-overview";
import {AccountTables} from "@/components/profile/account-tables";
import {TrendindProduct} from "@/components/profile/trendind-product";
import {GetServerSideProps} from "next";
import {CheckAuthentication} from "@/components/check-authentication";

export default function ProfilePage() {

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <AccountOverview/>
            <AccountTables/>
            <TrendindProduct/>
            <CheckAuthentication/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies: string = context.req.headers.cookie || ""

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/auth/check`, {
            method: "GET",
            headers: {
                'Cookie': cookies
            },
        })

        if (!res.ok) {
            return {
                redirect: {permanent: false, destination: "/"}
            }
        }

    } catch (e) {
        console.error(e)
        return {
            redirect: {permanent: false, destination: "/"}
        }
    }

    return {
        props: {}
    }
}