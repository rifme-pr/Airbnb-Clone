import { empty } from "@prisma/client/runtime/library";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservation from "../actions/getReservation";
import ReservationClient from "./ReservationClient";


const ReservationPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <EmptyState title="Unauthorized" subtitle="Please Login" />
        );
    }

    const reservation = await getReservation({authorId: currentUser.id})
    if(reservation.length === 0){
        return(
            <EmptyState title="No reservation found" subtitle="Looks like you have no reservatio on your properties" />
        );
    }
    return (
        <div>
            <ReservationClient reservation={reservation} currentUser={currentUser} />
        </div>
    );
};

export default ReservationPage;