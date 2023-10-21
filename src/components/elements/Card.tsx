import { ReactElement, ReactNode } from "react";

type CardProps = {
    children: ReactNode
    className?: String
}

const Card = ({children, className = "bg-white"}: CardProps): ReactElement => {
    return (
        <div className={`bg-white flex rounded-lg shadow-lg ${className}`}>
            {children}
        </div>
    )
}

export default Card