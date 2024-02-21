'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface ReservationClientProps{
     reservation: SafeReservation[],
     currentUser: SafeUser | null
}

const ReservationClient: React.FC<ReservationClientProps> = ({reservation,currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = (id: string) => {
            setDeletingId(id);
            axios.delete(`/api/reservation/${id}`)
            .then(() => {
                toast.success('Reservation Cancelled');
                router.refresh();
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setDeletingId('');
            })

            
    }
    return ( 
        <div>
            <Container>
                <Heading title="Reservation" subTitle="Booking on your properties" />
                <div className="grid gap-8 mt-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {reservation.map((res) => (
                            <ListingCard 
                            key={res.id}
                            data={res.listing}
                            reservation={res}
                            actionId={res.id}
                            onAction={onCancel}
                            disabled={deletingId === res.id}
                            actionLabel="Cancel Guest reservation"
                            currentUser={currentUser}
                            />
                        ))}
                </div>
            </Container>
        </div>
    );
};

export default ReservationClient;