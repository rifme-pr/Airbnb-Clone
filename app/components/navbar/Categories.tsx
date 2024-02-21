"use client"

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import {  usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories =[
    {
        label: "Beach",
        Icon: TbBeach,
        description: "This property is close to the beach"
    },
    {
        label: "Windmills",
        Icon: GiWindmill,
        description: "This property has windmills"
    },
    {
        label: "Modern",
        Icon: MdOutlineVilla,
        description: "This property is mordern"
    },
    {
        label: "Country Side",
        Icon: TbMountain,
        description: "This property is in countryside"
    },
    {
        label: "Pools",
        Icon: TbPool,
        description: "This property has a pool"
    },
    {
        label: "Lake",
        Icon: GiBoatFishing,
        description: "This property is close to a lake"
    },
    {
        label: "Sking",
        Icon: FaSkiing,
        description: "This property has a skiing activities"
    },
    {
        label: "Castles",
        Icon: GiCastle,
        description: "This property in a castle"
    },
    {
        label: "Camping",
        Icon: GiForestCamp,
        description: "This property has camping activities"
    },
    {
        label: "Arctic",
        Icon: BsSnow,
        description: "This property has camping activities"
    },
    {
        label: "Cave",
        Icon: GiCaveEntrance,
        description: "This property in a cave"
    },
    {
        label: "Dessert",
        Icon: GiCactus,
        description: "This property is in dessert"
    },
    {
        label: "Bars",
        Icon: GiBarn,
        description: "This property is in barn"
    },
    {
        label: "Lux",
        Icon: IoDiamond,
        description: "This property is luxurious"
    },
]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                     key={item.label}
                     label={item.label}
                     selected={category === item.label}
                     Icon={item.Icon}
                     ></CategoryBox>
))}
            </div>
        </Container>
    );
};

export default Categories;