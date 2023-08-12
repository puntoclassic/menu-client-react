import AdminDeleteButton from "@src/pages/admin/components/AdminDeleteButton";
import AdminEditButton from "@src/pages/admin/components/AdminEditButton";

export default function AdminCategoryRow({ item }: any) {
    return <>
        <tr className="h-10 w-full odd:bg-gray-100 flex-row flex flex-grow">
            <td className="w-1/12 lg:w-1/12 text-center flex items-center justify-center">{item.id}</td>
            <td className="w-5/12 lg:w-8/12 text-left flex items-center">{item.name}</td>
            <td
                className="w-6/12 lg:w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                <AdminEditButton link={"/amministrazione/categorie/modifica/" + item.id}></AdminEditButton>
                <AdminDeleteButton link={"/amministrazione/categorie/elimina/" + item.id}></AdminDeleteButton>
            </td>
        </tr>
    </>
}
