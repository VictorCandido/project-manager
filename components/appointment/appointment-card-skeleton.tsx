import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const AppointmentCardSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-96" />
            </CardContent>
            <CardFooter>
                <div className="flex gap-4 justify-end w-full">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                </div>
            </CardFooter>
        </Card>
    );
}

export default AppointmentCardSkeleton;