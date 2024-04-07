import {Dispatch, FC, ReactNode, SetStateAction, MouseEvent, CSSProperties} from "react";
import styles from "./Modal.module.scss";

type ModalPropsType = {
    children: ReactNode;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    missClose?: boolean;
    maxWidth?: string; //maxWidth in vw
    minHeight?: string;
}

const Modal: FC<ModalPropsType> = (
    {children, isOpen, setOpen, missClose = true, maxWidth = "35", minHeight}
) => {

    const style = {
        "--width": maxWidth + "vw",
    } as CSSProperties;

    function modalClose() {
        if(!missClose) return; 
        setOpen(false);
    }

    function onModalCardClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
    isOpen? <div className={styles.modal} style={style} onClick={modalClose}> 
        <div className={styles.modal__card} onClick={onModalCardClick}>
            {children}
        </div>
    </div> : null
 )
};
export default Modal;