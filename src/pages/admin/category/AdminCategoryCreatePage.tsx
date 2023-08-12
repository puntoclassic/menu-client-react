import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import categoryService from "@src/services/categoryService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import Messages from "@src/components/Messages";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { is } from "immer/dist/internal";
import { CategoryFields } from "@src/types";
import { categoryValidator } from "@src/validators";


export default function AdminCategoryCreatePage() {

    const navigate = useNavigate();


    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<CategoryFields>({
        resolver: yupResolver(categoryValidator)
    });

    const onSubmit = async (data: CategoryFields) => {
        setIsPending(true);
        if (await categoryService.createCategory(data)) {
            navigate("/amministrazione/categorie", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Categoria creata",
                    }
                }
            });
        } else {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Si è verificato un errore",
            }));
        }

        setIsPending(false);
    }

    return <>
        <BaseLayout title="Nuova categoria">

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
                    <li>Crea categoria</li>
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

                    <div className="w-1/3 flex flex-col space-y-2 items-start">
                        <button type="submit" className="btn-success ">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Crea
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
