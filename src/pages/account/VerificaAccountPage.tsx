import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch } from "@src/redux/hooks";
import { useState } from "react";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import { pushMessage, resetMessages } from "@src/redux/reducers/messages";
import accountService from "@src/services/accountService";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { VerifyAccountFields } from "@src/types";
import { verifyAccountValidator } from "@src/validators";


export default function VerificaAccountPage() {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<VerifyAccountFields>({
        resolver: yupResolver(verifyAccountValidator),
        defaultValues: {

        }
    });

    const [isPending, setIsPending] = useState(false);

    const onSubmit = (data: VerifyAccountFields) => {
        setIsPending(true);

        storeDispatch(resetMessages());

        accountService.resendActivationEmail(data).then(() => {

            storeDispatch(pushMessage({
                type: MessageType.SUCCESS,
                text: "Richiesta inviata, controlla la tua casella di posta",
            }));

            setIsPending(false);
        });
    }

    return <>
        <BaseLayout title='Verifica account'>
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
                    <li>
                        <BreadcrumbLink href="/account/login">
                            Profilo
                        </BreadcrumbLink>
                    </li>
                    <li>::</li>
                    <li>Verifica account</li>
                </ol>
            </HeaderMenu>

            <div className='p-8'>
                <Messages></Messages>
                <form className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Email</label>
                        <input type="text"
                            {...register("email")}
                            className={errors.email ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button disabled={!isValid} type="submit" className="btn-primary">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            <span>Verifica account</span>
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
