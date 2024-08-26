import { FC } from "react";
import WelcomeContainer from "components/common/Containers/WelcomeContainer";
import useAppSelector from "hooks/useAppSelector";

const WelcomePage: FC = () => {

    const {user} = useAppSelector(state => state.userReducer);

    return <WelcomeContainer user={user}/>;
};
export default WelcomePage;
