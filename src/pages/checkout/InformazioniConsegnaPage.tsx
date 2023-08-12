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
import { pushInformazioniConsegna } from "@src/redux/reducers/cart";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import HeaderMenu from "@src/components/HeaderMenu";
import { informazioniConsegnaValidator } from "@src/validators";
import { InformazioniConsegnaFields } from "@src/types";


export default function InformazioniConsegnaPage() {



    const appState = useAppSelector((state) => state.app);

    const { settings } = appState;

    const { orario, indirizzo } = useAppSelector((state) => state.cart);
    const { register, handleSubmit, formState: { errors } } = useForm<InformazioniConsegnaFields>({
        resolver: yupResolver(informazioniConsegnaValidator),
        defaultValues: {
            orario: orario,
            indirizzo: indirizzo
        }
    });

    const navigate = useNavigate();

    const onSubmit = (data: InformazioniConsegnaFields) => {

        storeDispatch(pushInformazioniConsegna({
            indirizzo: data.indirizzo,
            orario: data.orario,
            shippingCosts: settings.shippingCosts
        }));
        navigate("/checkout/riepilogo-ordine");
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
                    <BreadcrumbLink href="/checkout/tipologia-consegna">
                        1
                    </BreadcrumbLink>
                    <li>::</li>
                    <li>2. Informazioni consegna</li>
                </ol>
            </HeaderMenu>

            <div className="p-8">
                <div className="flex flex-col flex-grow space-y-4">
                    <div className="w-full md:w-1/2">
                        <Link to="/checkout/tipologia-consegna"><h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">1. Consegna ordine</h5></Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form className="flex flex-col m-0 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">2. Indirizzo e orario</h5>

                            <p>Inserisci le informazioni di consegna</p>
                            <div className="flex flex-col space-y-2">
                                <label className="form-label">Indirizzo</label>
                                <input type="text"
                                    {...register("indirizzo")}
                                    className={errors.indirizzo ? "text-input-invalid" : "text-input"} />
                                <div className="invalid-feedback">
                                    {errors.indirizzo?.message}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="form-label">Orario</label>
                                <input type="text"
                                    {...register("orario")}
                                    className={errors.orario ? "text-input-invalid" : "text-input"} />
                                < div className="invalid-feedback">
                                    {errors.orario?.message}
                                </div>
                            </div>
                            <div className="w-full">
                                <button type="submit" className="btn-secondary-outlined">Vai</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">3. Riepilogo</h5>
                    </div>
                </div>
            </div>

        </BaseLayout >
    </>
}
