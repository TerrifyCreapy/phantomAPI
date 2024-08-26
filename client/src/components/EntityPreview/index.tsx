import {CSSProperties, ChangeEvent, FC, useContext, useEffect, useState} from "react";
import styles from "./EntityPreview.module.scss";
import Button from "components/common/Buttons/Button";
import { faGear, faSquareArrowUpRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Portal from "components/common/Portal";
import Modal from "components/common/Modal";
import ProjectsSettings from "components/ProjectSettings";
import Remove from "components/ProjectSettings/Remove";
import ResourceEdit from "components/ProjectSettings/ResourceEdit";
import { ProjectContext } from "pages/ProjectsPage";

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
    remove,
}) => {

    const {entityJson, onLoadData, onUpdate} = useContext(ProjectContext);

    const style = {
        "--items": `${item_count / maxItems * 100}%`,
    } as CSSProperties;

    console.log(entityJson)

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openRemove, setOpenRemove] = useState<boolean>(false);
    const [name, setName] = useState<string>(endpoint);
    const [valueEntity, setValue] = useState<string>(entityJson);

    useEffect(() => {
        setValue(entityJson);
    }, [entityJson])

    

    function onChangeName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function onChangeValue(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
    }

    function onOpenRemove() {
        setOpenRemove(true);
    }

    function onOpenEdit() {
        onLoadData(id);
        setOpenEdit(true);
    }

    function onSaveUpdate() {
        onUpdate(id, name, valueEntity);
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
                <Button icon={faGear} outline color="gray" onClick={onOpenEdit}/>
                <Button icon={faTrash} outline color="warn" onClick={onOpenRemove}/>
            </div>
            <Portal id="root">
                <Modal isOpen={openEdit} setOpen={() => setOpenEdit(false)} missClose={false} maxWidth="35" maxMobile="200">
                    <ProjectsSettings
                        action="сохранить"
                        text=""
                        color="warn"
                        outline
                        onClick={onSaveUpdate}
                        onCancel={() => setOpenEdit(false)}
                        >
                            <ResourceEdit
                                name={name}
                                changeName={onChangeName}
                                value={valueEntity}
                                changeValue={onChangeValue}
                                path={`http://localhost:7000/api/v0.1/`}
                            
                            />
                    </ProjectsSettings>
                </Modal>
                <Modal isOpen={openRemove} setOpen={() => setOpenRemove(false)} missClose={false} >
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