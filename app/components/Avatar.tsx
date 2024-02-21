"use client"
import Image from "next/image";

const Avatar = () => {
    return (
        <div>
            <Image 
            alt="Avatar" 
            width={30} 
            height={30}
            src={"/images/placeholder.jpg"}
            ></Image>
        </div>
    );
};

export default Avatar;