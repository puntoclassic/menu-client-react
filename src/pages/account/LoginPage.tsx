import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { useState } from "react";
import { storeDispatch } from "@src/redux/hooks";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import HomeButton from "@src/components/HomeButton";
import accountService from "@src/services/accountService";
import { pushMessage } from "@src/redux/reducers/messages";
import { updateUser } from "@src/redux/reducers/account";
import ButtonCircularProgress from "@src/components/ButtonCircularProgress";
import { LoginFields, MessageType } from "@src/types";
import { loginValidator } from "@src/validators";

export default function LoginPage() {

    const [searchParams] = useSearchParams();
    const backUrl = searchParams.get("backUrl");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFields>({
        resolver: yupResolver(loginValidator)
    });

    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (data: LoginFields) => {

        setIsPending(true);

        var loginResponse = await accountService.login(data.email, data.password);

        if (loginResponse.status === "Ok") {
            const { user } = loginResponse;

            storeDispatch(updateUser({
                user: user,
                logged: true
            }));

            navigate(backUrl || "/account", {
                state: {
                    message: {
                        type: MessageType.SUCCESS,
                        text: "Bentornato " + user.firstname + " " + user.lastname,
                    }
                }
            })

        }

        if (loginResponse.status === "LoginFailed") {
            storeDispatch(pushMessage({
                type: MessageType.ERROR,
                text: "Impossibile accedere, credenziali errate.",
            }));
        }

        if (loginResponse.status === "NotVerified") {
            storeDispatch(pushMessage({
                type: MessageType.INFO,
                text:
                    "Devi attivare il tuo account per poter accedere ad alcune sezioni del sito.",
            }));
        }

        setIsPending(false);


    }

    return <>

        <BaseLayout title='Accedi'>
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
                    <li>Accedi</li>
                </ol>
            </HeaderMenu>
            <div className="px-8 pt-8">
                <Messages></Messages>
            </div>
            <div className='flex flex-grow flex-col justify-center items-center'>

                <form className="w-full p-16 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    {backUrl ? <input type="hidden" {...register("backUrl")} name="backUrl" value={backUrl} /> : null}
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
                    <div className="flex flex-col space-y-0.5">
                        <Link to="/account/reset-password" className="hover:text-red-900">
                            Ho dimenticato la password
                        </Link>
                        <Link to="/account/verifica-account" className="hover:text-red-900">
                            Il mio account non è attivo
                        </Link>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button disabled={!isValid} type="submit" className="btn-primary">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            Accedi
                        </button>
                        <Link to="/account/signin" className="btn-secondary-outlined">
                            Crea account
                        </Link>
                    </div>
                </form>
            </div>
        </BaseLayout>
    </>
}


