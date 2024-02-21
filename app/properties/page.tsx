
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";


import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <EmptyState title="Unauthorized" subtitle="Please Login" />
        );
    }

    const listings = await getListings({userId: currentUser.id})
    if(listings.length === 0){
        return(
            <EmptyState title="No Properties found" subtitle="Looks like you have no properties" />
        );
    }
    return (
        <div>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </div>
    );
};

export default PropertiesPage;