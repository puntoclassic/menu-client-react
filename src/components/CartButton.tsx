import { Link } from "react-router-dom"
import { useAppSelector } from "@src/redux/hooks"
import { CartState } from "@src/types"

export default function CartButton() {
    const cartState: CartState = useAppSelector((state) => state.cart)

    return <>
        <Link className="text-white hover:bg-slate-800 p-2 flex flex-row space-x-1 justify-center items-center" to="/carrello"
        >
            {Object.keys(cartState.items).length > 0 ? <span className="text-white bg-red-600 text-sm rounded-full h-6 w-6 flex justify-center items-center ">
                {Object.keys(cartState.items).length}
            </span> : null}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span>Carrello</span></Link>
    </>
}
