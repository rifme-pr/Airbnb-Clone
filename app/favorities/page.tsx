import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListing();

    if(listings.length ===0){
        return(
            <EmptyState title="No favorities found" 
            subtitle="Looks like you have no favorite listing"
            />
        )
    }

    return (
        <div>
            <FavoritesClient 
            listings={listings}
            currentUser={currentUser}
            />
        </div>
    );
};

export default ListingPage;