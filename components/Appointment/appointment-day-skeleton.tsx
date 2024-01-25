
import { Skeleton } from "../ui/skeleton";
import AppointmentCardSkeleton from "./appointment-card-skeleton";

export default function AppointmentDaySkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-64" />

            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
        </div>
    );
}