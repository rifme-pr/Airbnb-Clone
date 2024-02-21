import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
  };

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | 'emailVerified'
> & {
    creadtedAt: string;
    updatedAt: string;
    emailVerified: string | null;
    
};
export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | 'endDate' | 'listing'
> & {
    creadtedAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing
    
};