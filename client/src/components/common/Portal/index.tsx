import {FC, ReactNode, useEffect, useState} from "react"
import { createPortal } from "react-dom";

type PortalType = {
    id: string;
    children: ReactNode;
}

const Portal: FC<PortalType> = ({id, children}) => {
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if(id) {
            const portalContainer = document.getElementById(id);
            if(!portalContainer) {
                throw new Error("No container in markup.");
            }

            setContainer(portalContainer);
        }
    }, [id]);

    return (
        container? createPortal(children, container):null
    );
};
export default Portal;