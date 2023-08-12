import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import Header from "@src/components/Header";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import accountService from "@src/services/accountService";
import { updateUser } from "@src/redux/reducers/account";
import { AccountState } from "@src/types";


export default function Logout() {

    const accountState: AccountState = useAppSelector((state) => state.account);
    const { user } = accountState;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            accountService.logout().then(() => {
                storeDispatch(updateUser({
                    user: null,
                    logged: false
                }));
            });
        } else {

            navigate("/account/login", {
                state: {
                    message: {
                        type: MessageType.INFO,
                        text: "Sei stato disconnesso con successo"
                    }
                }
            })
        }
    }, [user, navigate]);

    return <>
        <BaseLayout title="Logout">
            <Topbar>
                <TopbarLeft>
                    <SearchForm></SearchForm>
                </TopbarLeft>
                <TopbarRight>
                    <CartButton></CartButton>
                    <AccountManage></AccountManage>
                </TopbarRight>
            </Topbar>
            <Header></Header>
            <CategoryPills></CategoryPills>
        </BaseLayout>
    </>
}
