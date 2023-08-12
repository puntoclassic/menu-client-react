import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { pushTipologiaConsegna } from "@src/redux/reducers/cart";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import { tipologiaConsegnaValidator } from "@src/validators";
import { TipologiaConsegna, TipologiaConsegnaFields } from "@src/types";


export default function TipologiaConsegnaPage() {




    const { tipologiaConsegna } = useAppSelector((state) => state.cart);
    const { register, handleSubmit, formState: { errors } } = useForm<TipologiaConsegnaFields>({
        resolver: yupResolver(tipologiaConsegnaValidator),
        defaultValues: {
            tipologiaConsegna: tipologiaConsegna
        }
    });

    const navigate = useNavigate();

    const onSubmit = (data: TipologiaConsegnaFields) => {
        storeDispatch(pushTipologiaConsegna(data.tipologiaConsegna));
        if (data.tipologiaConsegna === TipologiaConsegna.ASPORTO) {
            navigate("/checkout/riepilogo-ordine");
        } else {
            navigate("/checkout/informazioni-consegna");
        }
    }

    return <>
        <BaseLayout title="Tipologia di consegna">

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
                <ol className="flex flex-row space-x-2 items-center pl-8 text-white h-16">
                    <BreadcrumbLink href="/carrello">
                        Carrello
                    </BreadcrumbLink>
                    <li>::</li>
                    <li>1. Tipologia consegna</li>
                </ol>
            </HeaderMenu>

            <div className="p-8">
                <div className="flex flex-col flex-grow space-y-4">
                    <div className="w-full md:w-1/2">
                        <form className="w-full m-0 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="font-semibold text-lg  border-b-slate-300 border-b-2 pb-2">1. Consegna ordine</h5>
                            <p>Scegli il modo in cui vuoi ricevere il tuo ordine</p>
                            <select {...register("tipologiaConsegna")}
                                className={errors.tipologiaConsegna ? "text-input-invalid" : "text-input"}>
                                <option value="ASPORTO">Asporto</option>
                                <option value="DOMICILIO">A domicilio</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors.tipologiaConsegna?.message}
                            </div>
                            <div className="w-full">
                                <button type="submit" className="btn-secondary-outlined w-20 h-10">Vai</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">2. Indirizzo e orario</h5>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">3. Riepilogo</h5>
                    </div>
                </div>
            </div>
        </BaseLayout>
    </>
}
