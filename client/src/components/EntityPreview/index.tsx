import {CSSProperties, FC, useState} from "react";
import styles from "./EntityPreview.module.scss";
import Button from "components/common/Buttons/Button";
import { faGear, faSquareArrowUpRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Portal from "components/common/Portal";
import Modal from "components/common/Modal";
import ProjectsSettings from "components/ProjectSettings";
import Remove from "components/ProjectSettings/Remove";

const maxItems = 100;

type EntityPreviewType = {
    id: number;
    endpoint: string;
    item_count: number;
    path: string;
    remove?: (id: number) => unknown;
}

const EntityPreview: FC<EntityPreviewType> = ({
    id,
    endpoint,
    item_count,
    path,
    remove
}) => {

    const style = {
        "--items": `${item_count / maxItems * 100}%`,
    } as CSSProperties;

    const [openRemove, setOpenRemove] = useState<boolean>(false);

    function onOpenRemove() {
        setOpenRemove(true);
    }

    function removeItem() {
        if(remove) remove(id);
        setOpenRemove(false);
    }

    return (
        <li className={styles.container} style={style}>
            <div className={styles.left}>
                <a href={path} target="__blank" className={styles.left__endpoint}>
                    /{endpoint}
                    <FontAwesomeIcon icon={faSquareArrowUpRight}/>
                </a>
                <div className={styles.left__count}>
                    <div className={styles.left__count_progress}></div>
                    <span className={styles.left__count_text}>
                        <span>{item_count}</span>
                        <span>/</span>
                        <span>{maxItems}</span>
                    </span>
                </div>
            </div>
            <div className={styles.right}>
                <Button icon={faGear} outline color="gray"/>
                <Button icon={faTrash} outline color="warn" onClick={onOpenRemove}/>
            </div>
            <Portal id="root">
                <Modal isOpen={openRemove} setOpen={() => setOpenRemove(false)} missClose={false}>
                    <ProjectsSettings
                        action="удалить"
                        text="удалить cущность?"
                        color="warn"
                        outline
                        onClick={removeItem}
                        onCancel={() => setOpenRemove(false)}
                    >
                        <Remove type="entity"/>
                    </ProjectsSettings>
                </Modal>
            </Portal>
        </li>
 )
};
export default EntityPreview;