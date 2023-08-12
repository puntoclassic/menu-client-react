import { Link } from "react-router-dom"
import { useAppSelector } from "@src/redux/hooks";


export default function Header() {

    const appState = useAppSelector((state) => state.app);

    const { settings } = appState;
    return <>
        <div className="bg-red-900 p-8">
            <Link to={"/"} className="text-white text-center">
                <p className="text-4xl font-sans" style={{ fontFamily: "Smooch" }}>{settings.siteName}</p>
                <p className="font-sans">{settings.siteSubtitle}</p>
            </Link>
        </div>
    </>
}
