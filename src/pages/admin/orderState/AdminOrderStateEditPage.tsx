import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import orderStateService from "@src/services/orderStateService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { OrderStateFields } from "@src/types";
import { orderStateValidator } from "@src/validators";

export default function AdminOrderStateEditPage() {
    const { id } = useParams();
    const [isPending, setIsPending] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<OrderStateFields>({
        resolver: yupResolver(orderStateValidator),
        mode: "onChange"
    });
    var values = watch();
    const fetchData = useCallback(async () => {
        var response = await orderStateService.getOrderState(parseInt(id!));
        const { name, cssBadgeClass } = response.data;
        if (name) {

            setValue("name", name);
            setValue("id", parseInt(id as string))
            setValue("cssBadgeClass", cssBadgeClass);

        }
    }, [id, setValue]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData, isPending])

    const onSubmit = async (data: OrderStateFields) => {
        setIsPending(true);
        if (await orderStateService.updateOrderState(data)) {
            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Stato ordine aggiornato",
            }));
        }
        setIsPending(false);
    }

    return <>
        <BaseLayout title="Crea stato">
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
                        <BreadcrumbLink href="/amministrazione/stati-ordine">
                            Stati ordine
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Modifica stato</li>
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
                        <label className="form-label">CSS Badge</label>
                        <select
                            {...register("cssBadgeClass")}
                            className={errors.cssBadgeClass ? "text-input-invalid" : "text-input"}>
                            <option value="badge-primary">Primary</option>
                            <option value="badge-secondary">Secondary</option>
                            <option value="badge-info">Info</option>
                            <option value="badge-success">Success</option>
                            <option value="badge-danger">Danger</option>
                        </select>

                        <div className="invalid-feedback">
                            {errors.cssBadgeClass?.message}
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Preview</label>
                        <p className={values?.cssBadgeClass}>
                            Badge
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2 items-start">
                        <button type="submit" className="btn-success">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>

}
