import {
    Navigate, Outlet, useSearchParams
} from 'react-router-dom';
import { useAppSelector } from '@src/redux/hooks';


export default function AnonymousRequired() {

    const [searchParams] = useSearchParams();

    const backUrl = searchParams.get("backUrl");

    const { userLogged } = useAppSelector((state) => state.account);


    if (userLogged == false) {
        return <Outlet />;
    } else {

        return <Navigate replace={true} to={backUrl ?? "/account"} />
    }

}
