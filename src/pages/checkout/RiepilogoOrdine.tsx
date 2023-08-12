import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import CartRow from "@src/pages/cart/components/CartRow";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { pushNote } from "@src/redux/reducers/cart";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import { AppState, CartRow as CartRowType, CartState, RiepilogoOrdineFields, TipologiaConsegna } from "@src/types";

export default function RiepilogoOrdinePage() {
    const cartState: CartState = useAppSelector((state) => state.cart);
    const appState: AppState = useAppSelector((state) => state.app);
    const { items, total, tipologiaConsegna, indirizzo, orario, note } = cartState;
    const { settings } = appState;
    const navigate = useNavigate();

    const shipping_row: CartRowType = {
        item: {
            id: 0,
            name: "Spese di consegna",
            price: settings.shippingCosts
        },
        quantity: 1
    }

    const { register, handleSubmit, formState: { errors } } = useForm<RiepilogoOrdineFields>({
        defaultValues: {
            note: note
        }
    });
    const informazioniConsegna = () => {
        if (tipologiaConsegna !== TipologiaConsegna.ASPORTO) {
            return <>

                <h6 className="uppercase font-semibold">Indirizzo e orario</h6>

                <table className="w-full">
                    <tr>
                        <td className="font-medium">Indirizzo</td>
                        <td>{orario}</td>
                    </tr>
                    <tr>
                        <td className="font-medium">Orario</td>
                        <td>{indirizzo}</td>
                    </tr>
                </table>

            </>
        } else {
            return <></>
        }
    }

    const onSubmit = (data: RiepilogoOrdineFields) => {
        storeDispatch(pushNote({
            note: data.note
        }));
        navigate("/checkout/creazione-ordine");
    }

    const shipping_costs_row = () => {
        if (tipologiaConsegna !== TipologiaConsegna.ASPORTO) {
            return <CartRow key={-1} row={shipping_row}></CartRow>
        }
        return null;
    }

    const subTotal = () => {
        return tipologiaConsegna !== TipologiaConsegna.ASPORTO ? total + settings.shippingCosts : total;
    }

    const content = () => {
        return <>
            <div className="w-full md:w-1/2">
                <div className="flex flex-col space-y-4 pt-4">
                    <div className="w-full md:w-1/2">
                        <h6 className="uppercase font-semibold">Informazioni di consegna</h6>
                        {tipologiaConsegna === TipologiaConsegna.ASPORTO ? <p>Hai scelto di ritirare il tuo ordine (asporto)</p> : <p>Hai scelto la consegna a domicilio</p>}
                    </div>
                    <div className="w-full md:w-1/2">
                        {informazioniConsegna()}
                    </div>
                    <div className="w-full ">
                        <h6 className="uppercase font-semibold">Cosa c'è nel tuo ordine</h6>
                        <div className="p-4 bg-slate-100">
                            <table className="flex flex-col">
                                <thead>
                                    <tr className="flex border-b">
                                        <th className="w-4/6 text-left">Cibo</th>
                                        <th className="w-1/6 text-center">Quantità</th>
                                        <th className="w-1/6 text-center">Prezzo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(items).map((row: any) => <CartRow actionsVisible={false} row={row} key={row.item.id}></CartRow>)}
                                    {shipping_costs_row()}
                                </tbody>
                                <tfoot>
                                    <tr className="flex border-b py-2">
                                        <td className="w-4/6 text-left"></td>
                                        <td className="w-1/6 text-center font-bold">Totale</td>
                                        <td className="w-1/6 text-center">{subTotal().toFixed(2)} €</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form className="flex flex-col m-0" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col py-2">
                                <label className="form-label">Note</label>
                                <textarea {...register("note")}
                                    className="text-input"></textarea>
                            </div>
                            <div className="flex flex-col py-2 items-start">
                                <button type="submit" className="btn-success">Invia ordine</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div >



        </>
    }



    const getBreadcrumb = () => {

        if (tipologiaConsegna === TipologiaConsegna.DOMICILIO) {
            return <>
                <BreadcrumbLink href="/carrello">
                    Carrello
                </BreadcrumbLink>
                <li>::</li>
                <BreadcrumbLink href="/checkout/tipologia-consegna">
                    1
                </BreadcrumbLink>
                <li>::</li>
                <BreadcrumbLink href="/checkout/informazioni-consegna">
                    2
                </BreadcrumbLink>
                <li>::</li>
                <li>3. Riepilogo</li>
            </>
        }

        return <>
            <BreadcrumbLink href="/carrello">
                Carrello
            </BreadcrumbLink>
            <li>::</li>
            <BreadcrumbLink href="/checkout/tipologia-consegna">
                1
            </BreadcrumbLink>
            <li>::</li>
            <li>2. Riepilogo</li>
        </>
    }

    const sectionLinks = () => {

        if (tipologiaConsegna === TipologiaConsegna.DOMICILIO) {
            return <>
                <div className="w-full md:w-1/2">
                    <Link to="/checkout/tipologia-consegna">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">1. Consegna ordine</h5>
                    </Link>
                </div>
                <div className="w-full md:w-1/2">
                    <Link to="/checkout/informazioni-consegna">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">2. Informazioni consegna</h5>
                    </Link>
                </div>
                <div className="w-full md:w-1/2">
                    <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">3. Riepilogo</h5>
                </div>
            </>
        }

        return <>
            <div className="w-full md:w-1/2">
                <Link to="/checkout/tipologia-consegna">
                    <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">1. Consegna ordine</h5>
                </Link>
            </div>
            <div className="w-full md:w-1/2">
                <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">2. Riepilogo</h5>
            </div>

        </>
    }

    return <>
        <BaseLayout title="Carrello">

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
                    {getBreadcrumb()}
                </ol>
            </HeaderMenu>

            <div className="p-8">
                <div className="flex flex-col flex-grow space-y-4">
                    {sectionLinks()}
                    {content()}
                </div>
            </div>

        </BaseLayout>
    </>
}
