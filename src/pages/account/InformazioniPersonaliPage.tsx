import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { useForm } from "react-hook-form";
import { loadAccountState } from "@src/redux/thunks/account";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import accountService from "@src/services/accountService";
import { pushMessage } from "@src/redux/reducers/messages";
import { useState } from "react";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import HomeButton from "@src/components/HomeButton";
import { PersonalInfoFields } from "@src/types";
import { personalInfoValidator } from "@src/validators";


export default function LoginPage() {

    const accountState = useAppSelector((state) => state.account);

    const { user } = accountState;

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<PersonalInfoFields>({
        resolver: yupResolver(personalInfoValidator),
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname
        }
    });

    const [isPending, setIsPending] = useState(false);


    const onSubmit = async (data: PersonalInfoFields) => {

        setIsPending(true)

        if (await accountService.updatePersonalInfo(data)) {
            storeDispatch(loadAccountState());

            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Informazioni aggiornate con successo",
            }));
        } else {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Si è verificato un errore nel gestire la richiesta",
            }));
        }

        setIsPending(false);
    }


    return <>
        <BaseLayout title="Informazioni personali">
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
                    <li>Informazioni personali</li>
                </ol>
            </HeaderMenu>

            <div className="px-8 py-4">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Informazioni personali</p>
                </div>
                <form className="w-full md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            {...register("firstname")}
                            className={errors.firstname ? "text-input-invalid" : "text-input"}
                        />
                        <div className="invalid-feedback">{errors.firstname?.message}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Cognome</label>
                        <input
                            type="text"
                            {...register("lastname")}
                            className={errors.lastname ? "text-input-invalid" : "text-input"}
                        />
                        <div className="invalid-feedback">{errors.lastname?.message}</div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button disabled={!isValid} type="submit" className="btn-primary">
                            <ButtonCircularProgress isPending={isPending} />
                            <span>Aggiorna informazioni</span>
                        </button>
                    </div>
                </form>

            </div>
        </BaseLayout>
    </>
}
