import AccountManage from "@src/components/AccountManage";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HeaderMenu from "@src/components/HeaderMenu";
import HomeButton from "@src/components/HomeButton";
import LoadingContent from "@src/components/LoadingContent";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";


export default function OrderPaymentSuccessPage() {

    return <>
        <BaseLayout title="Pagamento completato">
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


                </ol>
            </HeaderMenu>

            <div className="flex items-center justify-center flex-grow">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center space-y-4 text-green-700">
                        <span className="text-3xl">Pagamento completato</span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 animate-pulse">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>

                    </div>

                </div>
            </div>
        </BaseLayout >
    </>
}
