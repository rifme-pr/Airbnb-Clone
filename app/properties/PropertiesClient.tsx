'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing,  SafeUser } from "../types";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface PropertiesClientProps{
     listings: SafeListing[],
     currentUser: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({listings,currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = (id: string) => {
            setDeletingId(id);
            axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Properties deleted');
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
                <Heading title="properties" subTitle="List of your properties" />
                <div className="grid gap-8 mt-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {listings.map((res) => (
                            <ListingCard 
                            key={res.id}
                            data={res}
                            
                            actionId={res.id}
                            onAction={onCancel}
                            disabled={deletingId === res.id}
                            actionLabel="Delete property"
                            currentUser={currentUser}
                            />
                        ))}
                </div>
            </Container>
        </div>
    );
};

export default PropertiesClient;