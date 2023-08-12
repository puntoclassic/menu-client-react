import { Link } from "react-router-dom";
import { useAppSelector } from "@src/redux/hooks";
import DashboardButton from "@src/components/account/DashboardButton";


export default function DashboardAdmin() {

    const accountState = useAppSelector((state) => state.account);

    const { user } = accountState;

    if (user.role === "admin") {
        return <>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Catalogo</h4>
            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                <DashboardButton title='Categorie' link="/amministrazione/categorie" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                } />
                <DashboardButton title='Cibi' link="/amministrazione/cibi" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                } />

            </div>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Vendite</h4>

            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>

                <DashboardButton title='Stati ordine' link="/amministrazione/stati-ordine" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>

                } />
            </div>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Negozio</h4>

            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>

                <DashboardButton title='Impostazioni' link="/amministrazione/impostazioni" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                    </svg>


                } />
            </div>
        </>

    } else {
        return null;
    }

}
