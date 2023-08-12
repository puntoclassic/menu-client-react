import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import FoodItem from "@src/components/FoodItem";
import Header from "@src/components/Header";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import categoryService from "@src/services/categoryService";
import foodService from "@src/services/foodService";
import HeaderMenu from "@src/components/HeaderMenu";
import LoadingContent from "@src/components/LoadingContent";

export default function CategoriaPage() {

    const { slug } = useParams();

    const [category, setCategory]: any = useState(null);
    const [foods, setFoods]: [] | any = useState(null);

    const { name } = category ?? { name: "" };

    useEffect(() => {

        setCategory(null);
        setFoods(null);

        categoryService.getCategoryBySlug(slug!).then((response: any) => {
            setCategory(response.data);
        })

        foodService.getFoodsByCategorySlug(slug!).then((response: any) => {
            setFoods(response.data.items);
        });

    }, [slug])

    const foodsRender = () => {
        return foods.map((item: any) => <FoodItem item={item} key={item.id}></FoodItem>);
    }

    const content = () => {

        if (category && foods) {
            return <>
                <div className="flex flex-col p-8">
                    <div className="w-full pb-4">
                        <h4 className="font-bold text-lg">Categoria {category.name.toLowerCase()}</h4>
                    </div>
                    <div className="w-full space-y-4">
                        {foods.length === 0 ? <p>Non ci sono cibi per questa categoria</p> : null}
                        {foods ? foodsRender() : null}
                    </div>
                </div>
            </>
        } else {
            return <>
                <LoadingContent></LoadingContent>
            </>
        }
    }

    return <>

        <BaseLayout title={name || "Categoria"}>
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
            {content()}
        </BaseLayout>
    </>

}
