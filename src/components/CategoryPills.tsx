import { useSelector } from "react-redux"
import CategoryPill from "@src/components/CategoryPill";


export default function CategoryPills() {
    const appState = useSelector((state: any) => state.app);
    const { categories } = appState;

    return <>
        <ul className="w-full md:flex flew-row md:space-x-2 items-center justify-center">
            {categories?.map((cat: any) => <CategoryPill item={cat} key={cat.id}></CategoryPill>)}
        </ul>
    </>
}
