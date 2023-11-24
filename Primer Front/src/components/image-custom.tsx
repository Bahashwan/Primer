import NextImage from "next/image";
import {useState} from "react";
import {clsx} from "clsx";

type ImageTypeProps = {
    containerClassName?: string,
    imageClassName?: string,
    src: string,
    width: number,
    height: number,
    alt?: string
}

export function Image(
    {
        containerClassName = "absolute inset-0 w-full h-full -z-1",
        imageClassName = "absolute inset-0 w-full h-full object-cover object-center",
        width,
        height,
        src,
        alt = ''
    }: ImageTypeProps
) {
    const [loaded, setLoaded] = useState<boolean>(false)


    return (
        <div className={containerClassName}>
            {!loaded && (
                <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-black">
                    <svg className="w-7 h-7" width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g className="spinner_V8m1">
                            <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
                        </g>
                    </svg>
                </div>
            )}
            <NextImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoadingComplete={() => setLoaded(true)}
                className={clsx(imageClassName, {
                    'opacity-0': !loaded,
                    'opacity-100': loaded
                })}
            />
        </div>
    )
}