import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { storeDispatch } from "@src/redux/hooks";
import configService from "@src/services/configService";
import { pushMessage } from "@src/redux/reducers/messages";
import categoryService from "@src/services/categoryService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { CategoryFields } from "@src/types";
import { categoryValidator } from "@src/validators";
import { backendUrl } from "@src/services/routes";


export default function AdminCategoryEditPage() {

    const { id } = useParams();

    const [category, setCategory]: any = useState();


    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CategoryFields>({
        resolver: yupResolver(categoryValidator)
    });

    const fetchData = useCallback(async () => {
        var response = await categoryService.getCategory(parseInt(id!));
        const { name, imageUrl } = response.data;
        if (name) {

            setCategory({
                "name": name,
                "imageUrl": imageUrl
            })

            setValue("name", name);
            setValue("id", parseInt(id as string))
        }
    }, [id, setValue]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData, isPending])




    const onSubmit = async (data: CategoryFields) => {

        setIsPending(true);

        if (await categoryService.updateCategory(data)) {
            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Categoria aggiornata",
            }));
        } else {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Si è verificato un errore",
            }));
        }
        setIsPending(false);

    }

    const currentImage = () => {
        console.log(category)
        if (category && category.imageUrl) {
            return <>
                <div className="w-1/3 flex flex-col space-y-2">
                    <label className="form-label">Immagine attuale</label>
                    <img src={`${backendUrl}${category.imageUrl}`} alt={"Immagine categoria " + category.name} height="100" />
                </div>
            </>
        }
        return null;
    }


    return <>
        <BaseLayout title="Modifica categoria">
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
                        <BreadcrumbLink href="/amministrazione/categorie">
                            Categorie
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Modifica categoria</li>
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
                        <label className="form-label">Immagine</label>
                        <input type="file"
                            {...register("image")}
                        />
                        <div className="invalid-feedback">
                            {errors.image?.message}
                        </div>
                    </div>
                    {currentImage()}
                    <div className="w-1/3 flex flex-col space-y-2 items-start">
                        <button type="submit" className="btn-success ">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Aggiorna
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
