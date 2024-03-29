
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

 
interface HomeProps {
  searchParams: IListingsParams
}

const  Home = async ({searchParams}: HomeProps) => {
  const isEmpty = true;
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  console.log(listings);
  
  if(listings.length === 0 ){
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>

          <div 
       
          className="pt-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {listings.map((listing) => {
              return (
                 <ListingCard 
                 currentUser={currentUser}
                 key={listing.title} 
                 data={listing}
                 />
            )
              }
            )}
          </div>

    </Container>
  );
}
export default Home;