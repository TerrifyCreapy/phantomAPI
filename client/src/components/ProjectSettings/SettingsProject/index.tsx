import {ChangeEvent, FC, useState} from "react";
import styles from "./SettingsProject.module.scss";
import Input from "components/common/Input";
import SwitchInput from "components/common/SwitchInput";
import IProject from "interfaces/entities/IProject";

type SettingsProjectType = {
    name: string;
    project: IProject;
};

const SettingsProject: FC<SettingsProjectType> = ({name, project}) => {

    const [projectName, setProjectName] = useState<string>(name);

    function onChangeProjectName(e: ChangeEvent<HTMLInputElement>) {
        setProjectName(e.target.value);
    }

    const [auth, setAuth] = useState<boolean>(project.auth);
    const [reg, setReg] = useState<boolean>(project.register);
    const [uploads, setUploads] = useState<boolean>(project.uploads);

    function onSetAuth() {
        setAuth(value => !value);
    }
    function onSetReg() {
        setReg(value => !value);
    }
    function onSetUploads() {
        setUploads(value => !value);
    }


    return (
        <div className={styles.container}>
            <Input value={projectName} onChange={onChangeProjectName}/>
            <SwitchInput hint="Auth" checked={auth} onClick={onSetAuth}/>
            <SwitchInput hint="Reg" checked={reg} onClick={onSetReg}/>
            <SwitchInput hint="Uploads" checked={uploads} onClick={onSetUploads}/>
        </div>
 )
};
export default SettingsProject;