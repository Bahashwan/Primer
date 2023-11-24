import {useEffect, useState} from "react";
import {clipboardCopy} from "@/utils";


interface CopyText {
    handleCopy: (text: string) => Promise<void>;
    hasCopied: boolean;
}
export function useCopyText(): CopyText  {
    const [hasCopied, setHasCopied] = useState<boolean>(false);

    const handleCopy = async (text: string) => {
        try {
            await clipboardCopy(text)
            setHasCopied(true)
        } catch (e) {
            console.error(e)
            alert('The request is not allowed')
        }
    }

    useEffect(() => {
        if (!hasCopied) return;

        const timeout = setTimeout(() => {
            setHasCopied(false);
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    }, [hasCopied]);

    return { handleCopy, hasCopied }
}