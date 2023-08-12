import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { pushMessage } from "@src/redux/reducers/messages";
import { storeDispatch } from "@src/redux/hooks";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import Messages from "@src/components/Messages";
import accountService from "@src/services/accountService";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { SigninFields } from "@src/types";
import { signinValidator } from "@src/validators";


export default function SigninPage() {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SigninFields>({
        resolver: yupResolver(signinValidator),
        mode: "onSubmit",
        reValidateMode: "onSubmit",

    });


    const navigate = useNavigate();

    const onSubmit = async (data: SigninFields) => {
        setIsPending(true);

        var signinResponse = await accountService.signin(data);

        if (signinResponse) {
            navigate("/account/login", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Il tuo account è stato creato, segui le istruzioni via email per attivarlo"
                    }
                }
            });

        } else {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Impossibile creare il tuo account"
            }))
        }

        setIsPending(false);


    }
    const [isPending, setIsPending] = useState(false);




    return <>
        <BaseLayout title='Crea account'>
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
                    <li>Crea account</li>
                </ol>
            </HeaderMenu>
            <div className="px-8 pt-8">
                <Messages></Messages>
            </div>
            <div className='flex flex-grow justify-center items-start md:items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-8 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" method='post' action="/account/postSignin">
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Nome</label>
                        <input type="text"
                            {...register("firstname")}
                            className={errors.firstname ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.firstname?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Cognome</label>
                        <input type="text"
                            {...register("lastname")}
                            className={errors.lastname ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.lastname?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Email</label>
                        <input type="text"
                            {...register("email")}
                            className={errors.email ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Password</label>
                        <input type="password"
                            {...register("password")}
                            className={errors.password ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Conferma password</label>
                        <input type="password"
                            {...register("confirmPassword")}
                            className={errors.confirmPassword ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button type="submit" className="btn-primary space-x-2">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            <span>Crea account</span>
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}
