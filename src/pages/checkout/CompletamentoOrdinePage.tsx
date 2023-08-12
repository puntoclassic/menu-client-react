import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";

import HeaderMenu from "@src/components/HeaderMenu";
import { useEffect } from "react";
import axiosIstance from "@src/services/axiosIstance";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { useNavigate } from "react-router-dom";
import { resetCart } from "@src/redux/reducers/cart";
import routes from "@src/services/routes";


export default function CompletamentoOrdinePage() {

    const cartState = useAppSelector((state) => state.cart);

    const navigate = useNavigate();


    useEffect(() => {

        const inviaOrdine = async () => {

            try {

                var response = await axiosIstance.post(routes.order.postCreate, cartState)

                const { orderId } = response.data;



                navigate(`/account/i-miei-ordini/${orderId}`, {
                    state: {
                        message: {
                            type: MessageType.SUCCESS,
                            text: "Il tuo ordine è stato creato con successo"
                        }
                    }
                })



            } catch {


                navigate("/account", {
                    state: {
                        message: {
                            type: MessageType.ERROR,
                            text: "Si è verificato un errore durante la creazione dell'ordine"
                        }
                    }
                })
            } finally {

                setTimeout(() => {
                    storeDispatch(resetCart())
                }, 500)
            }
        }

        inviaOrdine()
    })


    return <>
        <BaseLayout title="Creazione ordine">
            <Topbar>
                <TopbarLeft>
                    <HomeButton></HomeButton>
                </TopbarLeft>
                <TopbarRight>
                    <CartButton></CartButton>
                    <AccountManage></AccountManage>
                </TopbarRight>
            </Topbar>
            <Header></Header>
            <HeaderMenu>
                <CategoryPills></CategoryPills>
            </HeaderMenu>
            <Messages></Messages>
            <div className="p-8 flex flex-grow items-center justify-center">
                <div className="flex flex-col space-y-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <p>Stiamo creando il tuo ordine ...</p>
                </div>
            </div>
        </BaseLayout>
    </>
}
