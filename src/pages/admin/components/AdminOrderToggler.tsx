

export default function AdminOrderToggler(props: { isCurrent: boolean, ascending: boolean, label: string, onClick: any, className: string }) {

    if (props.isCurrent) {
        return <>
            <button onClick={props.onClick} className={"items-center " + props.className}>
                <span>{props.label}</span>
                <div className="bg-slate-900 rounded-full p-1 text-white">
                    {!props.ascending ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>}
                </div>

            </button>
        </>
    }

    return <>
        <button onClick={props.onClick} className={props.className}>
            <span>{props.label}</span>
        </button>
    </>
}
