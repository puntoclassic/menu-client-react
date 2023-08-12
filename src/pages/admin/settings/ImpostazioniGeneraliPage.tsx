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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import { fetchSettings } from "@src/redux/thunks/app";

import configService from "@src/services/configService";
import orderStateService from "@src/services/orderStateService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { OrderStateFields, SettingFields } from "@src/types";
import { settingValidator } from "@src/validators";

export default function ImpostazioniGeneraliPage() {

    const [isPending, setIsPending] = useState(false);
    const [orderStates, setOrderStates] = useState<OrderStateFields[]>([])
    const { register, handleSubmit, formState: { errors }, setValue, } = useForm<SettingFields>({
        resolver: yupResolver(settingValidator)
    });
    const fetchData = useCallback(async () => {
        var response = await configService.getSettings();
        const settings: SettingFields = response.data;

        if (settings) {
            setValue("siteName", settings.siteName);
            setValue("siteSubtitle", settings.siteSubtitle);
            setValue("shippingCosts", settings.shippingCosts);
            if (settings.orderCreatedStateId) {
                setValue("orderCreatedStateId", settings.orderCreatedStateId)
            }
            if (settings.orderPaidStateId) {
                setValue("orderPaidStateId", settings.orderPaidStateId)
            }
        }
    }, [setValue]);
    const fetchOrderStates = useCallback(async () => {
        var response = await orderStateService.getOrderStates();
        const { items } = response.data;
        if (items) {
            setOrderStates(items);
        }
    }, [setValue]);
    useEffect(() => {
        const loadData = async () => {
            await fetchOrderStates();
            await fetchData();
        }
        loadData();
    }, [fetchData, isPending, fetchOrderStates])
    const onSubmit = async (data: SettingFields) => {
        setIsPending(true);
        if (await configService.updateSettings(data)) {
            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Impostazioni aggiornate",
            }));
            storeDispatch(fetchSettings());
        }
        setIsPending(false);
    }

    return <>
        <BaseLayout title="Impostazioni generali">

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
                        <BreadcrumbLink href="/account">
                            Profilo
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Impostazioni negozio</li>
                </ol>
            </HeaderMenu>
            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full">
                    <p className="text-2xl antialiased font-bold">Impostazioni</p>
                </div>
                <form className="pt-4 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <h6 className="font-semibold uppercase">Informazioni del sito</h6>
                    <div className="w-full md:w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Nome del sito</label>
                        <input
                            type="text"
                            {...register("siteName")}
                            className={errors.siteName ? "text-input-invalid" : "text-input"}
                        />
                        <div className="invalid-feedback">{errors.siteName?.message}</div>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Motto del sito</label>
                        <input
                            type="text"
                            {...register("siteSubtitle")}
                            className={errors.siteSubtitle ? "text-input-invalid" : "text-input"}
                        />
                        <div className="invalid-feedback">{errors.siteSubtitle?.message}</div>
                    </div>
                    <h6 className="font-semibold uppercase">Impostazioni ordini</h6>
                    <div className="w-full md:w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Spese di consegna</label>
                        <input
                            type="text"
                            {...register("shippingCosts")}
                            className={errors.shippingCosts ? "text-input-invalid" : "text-input"}
                        />
                        <div className="invalid-feedback">{errors.shippingCosts?.message}</div>
                    </div>

                    <div className="w-full md:w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Stato quando l'ordine viene creato</label>
                        <select
                            {...register("orderCreatedStateId")}
                            className={errors.orderCreatedStateId ? "text-input-invalid" : "text-input"}
                        >
                            <option>-- Nessuna opzione --</option>
                            {orderStates.map((state: { id: number, name: string }) => (
                                <option value={state.id} key={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.orderCreatedStateId?.message}</div>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col space-y-2">
                        <label className="form-label">Stato quando l'ordine viene pagato</label>
                        <select
                            {...register("orderPaidStateId")}
                            className={errors.orderPaidStateId ? "input-select-invalid" : "input-select"}
                        >
                            <option>-- Nessuna opzione --</option>
                            {orderStates.map((state: { id: number, name: string }) => (
                                <option value={state.id} key={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.orderPaidStateId?.message}</div>
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2 items-start">
                        <button type="submit" className="btn-success">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Aggiorna
                        </button>
                    </div>
                </form>
            </div>


        </BaseLayout >
    </>
}
