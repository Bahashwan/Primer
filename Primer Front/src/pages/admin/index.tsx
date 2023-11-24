import { useState, ChangeEvent} from "react"
import {axiosCfg} from "@/core-axios";
import {CheckAuthentication} from "@/components/check-authentication";
import dynamic from 'next/dynamic';
const ReactQuillComponent = dynamic(() => import('@/components/admin/react-quill-component'), {ssr: false});


export default function AdminBoard() {
    return (
        <>
            <div className="flex items-center flex-col gap-4 pt-[80px]">
                ADMIN BOARD
            </div>
            <CheckAuthentication/>
        </>
    )

}



