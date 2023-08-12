import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function AdminPagination({ currentValue, onChangeHandler, itemsCount, perPage, url }: any) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        searchParams.set("page", currentValue);
        setSearchParams(searchParams, { replace: true });
    }, [currentValue, setSearchParams, searchParams])


    var pages = Math.ceil(itemsCount / perPage);

    const renderPage = (num: number) => {
        if (num == currentValue) {
            return <button key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined-active">{num}</button>
        } else {
            return <button key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined">{num}</button>
        }
    }

    const nextButton = () => {
        var num = currentValue + 1;

        if (num <= pages) {
            return <button key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined">Prossima</button>

        } else {
            return <button disabled key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined">Prossima</button>
        }

    }

    const previuousButton = () => {
        var num = currentValue - 1;

        if (num > 0) {
            return <button key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined" >Precedente</button>
        } else {
            return <button disabled key={num} onClick={(e) => { onChangeHandler(num); }} className="btn-secondary-outlined">Precedente</button>
        }

    }

    return <>
        <div className="flex flex-row space-x-2 h-10">
            {previuousButton()}
            {[...Array(pages)].map((num: number, index: number) => renderPage(index + 1))}
            {nextButton()}
        </div>
    </>
}
