import {Dispatch, FC, ReactNode, SetStateAction, MouseEvent} from "react";
import styles from "./Modal.module.scss";

type ModalPropsType = {
    children: ReactNode;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    missClose?: boolean;
}

const Modal: FC<ModalPropsType> = (
    {children, isOpen, setOpen, missClose = true}
) => {

    function modalClose() {
        if(!missClose) return; 
        setOpen(false);
    }

    function onModalCardClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
    isOpen? <div className={styles.modal} onClick={modalClose}> 
        <div className={styles.modal__card} onClick={onModalCardClick}>
            {children}
        </div>
    </div> : null
 )
};
export default Modal;