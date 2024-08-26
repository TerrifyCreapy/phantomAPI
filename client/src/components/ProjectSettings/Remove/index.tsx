import {FC} from "react"

type RemoveType = {
    type?: "project" | "entity"
}

const Remove: FC<RemoveType> = ({type = "project"}) => {
    return (
        <span>Я понимаю, что удаляя {type === "project"? "данный проект": "данную сущность"}, данные, которые были доступны, будут стерты и я потеряю к ним доступ. Более они не смогут быть восстановлены с помощью ctrl+z или backups.</span>
 )
};
export default Remove;