import MakeCancel from "components/MakeCancel";
import {FC, ReactNode, MouseEvent} from "react";
import styles from "./ProjectsSettings.module.scss";

type ProjectsSettingsType = {
    children: ReactNode;
    text: string;
    action: string;
    color?: "success" | "gray" | "warn" | "blue";
    outline?: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => unknown;
    onCancel: (e: MouseEvent<HTMLButtonElement>) => unknown;
}

const ProjectsSettings: FC<ProjectsSettingsType> = ({
    children,
    text,
    action,
    color,
    outline,
    onClick,
    onCancel,
}) => {
    return (
        <div className={styles.container}>
            {text?<h1 className={styles.container_title}>{text}</h1>:null}
            {children}
            <MakeCancel text={action} onCancel={onCancel} onClick={onClick} color={color} outline={outline}/>
        </div>
 )
};


export default ProjectsSettings;