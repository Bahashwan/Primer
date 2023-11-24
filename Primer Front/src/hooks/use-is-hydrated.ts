import { useEffect, useState } from 'react';

/**
 * Hook to determine if the page is hydrated.
 *
 * On server rendered content, it is false.
 * On initial client render, it is false.
 * After the React app has hydrated the server rendered HTML, it is true.
 */
export function useIsHydrated() {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated;
}
