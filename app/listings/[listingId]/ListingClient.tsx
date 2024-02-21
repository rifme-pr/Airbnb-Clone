"use client"

import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import Container from '@/app/components/Container';
import { useEffect, useMemo, useState } from "react";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservation?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({listing,reservation = [], currentUser}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservation.forEach((res: any) => {
            const range = eachDayOfInterval({start: new Date(res.startDate),
                end: new Date(res.endDate)
            });
            dates = [...dates, ...range]
        });
        return dates;
    },[reservation]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    
    const onCreateReservation = () => {
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservation', {
            totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, listingId: listing?.id
        })
        .then(() => {
            toast.success("Listing Reserved");
            setDateRange(initialDateRange);
            router.push('/trips');
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
 
    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
        
        if(dayCount && listing.price){
            setTotalPrice(dayCount * listing.price);

        }} else{
            setTotalPrice(listing.price);
        }
    },[dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    },[listing.category])
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-8 mt6">
                        <ListingInfo 
                        user={listing.user}
                        category={listing.category}
                        decription={listing.decription}
                        bathroomCount ={listing.bathroomCount}
                        locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate ={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit = {onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </Container>
    );
};

export default ListingClient;