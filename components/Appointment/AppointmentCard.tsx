import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";
import { AppointmentCustormerProps } from "@/types/AppointmentCustormerProps";

interface AppointmentCardProps {
    data: AppointmentCustormerProps;
}

const AppointmentCard = ({ data }: AppointmentCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.customer.name}</CardTitle>
                <CardDescription>{data.start} - {data.end}</CardDescription>
            </CardHeader>
            <CardContent>
                {data.description}
            </CardContent>
            <CardFooter>
                <div className="flex gap-4 justify-end w-full">
                    <Button className="gap-2">
                        <Pen /> Editar
                    </Button>

                    <Button className="gap-2" variant="destructive">
                        <Trash2 /> Remover
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default AppointmentCard;