import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import categoryService from "@src/services/categoryService";
import Messages from "@src/components/Messages";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";


export default function AdminCategoryDeletePage() {

    const { id } = useParams();

    const [category, setCategory]: any = useState({
        name: ""
    });

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const fetchData = useCallback(async () => {
        var response = await categoryService.getCategory(parseInt(id!));
        const { name } = response.data;
        if (name) {
            setCategory({
                "name": name,
            })
        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [fetchData])

    const doDelete = async () => {

        setIsPending(true);

        if (await categoryService.deleteCategory(parseInt(id!))) {
            navigate("/amministrazione/categorie", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Categoria eliminata",
                    }
                }
            });
        } else {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Si è verificato un errore"
            }))
        }
        setIsPending(false);

    }

    return <>
        <BaseLayout title="Elimina categoria">
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
                    <li>Elimina categoria</li>
                </ol>
            </HeaderMenu>

            <div className="flex flex-col p-8 flex-grow space-y-2 items-start ">
                <Messages></Messages>
                <p>Stai per eliminare la categoria <b>{category.name}</b>. Sei sicuro di volerlo fare?</p>
                <button type="submit" className="btn-success" onClick={() => doDelete()}>
                    <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                    Elimina
                </button>
            </div>
        </BaseLayout>
    </>
}
