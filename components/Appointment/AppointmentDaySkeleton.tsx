import { Skeleton } from "../ui/skeleton";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";

const AppointmentDaySkeleton = () => {
    return (
        <>
            <Skeleton className="h-4 w-64"/>

            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
        </>
    );
}
 
export default AppointmentDaySkeleton;