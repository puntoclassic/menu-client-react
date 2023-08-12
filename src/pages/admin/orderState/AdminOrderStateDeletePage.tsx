import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orderStateService from "@src/services/orderStateService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import Messages from "@src/components/Messages";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import LoadingContent from "@src/components/LoadingContent";

export default function AdminOrderStateDeletePage() {
    const { id } = useParams();
    const [orderState, setOrderState]: any = useState(null);
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const fetchData = useCallback(async () => {
        var response = await orderStateService.getOrderState(parseInt(id!));
        const { name } = response.data;
        if (name) {
            setOrderState({
                "name": name,
            })
        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [fetchData])

    const doDelete = async () => {
        setIsPending(true);
        if (await orderStateService.deleteOrderState(parseInt(id!))) {
            navigate("/amministrazione/stati-ordine", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Stato ordine eliminato",
                    }
                }
            });
        }
        setIsPending(false);
    }

    if (orderState) {
        return <>
            <BaseLayout title="Elimina stato">
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
                            <BreadcrumbLink href="/amministrazione/stati-ordine">
                                Stati ordine
                            </BreadcrumbLink>
                        </li>
                        <li>::</li>
                        <li>Elimina stato</li>
                    </ol>
                </HeaderMenu>
                <div className="flex flex-col p-8 flex-grow space-y-2 items-start">
                    <Messages></Messages>
                    <p>Stai per eliminare lo stato <b>{orderState.name}</b>. Sei sicuro di volerlo fare?</p>
                    <button type="submit" className="btn-success " onClick={() => doDelete()}>
                        <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                        Elimina
                    </button>
                </div>
            </BaseLayout>
        </>
    } else {
        return <>
            <BaseLayout title="Elimina stato">
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
                            <BreadcrumbLink href="/amministrazione/stati-ordine">
                                Stati ordine
                            </BreadcrumbLink>
                        </li>
                        <li>::</li>
                        <li>Elimina stato</li>
                    </ol>
                </HeaderMenu>
                <Messages></Messages>
                <LoadingContent></LoadingContent>
            </BaseLayout>
        </>
    }

}
