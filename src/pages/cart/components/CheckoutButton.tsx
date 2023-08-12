import { useAppSelector } from "@src/redux/hooks";
import { Link } from "react-router-dom";


export default function CheckoutButton() {
    const appState = useAppSelector((state) => state.account);

    var { user } = appState;
    if (user) {
        return <>
            <Link className="bg-green-800 text-white p-4 hover:bg-green-900" to="/checkout/tipologia-consegna">Vai alla cassa</Link>
        </>
    } else {
        return null;
    }
}
