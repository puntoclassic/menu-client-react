import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function SearchForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(searchParams.get("chiave") ?? "");

    const actionSearch = (e: any) => {
        e.preventDefault();
        navigate("/cerca?chiave=" + value);
    }


    return <>
        <form className="flex flex-row w-full md:w-96 space-x-2" onSubmit={((e) => actionSearch(e))}>
            <input type="text" name="chiave" className="p-2 w-3/4" onChange={(e) => setValue(e.target.value)} defaultValue={value} />
            <button type="submit" className="text-white w-1/4 p-2 border-white/25 border  hover:text-red-900 hover:bg-white" >Cerca</button>
        </form>
    </>;

}
