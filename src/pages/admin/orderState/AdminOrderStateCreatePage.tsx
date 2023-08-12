import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import orderStateService from "@src/services/orderStateService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import Messages from "@src/components/Messages";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { OrderStateFields } from "@src/types";
import { orderStateValidator } from "@src/validators";

export default function AdminOrderStateCreatePage() {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<OrderStateFields>({
        resolver: yupResolver(orderStateValidator)
    });
    const values = watch();
    const onSubmit = async (data: OrderStateFields) => {
        setIsPending(true);
        if (await orderStateService.createOrderState(data)) {
            navigate("/amministrazione/stati-ordine", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Stato ordine creato",
                    }
                }
            });
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
                    <li>Crea stato</li>
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
                            Crea
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
