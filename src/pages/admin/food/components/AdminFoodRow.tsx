import AdminDeleteButton from "@src/pages/admin/components/AdminDeleteButton";
import AdminEditButton from "@src/pages/admin/components/AdminEditButton";
import { Link } from "react-router-dom";

export default function AdminFoodRow({ item }: any) {
    console.log(item);
    return <>
        <tr className="h-10 w-full odd:bg-gray-100 flex-row flex flex-grow">
            <td className="w-1/12 text-center flex items-center justify-center">{item.id}</td>
            <td className="w-6/12 md:w-5/12 text-left flex items-center text-clip">{item.name}</td>
            <td className="w-2/12 text-center hidden lg:flex items-center justify-center">{item.category.name}</td>
            <td className="w-2/12 text-center hidden lg:flex items-center justify-center">{parseFloat(item.price).toFixed(2)} €</td>

            <td
                className="w-4/12 md:w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                <AdminEditButton link={"/amministrazione/cibi/modifica/" + item.id}></AdminEditButton>
                <AdminDeleteButton link={"/amministrazione/cibi/elimina/" + item.id}></AdminDeleteButton>
            </td>
        </tr >
    </>
}
