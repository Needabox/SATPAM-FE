import { ReactElement, ReactNode } from "react";

type ModalButtonProps = {
    children: ReactNode,
    className: string,
    onClick?: () => void
}


const ModalButton = ({
    children,
    className,
    onClick
}: ModalButtonProps): ReactElement => {
    return (
        <button type="button" className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default ModalButton