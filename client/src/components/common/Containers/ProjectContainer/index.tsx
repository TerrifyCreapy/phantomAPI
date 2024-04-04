import {FC} from "react"
import { useParams } from "react-router";

const ProjectContainer: FC = () => {
    const {id} = useParams();
    return (
<div>Project {id}</div>
 )
};
export default ProjectContainer;