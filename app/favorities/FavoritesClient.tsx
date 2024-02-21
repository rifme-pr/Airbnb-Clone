'use client'


import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps{
    listings: SafeListing[],
    currentUser: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({listings, currentUser}) => {
    return (
        <div>
            <Container>
                <Heading 
                title="Favorites"
                subTitle="List of place you have favorited!"
                />
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {listings.map((listing) => (
                        <ListingCard 
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default FavoritesClient;