"use client"

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginrModal from "../hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "../hooks/useRentModal";
import { useRouter } from "next/navigation";


interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const logInModal = useLoginrModal();
    const rentModal = useRentModal();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    // const handleOpen = useCallback(() => {
    //     setOpen((value) => !value);
    // }, [])
    const handleOpen = () => {
        setOpen(!open)
    }

    const onRent = () => {
        if(!currentUser){
            return logInModal.onOpen();
        };
         rentModal.onOpen(); 
    }

    return (
        <div className="relative ">
            <div className=" flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 
                rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb Your Home
                </div>
                <div
                    onClick={handleOpen}
                    className=" p-4 md:py-1 md:px-2 border-2 flex flex-row items-center
                 gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu></AiOutlineMenu>
                </div>
                <div className="hidden md:block">
                    <Avatar></Avatar>
                </div>
            </div>
            {open && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? <>

                            <MenuItem
                                onClick={() => router.push('/trips')}
                                label="My trips" />
                            <MenuItem
                                onClick={() => router.push('/favorities')}
                                label="My favorities" />
                            <MenuItem
                                onClick={() => router.push('/reservation')}
                                label="My resarvation" />
                            <MenuItem
                                onClick={() => router.push('/properties')}
                                label="My properties" />
                            <MenuItem
                                onClick={rentModal.onOpen}
                                label="Airbnb home" />
                            <MenuItem
                                onClick={() => signOut()}
                                label="Logout" />

                        </>
                            :

                            <>
                                <MenuItem
                                    onClick={logInModal.onOpen}
                                    label="Log In" />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign Up" />

                            </>}

                    </div>

                </div>
            )}
        </div>
    );
};

export default UserMenu;