"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    const router = useRouter();
    return (
        <div className="cursor-pointer">
            <Image
            onClick={() => router.push('/')}
            alt="Logo"
            width={100}
            height={100}
            src={'/images/logo.png'}
            ></Image>
        </div>
    );
};

export default Logo;