import { Skeleton } from "../ui/skeleton";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";

const AppointmentDaySkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-64" />

            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
        </div>
    );
}

export default AppointmentDaySkeleton;