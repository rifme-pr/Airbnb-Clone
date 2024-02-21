"use client"

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import useCountries from "../hooks/useCountries";


import dynamic from "next/dynamic";
import ListingCategory from "./ListingCategory";


const Map = dynamic(() => import('../Map'),{
    ssr: false
});
interface  ListingInfoProps {
    user: SafeUser;
    decription: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({user,decription, guestCount, roomCount, bathroomCount, category, locationValue}) => {
   const {getByValue }= useCountries();

   const coordinates = getByValue(locationValue)?.latlng;
   
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted By {user.name}</div>

                </div>
                <div className="flex flex-row text-neutral-500 items-center gap-4 font-light">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>

            </div>
            <hr />
            {category && (
                <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
                />
            )}
            
            <div className="text-lg font-light text-neutral-500">
                {decription}

            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
};

export default ListingInfo;