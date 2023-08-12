import { Helmet } from "react-helmet"
import { useAppSelector } from "@src/redux/hooks"

export default function BaseLayout({ title, children }: any) {
    const appState = useAppSelector((state) => state.app);

    const { settings } = appState;

    var site_name = '';

    if (settings.siteName) {
        site_name = ` :: ${(settings.siteName ?? "")}`
    }

    return <>
        <Helmet>
            <title>{title}{site_name}</title>
        </Helmet>
        <main className="flex flex-col flex-grow">
            {children}
        </main>
    </>
}
