import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import accountService from "@src/services/accountService";
import LoadingContent from "@src/components/LoadingContent";


export default function VerificaAccountTokenPage() {

    const [searchParams] = useSearchParams();
    var token = searchParams.get("token");
    const email = searchParams.get("email");

    const navigate = useNavigate();

    const executeActivation = async (token: string, email: string | null) => {
        if (await accountService.activateAccountByToken(token, email)) {
            navigate("/account/login", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text:
                            "Il tuo account è stato attivato, ora puoi procedere con il login"
                    }
                }
            })
        } else {
            navigate("/account/login", {
                state: {
                    message: {
                        type: MessageType.ERROR,
                        text: "Impossibile verificare il tuo account, token non valido",
                    }
                }
            })
        }
    }


    useEffect(() => {


        if (token && email) {
            executeActivation(token, email);
        } else if (token) {
            executeActivation(token, null);
        } else {
            navigate("/");
        }
    }, [token, navigate])



    return <>
        <BaseLayout title="Verifica account">

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

            <LoadingContent></LoadingContent>
        </BaseLayout>
    </>
}
