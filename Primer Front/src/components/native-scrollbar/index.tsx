import {useRef, ReactNode, MouseEvent} from "react";

type HorizontalScrollProps = {
    children: ReactNode,
    classes?: string
}

type TypeSettings = {
    isDragging: boolean,
    x: number
}

export function HorizontalScroll({children, classes = ''}:HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const settings = useRef<TypeSettings>({
        isDragging: false,
        x: 0
    })

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
        settings.current.isDragging = true
        settings.current.x = e.clientX
    };

    const handleMouseUp = (): void => {
        settings.current.isDragging = false
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
        if (!settings.current.isDragging || !containerRef.current) return;
        e.preventDefault();
        const newDiff = settings.current.x - e.clientX;
        settings.current.x = e.clientX;
        containerRef.current!.scrollLeft += newDiff;
        // Поставил восклицательный знак, чтобы дать понять TypeScript, что containerRef.current не может быть тут null, а то даже с условием сверху он выдавал ошибку qualifier of 'scrollLeft' is possibly null
    }


    return (
        <div
            className={"overflow-x-auto " + classes}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
    )
}