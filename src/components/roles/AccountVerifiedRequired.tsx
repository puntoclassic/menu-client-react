import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import { MessageType } from '@src/types';

export default function AccountVerifiedRequired() {

    const { user } = useAppSelector((state) => state.account);
    const location = useLocation();

    if (user && user.verified) {
        return <Outlet />;
    } else {
        storeDispatch(pushMessage({
            type: MessageType.INFO,
            text: "Devi verificare il tuo account prima di poter accedere a questa pagina"
        }))
        return <Navigate to={"/account/login?backUrl=" + location.pathname} replace={true} />
    }

}
