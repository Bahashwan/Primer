
type IconProps = {
    name: string
    className: string
}

export function Icon({
    name,
    className
}: IconProps): JSX.Element {
    return (
        <svg className={className}>
            <use xlinkHref={`/sprite.svg#${name}`}/>
        </svg>
    )
}