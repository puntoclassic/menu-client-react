import AdminDeleteButton from "@src/pages/admin/components/AdminDeleteButton";
import AdminEditButton from "@src/pages/admin/components/AdminEditButton";


export default function AdminOrderStateRow({ item }: any) {
    return <>
        <tr className="h-10 w-full odd:bg-gray-100 flex-row flex flex-grow">
            <td className="w-1/12 text-center flex items-center justify-center">{item.id}</td>
            <td className="w-6/12 md:w-5/12 text-left flex items-center">{item.name}</td>
            <td className="w-2/12 text-center hidden lg:flex items-center justify-center"><span className={item.cssBadgeClass}>Esempio di testo</span></td>
            <td className="w-5/12 md:w-4/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                <AdminEditButton link={"/amministrazione/stati-ordine/modifica/" + item.id}></AdminEditButton>
                <AdminDeleteButton link={"/amministrazione/stati-ordine/elimina/" + item.id}></AdminDeleteButton>
            </td>
        </tr >
    </>
}
