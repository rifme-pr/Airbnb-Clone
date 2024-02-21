

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import getReservation from '@/app/actions/getReservation';


interface IParams {
    listingId?: string;
}

const ListingPage =async ({params}: {params: IParams}) => {
    
  
    const currentUser = getCurrentUser();
    const listing = await getListingById(params) ; // Pass listingId as an object
    const reservation = await getReservation(params);
    
    if (!listing) {
        return <EmptyState showReset />;
    }
    return (
        <div>
          <ListingClient 
          reservation={reservation}
          listing={listing} currentUser={currentUser} />
        </div>
    );
};

export default ListingPage;