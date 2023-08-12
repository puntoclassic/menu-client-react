import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import Messages from "@src/components/Messages";
import foodService from "@src/services/foodService";
import categoryService from "@src/services/categoryService";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import { FoodFields } from "@src/types";
import { foodValidator } from "@src/validators";


export default function AdminCategoryFoodPage() {

    const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FoodFields>({
        resolver: yupResolver(foodValidator)
    });

    const onSubmit = async (data: FoodFields) => {

        setIsPending(true);

        if (await foodService.updateFood(data)) {
            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Cibo aggiornato",
            }));
        }

        setIsPending(false);
    }

    const fetchData = useCallback(async () => {
        var response = await foodService.getFood(parseInt(id!));
        const { name, ingredients, price, categoryId } = response.data;
        if (name) {
            setValue("name", name);
            setValue("ingredients", ingredients);
            setValue("price", price)
            setValue("categoryId", categoryId)
            setValue("id", parseInt(id as string))
        }
    }, [id, setValue]);

    useEffect(() => {

        const fetchCategories = async () => {
            var response = await categoryService.fetchCategoriesForSelect();

            const { items, count } = response.data;
            setCategories(items);
            if (count > 0) {
                setValue("categoryId", items.id);
            }
        }
        fetchCategories().then(() => {
            fetchData();
        });


    }, [setValue, fetchData]);

    return <>

        <BaseLayout title="Modifica cibo">

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
                        <BreadcrumbLink href="/amministrazione/cibi">
                            Cibi
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Modifica cibo</li>
                </ol>
            </HeaderMenu>

            <div className="flex flex-col p-8 flex-grow">
                <Messages></Messages>
                <form className="flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>

                    <div className="w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Nome</label>
                        <input type="text"
                            {...register("name")}
                            className={errors.name ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Ingredienti</label>
                        <textarea className="text-input" {...register("ingredients")}></textarea>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Prezzo</label>
                        <input type="text"
                            {...register("price")}
                            className={errors.price ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.price?.message}
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Categoria</label>
                        <select {...register("categoryId")}
                            className={errors.categoryId ? "text-input-invalid" : "text-input"}>
                            {categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            {errors.categoryId?.message}
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col space-y-2 items-start">
                        <button type="submit" className="btn-success">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Modifica
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
