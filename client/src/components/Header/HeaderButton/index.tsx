import {ButtonHTMLAttributes, FC, ReactNode} from "react"

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    className?: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({children, className, ...default_props}) => {
    return (
        <button className={className || ""} {...default_props}>
            {children}
        </button>
 )
};
export default HeaderButton;