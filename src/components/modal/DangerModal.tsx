import { FC, MouseEventHandler, ReactNode } from "react";
import {
    Root,
    DangerModalRoot,
    DangerModalHeader,
    DangerModalContent,
    DangerModalFooter,
    Button,
    ButtonContainer
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
            <DangerModalRoot>
                <div onClick={onClick}>
                    <div>
                        <DangerModalHeader><h3>{header}</h3></DangerModalHeader>
                        <DangerModalContent>{content}</DangerModalContent>
                        <DangerModalFooter>{footer}</DangerModalFooter>
                        <ButtonContainer
                        style={{
                            backgroundColor: "#cc0000",
                            width: "auto",
                            height: "auto",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}>
                        <Button
                            onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
                            type="submit"
                            style={{ backgroundColor: "#EAF3E7", color: "#051101", fontSize: "calc(5px + 2vmin)" }}
                        >CANCEL</Button>
                        <Button
                            onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
                            type="submit"
                            style={{ backgroundColor: "red", color: "#051101", fontSize: "calc(5px + 2vmin)" }}
                        >DELETE</Button>
                        </ButtonContainer>
                    </div>
                </div>
            </DangerModalRoot>
        </Root>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById('modal-hook')!);
};


export default Modal;