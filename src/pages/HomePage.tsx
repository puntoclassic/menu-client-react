import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import Header from "@src/components/Header";
import HeaderMenu from "@src/components/HeaderMenu";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";


export default function HomePage() {

    return <>
        <BaseLayout title="Homepage">
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
            <HeaderMenu>
                <CategoryPills></CategoryPills>
            </HeaderMenu>
        </BaseLayout>
    </>
}
