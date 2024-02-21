import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";


const Trips =async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
       return (
        <EmptyState title="Unauthorized" subtitle="Please Log in" />
       )
    };
    const reservation = await getReservation({userId: currentUser.id});
    if(reservation.length === 0){
        return (
            <EmptyState 
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips"
            />
        )
    }
    
    return (
        <div>
            <TripsClient
            reservation={reservation}
            currentUser={currentUser}
            />
        </div>
    );
};

export default Trips;