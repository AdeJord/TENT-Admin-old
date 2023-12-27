import { FC, MouseEventHandler, ReactNode } from "react";
import {
    Root,
    ModalRoot,
    ModalHeader,
    ModalContent,
    ModalFooter
} from "../../styles";
import ReactDOM from "react-dom";

interface ModalProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    header: string;
    content: ReactNode;
    footer: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClick, header, content, footer }: ModalProps) => {
    const modalContent = (
        <Root>
            <ModalRoot onClick={onClick}>
                <ModalHeader><h3>{header}</h3></ModalHeader>
                <ModalContent>{content}</ModalContent>
                <ModalFooter>{footer}</ModalFooter>
            </ModalRoot>
        </Root>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById('modal-hook')!);
};


export default Modal;