import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { storeDispatch } from "@src/redux/hooks";
import HomeButton from "@src/components/HomeButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import accountService from "@src/services/accountService";
import { pushMessage } from "@src/redux/reducers/messages";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { ResetPasswordTokenFields } from "@src/types";
import { resetPasswordTokenValidator } from "@src/validators";

export default function ResetPasswordTkenPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [navigate, token])

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ResetPasswordTokenFields>({
        resolver: yupResolver(resetPasswordTokenValidator),
        defaultValues: {
            token: token!,
            email: email ?? null
        },
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (data: ResetPasswordTokenFields) => {

        setIsPending(true);

        accountService.resetPasswordByToken(data).then(() => {
            navigate("/account/login", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Password cambiata con successo, ora puoi accedere con la tua nuova password",
                    }
                }
            })
        }).catch(() => {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Token non valido",
            }));
        }).finally(() => {
            setIsPending(false);
            reset();
        })

    }
    return <>
        <BaseLayout title='Recupera password'>
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
                    <li>Reset password</li>
                </ol>
            </HeaderMenu>
            <div className="p-8">
                <Messages></Messages>
                <form className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden"
                        {...register("token")}
                    />
                    <input type="hidden"
                        {...register("email")}
                    />
                    <div className="flex flex-col space-y-2">
                        <p className='font-semibold text-lg antialiased'>Inserisci la nuova password</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Password</label>
                        <input type="password"
                            {...register("password")}
                            className={"p-2 border border-gray-100" + (errors.password ? "form-control is-invalid" : "")} />
                        <div className="invalid-feedback">
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Conferma password</label>
                        <input type="password"
                            {...register("confirmPassword")}
                            className={"p-2 border border-gray-100" + (errors.confirmPassword ? "form-control is-invalid" : "")} />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button disabled={!isValid} type="submit" className="btn-primary">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            <span>Reset password</span>
                        </button>
                    </div>
                </form>
            </div>

        </BaseLayout>
    </>
}


