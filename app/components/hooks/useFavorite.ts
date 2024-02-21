import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";




interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const logInModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [listingId, currentUser]);

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return logInModal.onOpen();
        }
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');

        }

        catch (error) {
            toast.error("Something Wrong");
            console.log(error);
            
        }

    }
    return {hasFavorited, toggleFavorite}
}

export default useFavorite;