'use client'


import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface TripsClientProps {
    reservation: SafeReservation[];
    currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({reservation, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId]= useState('');

    const onCancel = (id: string) => {
            setDeletingId(id);
            axios.delete(`/api/reservation/${id}`)
            .then(() => {
                toast.success('Reservation Cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            } )
            .finally(() => {
                setDeletingId('');
            })
    }
    return (
        <div className="m-10">
            <Heading 
            title="Trips"
            subTitle="Where you've benn and where you're going"
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {reservation.map((res) => (
                    <ListingCard 
                    key={res.id}
                    data={res.listing}
                    reservation={res}
                    actionId={res.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Calcel Reservation"
                    currentUser={currentUser}

                    />
                ))}
            </div>
        </div>
    );
};

export default TripsClient;