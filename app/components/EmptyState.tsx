"use client"

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title: string;
    subtitle: string;
    showReset: boolean;
}

const EmptyState: React.FC<EmptyState> = ({title= 'No exact Matches', subtitle = 'Try changing of removing some of your filter', showReset}) => {
    const router = useRouter();
    return (
    
        <div className="flex h-[60vh] flex-col gap-2 justify-center items-center ">
            <Heading center  title={title} subTitle={subtitle}></Heading>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Remove all filters" onClick={() => router.push('/')} ></Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;