import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useEffect, useState } from "react";
import AdminCategoryRow from "@src/pages/admin/category/components/AdminCategoryRow";
import AdminPagination from "@src/pages/admin/components/AdminPagination";
import AdminPerPage from "@src/pages/admin/components/AdminPerPage";
import categoryService from "@src/services/categoryService";
import HeaderMenu from "@src/components/HeaderMenu";
import BreadcrumbLink from "@src/components/BreadcrumbLink";
import LoadingContent from "@src/components/LoadingContent";
import AdminOrderToggler from "@src/pages/admin/components/AdminOrderToggler";
import { SearchFields } from "@src/types";

export default function AdminCategoryListPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit, } = useForm<SearchFields>({
        defaultValues: {
            search: searchParams.get("search") ?? ""
        }
    });

    const [perPage, setPerPage] = useState(parseInt(searchParams.get("perPage") ?? "5"));
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") ?? "id");
    const [ascending, setAscending] = useState((searchParams.get("ascending") ?? "true") === "true");
    const [searchKey, setSearchKey] = useState(searchParams.get("search") ?? "");
    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [count, setCount] = useState(0);

    const onSubmit = async (data: SearchFields) => {
        setSearchKey(data.search);
    }

    useEffect(() => {
        searchParams.delete("search");

        if (searchKey !== "") {
            searchParams.set("search", searchKey);
        }
        setSearchParams(searchParams, { replace: true });

    }, [searchKey, searchParams, setSearchParams])


    useEffect(() => {
        setIsPending(true);
        const fetchData = async () => {

            var response = await categoryService.adminFetchCategories({
                ascending: ascending,
                orderBy: orderBy,
                page: page,
                perPage: perPage,
                searchKey: searchKey,
                paginated: true
            });

            if (response) {
                const { items, count } = response;
                setCategories(items);
                setCount(count);
            }

            setIsPending(false);

        }
        fetchData();
    }, [searchKey, ascending, orderBy, page, perPage])

    const toggleOrder = (by: string) => {
        if (by === orderBy) {
            setAscending(!ascending)
        } else {
            setOrderBy(by);
            setAscending(true);
        }
    }

    const content = () => {

        if (!isPending) {
            return <>
                <table className="w-full flex flex-col">
                    <thead>
                        <tr className="h-10 flex flex-row items-center">
                            <th className="w-1/12 lg:w-1/12 text-center">
                                <AdminOrderToggler
                                    className="flex w-full flex-row space-x-1 justify-center"
                                    ascending={ascending}
                                    isCurrent={orderBy === "id"}
                                    label="Id" onClick={() => {
                                        toggleOrder("id")
                                    }}></AdminOrderToggler>
                            </th>
                            <th className="w-5/12 lg:w-8/12 text-left">
                                <AdminOrderToggler
                                    className="flex w-full flex-row space-x-1 justify-start"
                                    ascending={ascending}
                                    isCurrent={orderBy === "name"}
                                    label="Nome" onClick={() => {
                                        toggleOrder("name")
                                    }}></AdminOrderToggler>
                            </th>
                            <th className="w-6/12 lg:w-3/12 text-center">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>

                        {categories?.map((row: any) => <AdminCategoryRow item={row} key={row.id}></AdminCategoryRow>)}

                    </tbody>
                </table>

            </>
        } else {
            return <>
                <LoadingContent></LoadingContent>
            </>
        }
    }

    return <>
        <BaseLayout title="Categorie">

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
                    <li>Amministrazione categorie</li>
                </ol>
            </HeaderMenu>


            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Categorie</p>
                </div>
                <div className="flex w-full bg-gray-100 p-2">
                    <div className="w-1/2">
                        <div className="flex">
                            <Link to="/amministrazione/categorie/crea" className="btn-primary">Crea</Link>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <form className="m-0 flex space-x-2" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("search")} type="text" className="text-input bg-white" name="search" placeholder="Cerca una categoria"
                            />
                            <button type="submit" className="btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex w-full flex-grow">
                    {content()}
                </div>
                <div className="w-full flex px-4 py-4">
                    <AdminPerPage currentValue={perPage} onChangeHandler={(value: number) => { setPerPage(value); setPage(1) }}></AdminPerPage>
                </div>
                <div className="w-full flex px-4 py-4 bg-gray-100">
                    <AdminPagination currentValue={page} onChangeHandler={(value: number) => setPage(value)} itemsCount={count} perPage={perPage}></AdminPagination>
                </div>
            </div>
        </BaseLayout>
    </>
}
