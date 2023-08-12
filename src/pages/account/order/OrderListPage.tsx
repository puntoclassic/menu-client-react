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
import { useSearchParams } from "react-router-dom";
import MyOrderCard from "@src/pages/account/components/MyOrderCard";
import LoadingContent from "@src/components/LoadingContent";
import routes from "@src/services/routes";


export default function OrderListPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [orders, setOrders] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [count, setCount] = useState(0);



    useEffect(() => {



        const fetchMyOrders = async () => {
            var response = await axiosIstance.get(routes.order.getAllMyOrders, {
                params: {
                    ascending: false,
                    orderBy: "id",
                    page: page,
                    perPage: 20,
                    paginated: true
                }
            })

            const { items, count } = response.data;

            if (items) {
                setOrders(items)
                setCount(count)
            }

            setIsPending(false)
        }

        fetchMyOrders()

    }, [])

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
                    <li>I miei ordini</li>
                </ol>
            </HeaderMenu>

            <div className="px-8 py-4">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">I miei ordini</p>
                </div>
                <div className="w-full">
                    {isPending ? <LoadingContent></LoadingContent> : <>
                        {orders.length == 0 ? <p>Non ci sono ordini</p> : null}
                        {orders.map((item: any) => <MyOrderCard order={item}></MyOrderCard>)}
                    </>}
                </div>
            </div>
        </BaseLayout>
    </>
}
