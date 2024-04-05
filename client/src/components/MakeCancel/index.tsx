import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Button from "components/common/Buttons/Button";
import {FC, MouseEvent} from "react";

import styles from "./MakeCancel.module.scss";

type MakeCancelType = {
    text?: string;
    icon?: IconDefinition;
    color?: "success" | "warn" | "blue" |"gray";
    disabled?: boolean;
    outline? :boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
    onCancel?: (e: MouseEvent<HTMLButtonElement>) => unknown;
}

const MakeCancel: FC<MakeCancelType> = ({
    text,
    icon,
    disabled = false,
    outline = false,
    onClick,
    onCancel,
    color
}) => {
    return (
        <div className={styles.buttons}>
            <Button disabled={disabled} type="submit" text={text} icon={icon} onClick={onClick} color={color} outline={outline}/>
            <Button text="отменить" color="gray" onClick={onCancel}/>
        </div>
 )
};
export default MakeCancel;