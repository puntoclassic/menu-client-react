import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function AdminPerPage({ onChangeHandler, currentValue }: any) {

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        searchParams.set("perPage", currentValue);
    }, [currentValue, setSearchParams, searchParams])


    return <>
        <form className="m-0 flex space-x-2 items-center h-10">
            <label className="text-sm">Elementi per pagina</label>
            <select name="elementsPerPage" defaultValue={currentValue} className="input-select" onChange={(e) => { onChangeHandler(e.target.value); }}>
                {[2, 5, 10, 20, 50].map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
        </form>
    </>
}


