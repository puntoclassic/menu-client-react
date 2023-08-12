import {
    Navigate, Outlet, useLocation, createSearchParams
} from 'react-router-dom';
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";

export default function AdminRequiredRoute() {

    const { user } = useAppSelector((state) => state.account);
    const location = useLocation();


    if (user && user.role === "admin") {
        return <Outlet />;
    } else {
        if (!user) {
            storeDispatch(pushMessage({
                type: MessageType.INFO,
                text: "Questa pagina richiede l'accesso"
            }))

            var fromParams = new URLSearchParams(location.search);

            var params = createSearchParams({ backUrl: `${location.pathname}?${createSearchParams(fromParams)}` })

            var toObj = {
                pathname: "/account/login",
                search: `?${createSearchParams(params)}`
            }

            return <Navigate replace={true} to={toObj} />
        } else {
            return <Navigate to={"/403"} />
        }
    }

}
