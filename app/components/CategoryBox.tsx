"use client "

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps{
    Icon: IconType;
    label: string;
    selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    Icon, label, selected
}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = () => {
        let currentQuerry = {};

        if(params){
            currentQuerry = queryString.parse(params.toString());

        }
        const updateQuerry: any = {
            ...currentQuerry,
            category: label,
        }

        if(params?.get('category') === label){
            delete updateQuerry.category;
        }

        const url = queryString.stringifyUrl({
            url: "/",
            query: updateQuerry,
        
        }, {skipNull: true})

        router.push(url);
    }

    return (
        <div onClick={handleClick} 
        className={`flex flex-col items-center 
        justify-center gap-2 p-3 border-b-2
         hover:text-neutral-800 transition
          cursor-pointer
          ${selected ? "border-b-neutral-500" : "border-transparent"}
          ${selected ? "border-neutral-800" : "text-neutral-500"}
          `}>
            <Icon size={26}></Icon>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;