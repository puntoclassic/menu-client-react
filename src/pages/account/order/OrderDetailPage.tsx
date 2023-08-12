import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import HomeButton from "@src/components/HomeButton";
import { useEffect, useState } from "react";
import axiosIstance from "@src/services/axiosIstance";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContent from "@src/components/LoadingContent";
import routes from "@src/services/routes";



export default function OrderDetailPage() {
    const [isPending, setIsPending] = useState(true);
    const { id } = useParams();

    const [item, setItem] = useState<any>({})



    useEffect(() => {

        const fetchOrderDetail = async () => {
            var response = await axiosIstance.get(routes.order.getOrderDetail, {
                params: {
                    orderId: id
                }
            })

            if (response.data) {
                setItem(response.data)
            }

            setIsPending(false)
        }

        fetchOrderDetail();



    }, [])

    const paga = async () => {
        setIsPending(true)
        var response = await axiosIstance.get(routes.order.getPaymentUrl, {
            params: {
                orderId: id
            }
        })

        const { paymentUrl } = response.data;


        if (paymentUrl) {
            window.location.replace(paymentUrl)
        }

        setIsPending(false)

    }

    const content = () => {
        if (item) {
            return <>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Dettagli ordine</p>
                </div>
                <div className="w-full flex flex-col">
                    <b>Stato dell'ordine</b>
                    <span>{item.orderState.name}</span>
                </div>
                {item.isPaid ? <></> : <>
                    <div className="w-full flex flex-col items-start">
                        <b>Azioni sull'ordine</b>
                        <button onClick={() => paga
                            ()} className="btn btn-sm btn-success">Paga ora</button>
                    </div>

                </>}
                <div className="w-full lg:w-1/3 flex flex-col">
                    <b>Cosa c'è nel tuo ordine</b>
                    <div className="p-4 bg-slate-100">
                        <table className="p-4 w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Cibo</th>
                                    <th className="text-center" scope="col">Quantità</th>
                                    <th className="text-center" scope="col">Prezzo</th>
                                </tr>
                            </thead>
                            <tbody>

                                {item.orderDetails.map((row: any) => {
                                    return <>
                                        <tr className="align-middle" key={row.id}>
                                            <td>{row.name}</td>
                                            <td className="text-center">{row.quantity}</td>
                                            <td className="text-center">{parseFloat(row.unitPrice).toFixed(2)} €</td>
                                        </tr>
                                    </>
                                })}
                                {item.isShippingRequired ? <>
                                    <tr className="align-middle">
                                        <td>Spese di consegna</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">{parseFloat(item.shippingCosts).toFixed(2)} €</td>
                                    </tr>

                                </> : null}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td className="text-center">
                                        <b>Totale</b>
                                    </td>
                                    <td className="text-center">{parseFloat(item.total).toFixed(2)} €</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </>
        } else {
            return <></>
        }

    }

    return <>
        <BaseLayout title="I miei ordini">
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
                <ol className="flex h-16 flex-row space-x-2 items-center pl-8 text-white">
                    <li>
                        <BreadcrumbLink href="/account">
                            Profilo
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>
                        <BreadcrumbLink href="/account/i-miei-ordini">
                            I miei ordini
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Dettaglio ordine</li>
                </ol>
            </HeaderMenu>

            <div className="pl-8 pr-8 flex flex-grow flex-col py-4 space-y-4">
                <Messages></Messages>

                {isPending ? <LoadingContent></LoadingContent> : content()}

            </div>
        </BaseLayout >
    </>
}
